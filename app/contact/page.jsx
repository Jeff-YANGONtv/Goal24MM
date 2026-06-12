'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-primary border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">⚽</span>
              <h1 className="text-3xl font-bold text-white">Goal24MM</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/" className="text-accent hover:text-red-600 text-sm font-semibold">
            ← Back to Home
          </Link>
        </div>

        <div className="bg-primary rounded-lg p-8 shadow-lg">
          <h1 className="text-4xl font-bold text-white mb-2">Contact Us</h1>
          <p className="text-gray-400 mb-8">
            Have a question or feedback? We'd love to hear from you!
          </p>

          {submitted && (
            <div className="bg-green-900 border border-green-700 text-green-100 px-4 py-3 rounded mb-6">
              ✓ Thank you for your message! We'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-white font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-secondary border border-gray-600 rounded text-white focus:outline-none focus:border-accent transition-colors"
                placeholder="Your name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-white font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-secondary border border-gray-600 rounded text-white focus:outline-none focus:border-accent transition-colors"
                placeholder="your@email.com"
              />
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="block text-white font-semibold mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-secondary border border-gray-600 rounded text-white focus:outline-none focus:border-accent transition-colors"
                placeholder="What is this about?"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-white font-semibold mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-2 bg-secondary border border-gray-600 rounded text-white focus:outline-none focus:border-accent transition-colors resize-none"
                placeholder="Your message here..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-accent hover:bg-red-600 text-white font-bold py-3 rounded transition-colors"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Other Ways to Reach Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-secondary p-4 rounded">
                <p className="text-accent font-semibold mb-2">📧 Email</p>
                <p className="text-gray-300">contact@goal24mm.com</p>
              </div>
              <div className="bg-secondary p-4 rounded">
                <p className="text-accent font-semibold mb-2">📱 Social Media</p>
                <p className="text-gray-300">Follow us on social platforms</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
