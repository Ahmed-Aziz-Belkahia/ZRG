import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-black">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm mb-8">
          <a href="/" className="text-gray-400 hover:text-gold">Home</a>
          <span className="text-gray-600">/</span>
          <span className="text-gold">Contact</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-play text-4xl md:text-5xl font-bold text-white mb-4">
            Get in <span className="text-gold">Touch</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have questions about our scripts or need technical support? We're here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-dark-gray rounded-lg p-6">
              <div className="flex items-start">
                <Mail className="text-gold mt-1 mr-4" size={24} />
                <div>
                  <h3 className="font-play text-lg font-bold text-white mb-2">Email Us</h3>
                  <a href="mailto:support@zrg.com" className="text-gray-400 hover:text-gold">
                    support@zrg.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-dark-gray rounded-lg p-6">
              <div className="flex items-start">
                <Phone className="text-gold mt-1 mr-4" size={24} />
                <div>
                  <h3 className="font-play text-lg font-bold text-white mb-2">Call Us</h3>
                  <a href="tel:+1234567890" className="text-gray-400 hover:text-gold">
                    +1 (234) 567-890
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Mon-Fri 9am-6pm EST</p>
                </div>
              </div>
            </div>

            <div className="bg-dark-gray rounded-lg p-6">
              <div className="flex items-start">
                <MapPin className="text-gold mt-1 mr-4" size={24} />
                <div>
                  <h3 className="font-play text-lg font-bold text-white mb-2">Visit Us</h3>
                  <p className="text-gray-400">
                    1234 Gaming Avenue<br />
                    Suite 567<br />
                    Los Santos, CA 90123
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-dark-gray rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-white mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-gold"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-gold"
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="subject" className="block text-white mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-black border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-gold"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-white mb-2">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full bg-black border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-gold"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold/90 text-black font-bold py-3 rounded transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;