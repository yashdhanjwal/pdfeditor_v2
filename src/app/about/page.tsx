import { User, MapPin, Mail, Phone, MessageCircle } from 'lucide-react';

export const metadata = {
  title: "About - Free Online Tools by Yash Dhanjwal",
  description: "Learn more about Yash Dhanjwal and the mission behind these free document conversion tools.",
};

export default function About() {
  return (
    <div className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-extrabold mb-8 text-center">About Yash Dhanjwal</h1>

        <div className="bg-white border rounded-2xl p-8 shadow-sm mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center">
              <User className="w-16 h-16 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Yash Dhanjwal</h2>
              <p className="text-red-600 font-medium mb-4">B.Tech Student & Web Developer</p>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> New Delhi, Capital of India</div>
                <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@yashdhanjwal.com</div>
              </div>
            </div>
          </div>

          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              I am a passionate B.Tech student based in New Delhi, dedicated to building useful web applications that solve real-world problems.
              This platform was created with a single mission: to provide high-quality, free document conversion tools that rival premium services.
            </p>
            <p className="mb-4">
              Unlike many free tools that compromise on formatting or require signups, our tools are built using industry-grade libraries like LibreOffice,
              PDFPlumber, and pdf2docx to ensure your documents look exactly as they should.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Why choose us?</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Accuracy:</strong> We preserve layout, fonts, and tables.</li>
              <li><strong>Privacy:</strong> Your files are deleted automatically after 1 hour.</li>
              <li><strong>Speed:</strong> Powered by optimized Linux-based hosting for fast processing.</li>
              <li><strong>Free:</strong> No hidden costs, no accounts, just tools.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
