import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: string;
}

export default function ToolCard({ title, description, href, icon: Icon, color }: ToolCardProps) {
  return (
    <Link href={href} className="group">
      <div className="h-full bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-red-200 transition-all">
        <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${color} text-white transition-transform group-hover:scale-110`}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold mb-2 group-hover:text-red-600 transition-colors">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      </div>
    </Link>
  );
}
