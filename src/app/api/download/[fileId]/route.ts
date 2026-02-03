import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  const { fileId } = await params;
  const fileName = req.nextUrl.searchParams.get('name') || 'converted-file';

  const possibleExtensions = ['.pdf', '.docx', '.xlsx'];
  let filePath = '';

  for (const ext of possibleExtensions) {
    const p = path.join(process.cwd(), 'converted', `${fileId}${ext}`);
    if (fs.existsSync(p)) {
      filePath = p;
      break;
    }
  }

  if (!filePath) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  // Use streaming for better performance with large files
  const fileStream = fs.createReadStream(filePath);

  // @ts-ignore - ReadableStream conversion
  return new NextResponse(fileStream as any, {
    headers: {
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Type': 'application/octet-stream',
    },
  });
}
