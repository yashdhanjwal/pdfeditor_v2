import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import {
  convertOfficeToPdf,
  convertPdfToWord,
  convertPdfToExcel
} from '@/lib/converter';
import { conversionQueue } from '@/lib/queue';

const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
const CONVERTED_DIR = path.join(process.cwd(), 'converted');

if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
if (!fs.existsSync(CONVERTED_DIR)) fs.mkdirSync(CONVERTED_DIR, { recursive: true });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const tool = formData.get('tool') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const fileId = uuidv4();
    const originalExtension = path.extname(file.name);
    const inputPath = path.join(UPLOADS_DIR, `${fileId}${originalExtension}`);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    fs.writeFileSync(inputPath, buffer);

    const result = await conversionQueue.add(async () => {
      let outputPath = '';
      let outputFileName = '';

      switch (tool) {
        case 'pdf-to-word':
          outputFileName = `${path.basename(file.name, originalExtension)}.docx`;
          outputPath = path.join(CONVERTED_DIR, `${fileId}.docx`);
          await convertPdfToWord(inputPath, outputPath);
          break;
        case 'pdf-to-excel':
          outputFileName = `${path.basename(file.name, originalExtension)}.xlsx`;
          outputPath = path.join(CONVERTED_DIR, `${fileId}.xlsx`);
          await convertPdfToExcel(inputPath, outputPath);
          break;
        case 'word-to-pdf':
        case 'excel-to-pdf':
          const resultPath = await convertOfficeToPdf(inputPath, CONVERTED_DIR);
          const convertedExt = path.extname(resultPath);
          outputPath = path.join(CONVERTED_DIR, `${fileId}${convertedExt}`);
          fs.renameSync(resultPath, outputPath);
          outputFileName = `${path.basename(file.name, originalExtension)}.pdf`;
          break;
        default:
          throw new Error('Invalid tool');
      }
      return { fileId, fileName: outputFileName };
    });

    return NextResponse.json({
      success: true,
      ...result
    });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message || 'Conversion failed' }, { status: 500 });
  }
}
