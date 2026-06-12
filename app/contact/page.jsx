export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto py-20">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
      <form className="space-y-4">
        <input type="text" placeholder="Name" className="w-full p-3 bg-gray-900 border border-gray-800 rounded" />
        <input type="email" placeholder="Email" className="w-full p-3 bg-gray-900 border border-gray-800 rounded" />
        <textarea placeholder="Message" rows="5" className="w-full p-3 bg-gray-900 border border-gray-800 rounded"></textarea>
        <button className="w-full p-3 bg-red-600 font-bold rounded">Send Message</button>
      </form>
    </div>
  );
}
