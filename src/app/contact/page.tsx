import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react';

export const metadata = {
  title: "Contact Us - Free Online Tools by Yash Dhanjwal",
  description: "Get in touch with Yash Dhanjwal for support or feedback.",
};

export default function Contact() {
  return (
    <div className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-extrabold mb-8 text-center">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-100 rounded-lg text-red-600">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold">Email</p>
                  <a href="mailto:info@yashdhanjwal.com" className="text-gray-600 hover:text-red-600">info@yashdhanjwal.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-100 rounded-lg text-red-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold">Mobile</p>
                  <a href="tel:+918766356943" className="text-gray-600 hover:text-red-600">+91-8766356943</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-100 rounded-lg text-red-600">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold">WhatsApp</p>
                  <a href="https://wa.me/919990033043" className="text-gray-600 hover:text-red-600">+91-9990033043</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-100 rounded-lg text-red-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold">Location</p>
                  <p className="text-gray-600">New Delhi, India</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">About the Creator</h2>
            <p className="mb-6 leading-relaxed">
              Yash Dhanjwal is a tech enthusiast and B.Tech student from the heart of India, New Delhi.
              With a focus on building efficient and user-friendly web solutions, this platform is a
              testament to his dedication to the developer community.
            </p>
            <a
              href="https://www.yashdhanjwal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-red-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Visit Portfolio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
