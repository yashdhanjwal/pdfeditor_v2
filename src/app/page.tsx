import {
  FileText,
  FileSpreadsheet,
  FileStack,
  FileCode,
  Zap,
  Shield,
  Clock
} from 'lucide-react';
import ToolCard from '@/components/ToolCard';
import Script from 'next/script';

export default function Home() {
  const tools = [
    {
      title: "PDF to Word",
      description: "Convert your PDF documents to Word (.docx) with high accuracy.",
      href: "/pdf-to-word",
      icon: FileText,
      color: "bg-blue-600"
    },
    {
      title: "PDF to Excel",
      description: "Extract tables from PDF to Excel (.xlsx) spreadsheets easily.",
      href: "/pdf-to-excel",
      icon: FileSpreadsheet,
      color: "bg-green-600"
    },
    {
      title: "Word to PDF",
      description: "Make .docx files easy to read by converting them to PDF.",
      href: "/word-to-pdf",
      icon: FileStack,
      color: "bg-blue-500"
    },
    {
      title: "Excel to PDF",
      description: "Convert Excel spreadsheets to PDF documents for easy sharing.",
      href: "/excel-to-pdf",
      icon: FileCode,
      color: "bg-green-500"
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free Online Tools by Yash Dhanjwal",
    "description": "Fast, Free & Accurate Document Conversion. Convert PDF to Word, Excel and more.",
    "url": "https://ft1.yashdhanjwal.com",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "author": {
      "@type": "Person",
      "name": "Yash Dhanjwal",
      "url": "https://www.yashdhanjwal.com"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div>
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="bg-red-600 text-white py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Fast, Free & Accurate Document Conversion
          </h1>
          <p className="text-xl md:text-2xl text-red-100 mb-10">
            Professional tools to convert PDF, Word, and Excel without losing formatting.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" /> <span>Fast Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" /> <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" /> <span>No Signup Required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Select Your Tool</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <ToolCard key={index} {...tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Your Files are Safe</h3>
              <p className="text-gray-600">
                All uploaded files are automatically deleted after 1 hour. We never store or view your documents.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">High Quality Output</h3>
              <p className="text-gray-600">
                We use industry-grade conversion engines to ensure your formatting, fonts, and tables remain intact.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Completely Free</h3>
              <p className="text-gray-600">
                All our tools are free to use without any limitations or forced signups.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
