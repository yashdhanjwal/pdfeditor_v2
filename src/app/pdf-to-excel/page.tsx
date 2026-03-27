import ToolPage from '@/components/ToolPage';

export const metadata = {
  title: "PDF to Excel Converter - Free Online Tools by Yash Dhanjwal",
  description: "Extract tables from PDF and convert them to Excel spreadsheets (.xlsx) online for free.",
};

export default function PdfToExcel() {
  return (
    <ToolPage
      title="PDF to Excel"
      description="Convert PDF documents to Microsoft Excel spreadsheets (.xlsx) with tables preserved."
      tool="pdf-to-excel"
      acceptedFiles={{ 'application/pdf': ['.pdf'] }}
    />
  );
}
