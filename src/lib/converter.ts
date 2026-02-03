import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

const execPromise = promisify(exec);

export async function convertOfficeToPdf(inputPath: string, outputDir: string): Promise<string> {
  // LibreOffice command: libreoffice --headless --convert-to pdf --outdir outputDir inputPath
  try {
    const command = `libreoffice --headless --convert-to pdf --outdir "${outputDir}" "${inputPath}"`;
    const { stdout, stderr } = await execPromise(command);
    console.log('LibreOffice stdout:', stdout);
    if (stderr) console.error('LibreOffice stderr:', stderr);

    const fileName = path.basename(inputPath, path.extname(inputPath)) + '.pdf';
    const outputPath = path.join(outputDir, fileName);

    if (fs.existsSync(outputPath)) {
        return outputPath;
    } else {
        throw new Error('Conversion failed: Output file not found');
    }
  } catch (error) {
    console.error('Error in convertOfficeToPdf:', error);
    throw error;
  }
}

export async function convertPdfToWord(inputPath: string, outputPath: string): Promise<string> {
  const scriptPath = path.join(process.cwd(), 'scripts/python/pdf_to_word.py');
  try {
    const command = `python3 "${scriptPath}" "${inputPath}" "${outputPath}"`;
    const { stdout, stderr } = await execPromise(command);
    console.log('pdf_to_word stdout:', stdout);
    if (stderr) console.error('pdf_to_word stderr:', stderr);
    return outputPath;
  } catch (error) {
    console.error('Error in convertPdfToWord:', error);
    throw error;
  }
}

export async function convertPdfToExcel(inputPath: string, outputPath: string): Promise<string> {
  const scriptPath = path.join(process.cwd(), 'scripts/python/pdf_to_excel.py');
  try {
    const command = `python3 "${scriptPath}" "${inputPath}" "${outputPath}"`;
    const { stdout, stderr } = await execPromise(command);
    console.log('pdf_to_excel stdout:', stdout);
    if (stderr) console.error('pdf_to_excel stderr:', stderr);
    return outputPath;
  } catch (error) {
    console.error('Error in convertPdfToExcel:', error);
    throw error;
  }
}
