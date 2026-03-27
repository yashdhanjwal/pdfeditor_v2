import ToolPage from '@/components/ToolPage';

export const metadata = {
  title: "PDF to Word Converter - Free Online Tools by Yash Dhanjwal",
  description: "Convert PDF to Word document online for free with high accuracy. Preservation of layout and formatting guaranteed.",
};

export default function PdfToWord() {
  return (
    <ToolPage
      title="PDF to Word"
      description="Convert your PDF files to editable Word documents (.docx) with the best quality."
      tool="pdf-to-word"
      acceptedFiles={{ 'application/pdf': ['.pdf'] }}
    />
  );
}
