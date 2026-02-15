import React from 'react';
import { Target, Heart, History, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">About Guardian Dental</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We are a team of dedicated professionals committed to providing the highest quality dental care in a comfortable and friendly environment.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <img 
                src="https://drive.google.com/thumbnail?id=1hIZh42mNYKWwg_fzWIidZBwJzhnVqEVF&sz=w1000"
                alt="Clinic Team" 
                className="rounded-3xl shadow-xl w-full"
              />
            </div>
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">Our Story</h2>
              <p className="text-slate-600 leading-relaxed">
                Founded in 2010 by Dr. Sharma Rahul, Guardian Dental started as a small two-chair clinic with a big vision: to change the way people experience dentistry. 
                Over the past decade, we have grown into a multi-specialty center, serving thousands of families in our community.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We understand that visiting the dentist can be stressful for some. That's why we've designed our practice to be a sanctuary of calm. 
                From our waiting room to our treatment chairs, every detail is curated for your comfort.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="bg-primary-50 p-6 rounded-xl">
                  <h3 className="text-4xl font-bold text-primary-600 mb-2">15+</h3>
                  <p className="text-slate-700 font-medium">Years Experience</p>
                </div>
                <div className="bg-primary-50 p-6 rounded-xl">
                  <h3 className="text-4xl font-bold text-primary-600 mb-2">10k+</h3>
                  <p className="text-slate-700 font-medium">Happy Patients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-slate-800 p-10 rounded-2xl border border-slate-700">
              <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-slate-300 leading-relaxed">
                To provide accessible, affordable, and high-quality dental care to our community. We strive to educate our patients on preventive care and help them achieve a smile they can be proud of.
              </p>
            </div>
            <div className="bg-slate-800 p-10 rounded-2xl border border-slate-700">
              <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Heart size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-slate-300 leading-relaxed">
                To be the leading dental healthcare provider in the region, recognized for our commitment to excellence, innovation in treatment, and patient-centered approach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "Patient First", desc: "Your comfort and health are our primary concerns. We listen to your needs and tailor treatments accordingly." },
              { icon: History, title: "Integrity", desc: "We believe in honest, transparent communication about your treatment options and costs." },
              { icon: Target, title: "Excellence", desc: "We are committed to continuous learning and using the best technology to deliver superior results." }
            ].map((item, idx) => (
              <div key={idx} className="text-center p-6">
                <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-600">
                  <item.icon size={36} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;