import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-bold mb-4">About Yash Dhanjwal</h3>
            <p className="text-sm text-gray-600 max-w-md">
              A professional webtools platform created by Yash Dhanjwal, a B.Tech student from New Delhi.
              Providing fast, free, and accurate document conversion without compromising on formatting.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><Link href="/" className="hover:text-red-600">Home</Link></li>
              <li><Link href="/about" className="hover:text-red-600">About Us</Link></li>
              <li><Link href="/privacy" className="hover:text-red-600">Privacy Policy</Link></li>
              <li><Link href="/contact" className="hover:text-red-600">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>Email: info@yashdhanjwal.com</li>
              <li>Mobile: +91-8766356943</li>
              <li>WhatsApp: +91-9990033043</li>
              <li>Location: New Delhi, India</li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Yash Dhanjwal. Fast, Free & Accurate Document Conversion.
        </div>
      </div>
    </footer>
  );
}
