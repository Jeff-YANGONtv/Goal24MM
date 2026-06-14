'use client';

import { useState } from 'react';
import { Mail, MessageSquare, User, Send, CheckCircle, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Contact Us - Goal24MM',
  description: 'Get in touch with the Goal24MM team for inquiries, feedback, or collaborations.',
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Contact form error:', err);
      setError(err.message || 'Failed to submit contact form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-2xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">Get In Touch</h1>
        <p className="text-gray-400">Have a question or feedback? We'd love to hear from you.</p>
      </div>

      {/* Success Message */}
      {submitted && (
        <div className="mb-8 p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-green-500 font-bold mb-1">Message Sent Successfully!</h3>
            <p className="text-green-400 text-sm">Thank you for contacting us. We'll get back to you soon.</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-red-500 font-bold mb-1">Error</h3>
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        </div>
      )}

      <div className="glass-card p-8 md:p-10 border-yellow-500/10 mb-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">
              Your Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-xl focus:border-yellow-500/50 focus:ring-0 transition-colors text-white placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-xl focus:border-yellow-500/50 focus:ring-0 transition-colors text-white placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">
              Message
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-6 w-5 h-5 text-gray-500" />
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us what's on your mind..."
                rows="5"
                required
                minLength="10"
                maxLength="5000"
                className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-xl focus:border-yellow-500/50 focus:ring-0 transition-colors text-white placeholder:text-gray-600 resize-none"
              />
            </div>
            <p className="text-xs text-gray-500 ml-1">
              {formData.message.length}/5000 characters
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-3d w-full mt-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 flex items-center space-x-4">
          <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Mail className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Us</div>
            <a href="mailto:contact@goal24mm.com" className="text-white font-medium hover:text-yellow-500 transition-colors">
              contact@goal24mm.com
            </a>
          </div>
        </div>

        <div className="glass-card p-6 flex items-center space-x-4">
          <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-gray-500">Social Media</div>
            <a href="https://twitter.com/Goal24MM" className="text-white font-medium hover:text-yellow-500 transition-colors">
              @Goal24MM
            </a>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-12 p-6 bg-gray-900/30 rounded-lg border border-gray-800">
        <h3 className="text-lg font-bold mb-4 text-white">Response Time</h3>
        <p className="text-gray-400">
          We typically respond to all inquiries within 24-48 hours during business days. For urgent matters, please reach out via social media.
        </p>
      </div>
    </div>
  );
}
