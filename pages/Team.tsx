import React from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import { Doctor } from '../types';

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr.Sharma Rahul ",
    role: "Chief Dentist & Orthodontist",
    image: "https://drive.google.com/thumbnail?id=1bNSteZkJIaaFAtuYzsAf4UUXi_eSNu8n&sz=w1000",
    bio: "Dr.Rahul has over 15 years of experience in orthodontics. He is passionate about creating beautiful smiles using the latest aligner technology."
  },
  {
    id: 2,
    name: "Dr. James Wilson",
    role: "Oral Surgeon",
    image: "https://drive.google.com/thumbnail?id=1HJvb93LRAPDMW4swBm327DodMghcERBe&sz=w1000",
    bio: "Specializing in implants and complex extractions, Dr. Wilson ensures every procedure is as comfortable as possible for his patients."
  },
  {
    id: 3,
    name: "Dr. Emily Parker",
    role: "Pediatric Dentist",
    image: "https://drive.google.com/thumbnail?id=1PkiDEAPdTDOeDvdj7urPNW0-tbiPiCTa&sz=w1000",
    bio: "Dr. Parker loves working with kids. She creates a fun, fear-free environment to help children develop healthy oral hygiene habits."
  },
  {
    id: 4,
    name: "Dr. Sharon Robertson",
    role: "Cosmetic Dentist",
    image: "https://drive.google.com/thumbnail?id=1udxtqW3SjMNnEXas-YVdciC_uWtymVfV&sz=w1000",
    bio: "With a keen eye for aesthetics, Dr.Sharon specializes in veneers and teeth whitening to help you achieve the perfect Hollywood smile."
  }
];

const Team = () => {
  return (
    <div className="bg-white">
      <div className="bg-primary-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Meet Our Specialists</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our team of experienced dentists and hygienists is here to ensure you receive the best possible care.
          </p>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/60 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-4">
                      <a href="#" className="bg-white p-2 rounded-full text-primary-600 hover:bg-primary-50"><Linkedin size={20} /></a>
                      <a href="#" className="bg-white p-2 rounded-full text-primary-600 hover:bg-primary-50"><Twitter size={20} /></a>
                      <a href="#" className="bg-white p-2 rounded-full text-primary-600 hover:bg-primary-50"><Mail size={20} /></a>
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{doctor.name}</h3>
                  <p className="text-primary-600 font-medium text-sm mb-4 uppercase tracking-wide">{doctor.role}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{doctor.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-20 bg-slate-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Are you a dental professional?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            We are always looking for talented individuals to join our growing team. Check out our career opportunities.
          </p>
          <button className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Join Our Team
          </button>
        </div>
      </section>
    </div>
  );
};

export default Team;