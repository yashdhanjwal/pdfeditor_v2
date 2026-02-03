import Link from 'next/link';
import { FileText } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <FileText className="w-8 h-8 text-red-600" />
          <span className="font-bold text-xl hidden sm:inline-block">Yash Dhanjwal Tools</span>
        </Link>
        <div className="flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-red-600 transition-colors">About</Link>
          <Link href="/contact" className="hover:text-red-600 transition-colors">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
