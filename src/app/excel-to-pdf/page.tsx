import ToolPage from '@/components/ToolPage';

export const metadata = {
  title: "Excel to PDF Converter - Free Online Tools by Yash Dhanjwal",
  description: "Convert Excel spreadsheets (.xlsx) to PDF online for free. Keep your data clean and readable.",
};

export default function ExcelToPdf() {
  return (
    <ToolPage
      title="Excel to PDF"
      description="Convert your Microsoft Excel spreadsheets to high-quality PDF documents."
      tool="excel-to-pdf"
      acceptedFiles={{ 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] }}
    />
  );
}
