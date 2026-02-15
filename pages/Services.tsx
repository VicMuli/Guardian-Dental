import React from 'react';
import { Link } from 'react-router-dom';
import { Smile, Zap, Activity, HeartPulse, Search, Baby, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    title: "General Dentistry",
    description: "Routine check-ups, cleanings, and fillings to maintain optimal oral health for the whole family.",
    icon: Activity
  },
  {
    title: "Cosmetic Dentistry",
    description: "Transform your smile with veneers, bonding, and other aesthetic procedures tailored to you.",
    icon: Smile
  },
  {
    title: "Teeth Whitening",
    description: "Professional whitening treatments that remove stains and brighten your smile safely and effectively.",
    icon: Zap
  },
  {
    title: "Dental Implants",
    description: "Permanent, natural-looking solutions for replacing missing teeth and restoring functionality.",
    icon: Search
  },
  {
    title: "Orthodontics",
    description: "Straighten your teeth with traditional braces or clear aligners for a perfect bite.",
    icon: HeartPulse
  },
  {
    title: "Pediatric Dentistry",
    description: "Specialized care for children to ensure they grow up with strong, healthy teeth.",
    icon: Baby
  }
];

const Services = () => {
  return (
    <div className="bg-white">
      <div className="bg-primary-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Our Services</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Comprehensive dental solutions designed to meet your unique needs.
          </p>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mb-6">
                  <service.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>
                <Link 
                  to="/book" 
                  className="inline-flex items-center text-primary-600 font-bold hover:text-primary-700 transition-colors group mt-auto"
                >
                  Book Now <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>
            <p className="text-slate-600 mt-2">Your journey to a better smile in 3 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
            {/* Connecting Line (Desktop only) */}
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-slate-200 -z-0"></div>

            <div className="relative z-10">
              <div className="w-24 h-24 bg-white border-4 border-primary-100 rounded-full flex items-center justify-center text-2xl font-bold text-primary-600 mx-auto mb-6 shadow-sm">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Book Appointment</h3>
              <p className="text-slate-600 px-4">Schedule a visit online or call our front desk.</p>
            </div>
            <div className="relative z-10">
              <div className="w-24 h-24 bg-white border-4 border-primary-100 rounded-full flex items-center justify-center text-2xl font-bold text-primary-600 mx-auto mb-6 shadow-sm">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Consultation</h3>
              <p className="text-slate-600 px-4">Meet with our experts to discuss your needs.</p>
            </div>
            <div className="relative z-10">
              <div className="w-24 h-24 bg-white border-4 border-primary-100 rounded-full flex items-center justify-center text-2xl font-bold text-primary-600 mx-auto mb-6 shadow-sm">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Treatment</h3>
              <p className="text-slate-600 px-4">Receive top-quality care and leave smiling.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;