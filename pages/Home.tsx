import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Clock, Award, Star } from 'lucide-react';

const Hero = () => (
  <section className="relative bg-primary-50 py-20 lg:py-28 overflow-hidden">
    <div className="container mx-auto px-4 relative z-10">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="lg:w-1/2 space-y-8">
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm text-primary-700 font-medium text-sm">
            <span className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></span>
            <span>Accepting New Patients</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight">
            Your Smile is Our <br />
            <span className="text-primary-600">Top Priority</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
            Experience world-class dental care with our team of experts. 
            We use the latest technology to ensure your treatment is pain-free and effective.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/book" 
              className="bg-primary-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/30 text-center"
            >
              Book an Appointment
            </Link>
            <Link 
              to="/services" 
              className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-lg font-bold hover:bg-slate-50 transition-all text-center flex items-center justify-center gap-2"
            >
              View Services <ArrowRight size={18} />
            </Link>
          </div>
          <div className="flex items-center gap-8 pt-4">
             <div className="flex -space-x-3">
               {[1,2,3,4].map(i => (
                 <img key={i} src={`https://picsum.photos/100/100?random=${i+10}`} alt="Patient" className="w-10 h-10 rounded-full border-2 border-white" />
               ))}
               <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 border-2 border-white">+2k</div>
             </div>
             <div>
               <p className="text-sm font-bold text-slate-900">2,000+ Happy Patients</p>
               <div className="flex text-yellow-400 text-xs">
                 {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
               </div>
             </div>
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src= "https://drive.google.com/thumbnail?id=1zuuZmqJhGyT9Gh9k8fbFd7vGyRkKpBZ_&sz=w1000"
              alt="Happy patient with dentist" 
              className="w-full h-auto object-cover"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-200 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-50"></div>
        </div>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Clock, title: "24/7 Support", desc: "Emergency dental care available whenever you need us." },
          { icon: Award, title: "Qualified Doctors", desc: "Our team consists of highly trained professionals from top universities." },
          { icon: Shield, title: "Modern Technology", desc: "We use state-of-the-art equipment for precise diagnostics." }
        ].map((feature, idx) => (
          <div key={idx} className="bg-slate-50 p-8 rounded-2xl hover:shadow-lg transition-shadow border border-slate-100 group">
            <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary-600 mb-6 group-hover:scale-110 transition-transform">
              <feature.icon size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
            <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AboutPreview = () => (
  <section className="py-20 bg-slate-50">
    <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
      <div className="lg:w-1/2">
        <div className="grid grid-cols-2 gap-4">
          <img src="https://drive.google.com/thumbnail?id=1bNSteZkJIaaFAtuYzsAf4UUXi_eSNu8n&sz=w1000" alt="Clinic interior" className="rounded-2xl shadow-lg mt-8" />
          <img src="https://drive.google.com/thumbnail?id=1PkiDEAPdTDOeDvdj7urPNW0-tbiPiCTa&sz=w1000" alt="Dentist working" className="rounded-2xl shadow-lg" />
        </div>
      </div>
      <div className="lg:w-1/2 space-y-6">
        <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">About Us</span>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Dedicated to the Health of Your Smile</h2>
        <p className="text-slate-600 leading-relaxed text-lg">
          At Guardian Dental, we believe that a healthy smile is the foundation of a happy life. 
          Founded in 2010, our clinic has served over 15,000 patients with compassion and excellence.
        </p>
        <ul className="space-y-4">
          {['Comprehensive oral exams', 'Latest dental technology', 'Comfortable and relaxing environment', 'Transparent pricing'].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
              <CheckCircle2 className="text-primary-600" size={20} />
              {item}
            </li>
          ))}
        </ul>
        <div className="pt-4">
          <Link to="/about" className="text-primary-600 font-bold hover:text-primary-700 flex items-center gap-2">
            Learn More About Us <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">Testimonials</span>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">What Our Patients Say</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { 
            name: "Wanjiku Mwangi", 
            role: "Teacher", 
            text: "The best dental experience I've ever had. The staff is incredibly friendly and Dr. Rahul is a genius!",
            image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=150&q=80"
          },
          { 
            name: "Juma Otieno", 
            role: "Engineer", 
            text: "I was afraid of dentists until I came here. The pain-free procedures completely changed my perspective.",
            image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=150&q=80"
          },
          { 
            name: "Amina Abdi", 
            role: "Designer", 
            text: "State of the art facility and very professional service. Highly recommend Guardian Dental to everyone.",
            image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=150&q=80"
          }
        ].map((t, idx) => (
          <div key={idx} className="bg-slate-50 p-8 rounded-2xl relative">
             <div className="flex text-yellow-400 mb-4">
               {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
             </div>
             <p className="text-slate-700 italic mb-6">"{t.text}"</p>
             <div className="flex items-center gap-4">
               <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
               <div>
                 <h4 className="font-bold text-slate-900">{t.name}</h4>
                 <span className="text-xs text-slate-500 uppercase">{t.role}</span>
               </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-20 bg-primary-600 text-white">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Brighten Your Smile?</h2>
      <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
        Book an appointment today and take the first step towards a healthier, happier you. 
        We offer flexible scheduling to fit your busy life.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link to="/book" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold hover:bg-slate-100 transition-colors">
          Book Appointment Now
        </Link>
        <Link to="/contact" className="bg-primary-700 text-white border border-primary-500 px-8 py-4 rounded-lg font-bold hover:bg-primary-800 transition-colors">
          Contact Us
        </Link>
      </div>
    </div>
  </section>
);

const MapSection = () => (
  <section className="h-[400px] w-full relative bg-slate-200">
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
);

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <AboutPreview />
      <Testimonials />
      <CTA />
      <MapSection />
    </>
  );
};

export default Home;