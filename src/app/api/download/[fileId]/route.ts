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

  const fileStats = fs.statSync(filePath);
  const fileStream = fs.createReadStream(filePath);

  // Convert Node.js Readable stream to Web ReadableStream for Next.js 15
  const stream = new ReadableStream({
    start(controller) {
      fileStream.on('data', (chunk) => controller.enqueue(chunk));
      fileStream.on('end', () => controller.close());
      fileStream.on('error', (err) => controller.error(err));
    }
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Type': 'application/octet-stream',
      'Content-Length': fileStats.size.toString(),
    },
  });
}
