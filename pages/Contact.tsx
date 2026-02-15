import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    const { firstName, lastName, email, subject, message } = formData;
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/victormuli100@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: `${firstName} ${lastName}`,
            email: email,
            subject: subject,
            message: message,
            _subject: `New Contact Inquiry: ${subject}`
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: ''
        });
        // Reset status after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-white">
      <div className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            We'd love to hear from you. Reach out to us for any questions or to schedule your visit.
          </p>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Info */}
            <div>
              <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">Get in Touch</span>
              <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">We're Here to Help</h2>
              <p className="text-slate-600 mb-10 leading-relaxed">
                Whether you're a new patient or returning, we are always ready to assist you. 
                Fill out the form or use the contact details below.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-50 p-3 rounded-lg text-primary-600">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Our Location</h3>
                    <p className="text-slate-600">Wemmah House, 1st Floor<br />Limuru Rd, Ruaka</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary-50 p-3 rounded-lg text-primary-600">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Phone Number</h3>
                    <p className="text-slate-600">
                      <a href="tel:0791281264" className="hover:text-primary-600 transition-colors">0791281264</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary-50 p-3 rounded-lg text-primary-600">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Email Address</h3>
                    <p className="text-slate-600">info@guardiandental.com<br />support@guardiandental.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary-50 p-3 rounded-lg text-primary-600">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Working Hours</h3>
                    <p className="text-slate-600">Mon - Fri: 9:00 AM - 5:00 PM<br />Sat - Sun: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-slate-50 p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Send Us a Message</h3>
              
              {status === 'success' ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-600">Thank you for contacting us. We will get back to you shortly.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-primary-600 font-bold hover:text-primary-700 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                      <input 
                        type="text" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white text-slate-900 placeholder-slate-400" 
                        placeholder="John" 
                        required
                        disabled={status === 'submitting'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                      <input 
                        type="text" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white text-slate-900 placeholder-slate-400" 
                        placeholder="Doe" 
                        required
                        disabled={status === 'submitting'}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white text-slate-900 placeholder-slate-400" 
                      placeholder="john@example.com" 
                      required
                      disabled={status === 'submitting'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white text-slate-900 placeholder-slate-400" 
                      placeholder="Inquiry about..." 
                      required
                      disabled={status === 'submitting'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                    <textarea 
                      rows={4} 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white text-slate-900 placeholder-slate-400" 
                      placeholder="How can we help you?"
                      required
                      disabled={status === 'submitting'}
                    ></textarea>
                  </div>
                  
                  {status === 'error' && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm">
                      <AlertCircle size={16} />
                      Something went wrong. Please try again later.
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="w-full bg-primary-600 text-white font-bold py-4 rounded-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 w-full bg-slate-200 relative">
        <iframe 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          src="https://maps.google.com/maps?q=Wemmah%20House%2C%201st%20Floor%20Limuru%20Rd%2C%20Ruaka%20(Guardian%20Dental%20Clinic)&t=&z=15&ie=UTF8&iwloc=B&output=embed"
          title="Guardian Dental Location"
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;