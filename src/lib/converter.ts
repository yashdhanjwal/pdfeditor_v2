import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

const execPromise = promisify(exec);

export async function convertOfficeToPdf(
  inputPath: string,
  outputDir: string,
  apiKey?: string
): Promise<string> {
  if (apiKey) {
    console.log('Using CloudConvert API for conversion...');
    return await convertWithCloudConvert(inputPath, outputDir, apiKey, 'pdf');
  }

  try {
    const command = `libreoffice --headless --convert-to pdf --outdir "${outputDir}" "${inputPath}"`;
    const { stdout, stderr } = await execPromise(command);
    console.log('LibreOffice stdout:', stdout);

    const fileName = path.basename(inputPath, path.extname(inputPath)) + '.pdf';
    const outputPath = path.join(outputDir, fileName);

    if (fs.existsSync(outputPath)) {
        return outputPath;
    } else {
        throw new Error('Local conversion failed: LibreOffice not found or failed to run');
    }
  } catch (error) {
    console.error('Error in local convertOfficeToPdf:', error);
    throw new Error('Conversion failed. Shared hosting requires a CloudConvert API Key in .env.local.');
  }
}

async function convertWithCloudConvert(
  inputPath: string,
  outputDir: string,
  apiKey: string,
  targetFormat: string
): Promise<string> {
  try {
    // 1. Create a Job
    const createJobResponse = await fetch('https://api.cloudconvert.com/v2/jobs', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tasks: {
          'import-my-file': { operation: 'import/upload' },
          'convert-my-file': {
            operation: 'convert',
            input: 'import-my-file',
            output_format: targetFormat
          },
          'export-my-file': {
            operation: 'export/url',
            input: 'convert-my-file'
          }
        }
      })
    });

    const jobData = await createJobResponse.json();
    if (jobData.error) throw new Error(jobData.error.message || 'Failed to create CloudConvert job');

    const uploadTask = jobData.data.tasks.find((t: any) => t.name === 'import-my-file');
    const convertTask = jobData.data.tasks.find((t: any) => t.name === 'convert-my-file');
    const exportTask = jobData.data.tasks.find((t: any) => t.name === 'export-my-file');

    // 2. Upload File
    const formData = new FormData();
    Object.entries(uploadTask.result.form.parameters).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    const fileBuffer = fs.readFileSync(inputPath);
    const blob = new Blob([fileBuffer]);
    formData.append('file', blob, path.basename(inputPath));

    await fetch(uploadTask.result.form.url, {
      method: 'POST',
      body: formData
    });

    // 3. Wait for conversion (Poll for completion)
    let downloadUrl = '';
    for (let i = 0; i < 30; i++) { // Max 30 seconds wait
      await new Promise(r => setTimeout(r, 1000));
      const statusResponse = await fetch(`https://api.cloudconvert.com/v2/tasks/${exportTask.id}`, {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });
      const statusData = await statusResponse.json();

      if (statusData.data.status === 'finished') {
        downloadUrl = statusData.data.result.files[0].url;
        break;
      } else if (statusData.data.status === 'failed') {
        throw new Error('CloudConvert task failed');
      }
    }

    if (!downloadUrl) throw new Error('CloudConvert conversion timed out');

    // 4. Download result
    const downloadResponse = await fetch(downloadUrl);
    const resultBuffer = await downloadResponse.arrayBuffer();

    const fileName = path.basename(inputPath, path.extname(inputPath)) + '.' + targetFormat;
    const outputPath = path.join(outputDir, fileName);
    fs.writeFileSync(outputPath, Buffer.from(resultBuffer));

    return outputPath;
  } catch (err: any) {
    console.error('CloudConvert Error:', err);
    throw new Error(`CloudConvert API Error: ${err.message}`);
  }
}

export async function convertPdfToWord(inputPath: string, outputPath: string): Promise<string> {
  const scriptPath = path.join(process.cwd(), 'scripts/python/pdf_to_word.py');
  const pythonPath = process.env.PYTHON_PATH || 'python3';

  try {
    const command = `${pythonPath} "${scriptPath}" "${inputPath}" "${outputPath}"`;
    const { stdout, stderr } = await execPromise(command);
    return outputPath;
  } catch (error) {
    throw new Error('PDF to Word failed. Ensure Python and pdf2docx are installed in your cPanel App.');
  }
}

export async function convertPdfToExcel(inputPath: string, outputPath: string): Promise<string> {
  const scriptPath = path.join(process.cwd(), 'scripts/python/pdf_to_excel.py');
  const pythonPath = process.env.PYTHON_PATH || 'python3';

  try {
    const command = `${pythonPath} "${scriptPath}" "${inputPath}" "${outputPath}"`;
    const { stdout, stderr } = await execPromise(command);
    return outputPath;
  } catch (error) {
    throw new Error('PDF to Excel failed. Ensure Python and pdfplumber are installed in your cPanel App.');
  }
}
