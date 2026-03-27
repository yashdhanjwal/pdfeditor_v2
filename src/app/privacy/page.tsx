export const metadata = {
  title: "Privacy Policy - Free Online Tools by Yash Dhanjwal",
  description: "Our commitment to your privacy and document security.",
};

export default function Privacy() {
  return (
    <div className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-extrabold mb-8">Privacy Policy</h1>
        <div className="prose max-w-none text-gray-600 space-y-6">
          <p>
            At Free Online Tools by Yash Dhanjwal, we take your privacy seriously. This policy explains how we handle your documents and data.
          </p>

          <h2 className="text-2xl font-bold text-gray-900">1. Document Security</h2>
          <p>
            Your uploaded documents are processed on our secure Linux-based servers. We do not read, view, or share your files with any third parties.
          </p>

          <h2 className="text-2xl font-bold text-gray-900">2. Automatic Deletion</h2>
          <p>
            All uploaded and converted files are automatically and permanently deleted from our servers exactly 1 hour after processing. This ensures your data doesn't stay on our system longer than necessary for you to download it.
          </p>

          <h2 className="text-2xl font-bold text-gray-900">3. No Tracking</h2>
          <p>
            We do not track the content of your documents. We only collect minimal anonymous usage statistics to improve our service performance.
          </p>

          <h2 className="text-2xl font-bold text-gray-900">4. No Account Required</h2>
          <p>
            We do not require you to sign up or provide any personal information to use our conversion tools.
          </p>

          <h2 className="text-2xl font-bold text-gray-900">5. Contact Information</h2>
          <p>
            If you have any questions about this policy, you can reach us at info@yashdhanjwal.com.
          </p>
        </div>
      </div>
    </div>
  );
}
