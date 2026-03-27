import ToolPage from '@/components/ToolPage';

export const metadata = {
  title: "Word to PDF Converter - Free Online Tools by Yash Dhanjwal",
  description: "Convert Word documents (.docx) to PDF online for free. Fast and accurate conversion.",
};

export default function WordToPdf() {
  return (
    <ToolPage
      title="Word to PDF"
      description="Convert your Microsoft Word documents to professional PDF files easily."
      tool="word-to-pdf"
      acceptedFiles={{ 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] }}
    />
  );
}
