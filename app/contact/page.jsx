import { Mail, MessageSquare, User } from 'lucide-react';

export const metadata = {
  title: 'Contact Us - Goal24MM',
  description: 'Get in touch with the Goal24MM team for inquiries, feedback, or collaborations.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-2xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">Get In Touch</h1>
        <p className="text-gray-400">Have a question or feedback? We'd love to hear from you.</p>
      </div>
      
      <div className="glass-card p-8 md:p-10 border-yellow-500/10">
        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Your Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="text" 
                placeholder="John Doe" 
                className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-xl focus:border-yellow-500/50 focus:ring-0 transition-colors text-white placeholder:text-gray-600" 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="email" 
                placeholder="john@example.com" 
                className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-xl focus:border-yellow-500/50 focus:ring-0 transition-colors text-white placeholder:text-gray-600" 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Message</label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-6 w-5 h-5 text-gray-500" />
              <textarea 
                placeholder="Tell us what's on your mind..." 
                rows="5" 
                className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-xl focus:border-yellow-500/50 focus:ring-0 transition-colors text-white placeholder:text-gray-600 resize-none"
              ></textarea>
            </div>
          </div>
          
          <button type="button" className="btn-3d w-full mt-4">
            Send Message
          </button>
        </form>
      </div>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 flex items-center space-x-4">
          <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
            <Mail className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Us</div>
            <div className="text-white font-medium">contact@goal24mm.com</div>
          </div>
        </div>
        <div className="glass-card p-6 flex items-center space-x-4">
          <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-gray-500">Social Media</div>
            <div className="text-white font-medium">@Goal24MM</div>
          </div>
        </div>
      </div>
    </div>
  );
}
