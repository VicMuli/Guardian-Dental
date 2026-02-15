import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, FileText, MessageCircle } from 'lucide-react';
import clsx from 'clsx';

const BookAppointment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    doctor: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const completeBooking = () => {
    const message = `*New Appointment Request*\n\n` +
      `*Service:* ${formData.service}\n` +
      `*Doctor:* ${formData.doctor || 'No preference'}\n` +
      `*Date:* ${formData.date}\n` +
      `*Time:* ${formData.time}\n\n` +
      `*Patient Details:*\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Email:* ${formData.email}\n` +
      `*Notes:* ${formData.notes}`;

    // Use the provided number converted to international format (Kenya)
    const phoneNumber = "254791281264"; 
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    setStep(3);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-primary-600 p-8 text-center text-white">
            <h1 className="text-3xl font-bold mb-2">Book Your Appointment</h1>
            <p className="text-primary-100">Schedule a visit with our expert dentists in just a few steps.</p>
          </div>

          {/* Progress Bar */}
          <div className="flex border-b border-slate-100">
            <div className={clsx("flex-1 py-4 text-center font-medium text-sm border-b-2 transition-colors", step >= 1 ? "border-primary-600 text-primary-600" : "border-transparent text-slate-400")}>
              1. Service & Time
            </div>
            <div className={clsx("flex-1 py-4 text-center font-medium text-sm border-b-2 transition-colors", step >= 2 ? "border-primary-600 text-primary-600" : "border-transparent text-slate-400")}>
              2. Your Details
            </div>
            <div className={clsx("flex-1 py-4 text-center font-medium text-sm border-b-2 transition-colors", step >= 3 ? "border-primary-600 text-primary-600" : "border-transparent text-slate-400")}>
              3. WhatsApp Confirmation
            </div>
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div className="p-8 md:p-12 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><FileText size={16}/> Select Service</label>
                  <select 
                    name="service" 
                    value={formData.service} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white text-slate-900"
                  >
                    <option value="">Choose a service...</option>
                    <option value="General Checkup">General Checkup</option>
                    <option value="Cleaning">Teeth Cleaning</option>
                    <option value="Whitening">Whitening</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><User size={16}/> Preferred Doctor</label>
                  <select 
                    name="doctor" 
                    value={formData.doctor} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white text-slate-900"
                  >
                    <option value="">Any available doctor</option>
                    <option value="Dr. Sharma Rahul">Dr. Sharma Rahul</option>
                    <option value="Dr. James Wilson">Dr. James Wilson</option>
                    <option value="Dr. Emily Parker">Dr. Emily Parker</option>
                    <option value="Dr. Sharon Robertson">Dr. Sharon Robertson</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><Calendar size={16}/> Preferred Date</label>
                  <input 
                    type="date" 
                    name="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white text-slate-900" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><Clock size={16}/> Preferred Time</label>
                  <select 
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white text-slate-900"
                  >
                    <option value="">Choose a time...</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <button 
                  onClick={nextStep} 
                  className="bg-primary-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-700 transition-colors"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="p-8 md:p-12 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white text-slate-900" 
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white text-slate-900" 
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white text-slate-900" 
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Additional Notes (Optional)</label>
                <textarea 
                  rows={3}
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white text-slate-900" 
                  placeholder="Any specific concerns or medical history..."
                ></textarea>
              </div>

              <div className="pt-6 flex justify-between">
                <button 
                  onClick={prevStep} 
                  className="text-slate-500 font-bold px-8 py-3 hover:text-slate-700 transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={completeBooking} 
                  className="bg-[#25D366] text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-green-500/20"
                >
                  <MessageCircle size={20} />
                  Book on WhatsApp
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                <MessageCircle size={48} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Complete on WhatsApp</h2>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                We've prepared a message with your appointment details. Please send it to our WhatsApp number to finalize your booking with our receptionist.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <button 
                  onClick={() => navigate('/')}
                  className="bg-slate-100 text-slate-700 px-8 py-3 rounded-lg font-bold hover:bg-slate-200 transition-colors"
                >
                  Return Home
                </button>
                <button 
                  onClick={() => {
                    const message = `*New Appointment Request*\n\n` +
                      `*Service:* ${formData.service}\n` +
                      `*Doctor:* ${formData.doctor || 'No preference'}\n` +
                      `*Date:* ${formData.date}\n` +
                      `*Time:* ${formData.time}\n\n` +
                      `*Patient Details:*\n` +
                      `*Name:* ${formData.name}\n` +
                      `*Phone:* ${formData.phone}\n` +
                      `*Email:* ${formData.email}\n` +
                      `*Notes:* ${formData.notes}`;
                    const phoneNumber = "254791281264";
                    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                  className="bg-[#25D366] text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  Open WhatsApp Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;