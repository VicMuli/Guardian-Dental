import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin, ShieldPlus } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Team', href: '/team' },
  { label: 'Contact', href: '/contact' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="sticky top-4 z-50 mx-[0.5cm] bg-white/90 backdrop-blur-md shadow-xl rounded-2xl border border-slate-100 transition-all duration-300">
      <div className="px-4 sm:px-6 lg:px-12">
        <div className="flex items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center space-x-2 group hover:opacity-80 transition-opacity"
            >
              <div className="bg-primary-600 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary-600/20">
                <ShieldPlus className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-slate-800 tracking-tight">Guardian<span className="text-primary-600">Dental</span></span>
            </button>
          </div>

          {/* Desktop Nav - Positioned 0.5cm from Logo */}
          <nav className="hidden lg:flex items-center gap-[0.5cm] ml-[0.5cm]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={clsx(
                  "font-medium transition-colors hover:text-primary-600 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-primary-600 after:transition-all hover:after:w-full",
                  location.pathname === item.href ? "text-primary-600 after:w-full" : "text-slate-600"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Action & Mobile Toggle - Pushed to right */}
          <div className="flex items-center gap-4 ml-auto">
            <Link
              to="/book"
              className="hidden lg:block bg-primary-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-primary-700 transition-all hover:shadow-lg hover:shadow-primary-600/30 active:scale-95"
            >
              Book Appointment
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-slate-600 hover:text-primary-600 transition-colors p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className={clsx(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
          )}>
            <nav className="flex flex-col space-y-2 pt-2 border-t border-slate-100">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={clsx(
                    "font-medium py-3 px-4 rounded-xl transition-colors",
                    location.pathname === item.href ? "bg-primary-50 text-primary-600" : "text-slate-600 hover:bg-slate-50"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/book"
                className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold text-center hover:bg-primary-700 mt-2 shadow-lg shadow-primary-600/20"
                onClick={() => setIsOpen(false)}
              >
                Book Appointment
              </Link>
            </nav>
        </div>
      </div>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 mt-auto">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <div className="bg-primary-600 p-2 rounded-lg">
              <ShieldPlus className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-white">Guardian<span className="text-primary-500">Dental</span></span>
          </div>
          <p className="text-slate-400 mb-6 leading-relaxed">
            Providing top-quality dental care with a gentle touch. Our experienced team is dedicated to improving your oral health and smile.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-primary-600 transition-colors"><Facebook size={18} /></a>
            <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-primary-600 transition-colors"><Twitter size={18} /></a>
            <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-primary-600 transition-colors"><Linkedin size={18} /></a>
            <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-primary-600 transition-colors"><Instagram size={18} /></a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
          <ul className="space-y-3">
            <li><Link to="/" className="hover:text-primary-500 transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>Home</Link></li>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="hover:text-primary-500 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold text-lg mb-6">Our Services</h3>
          <ul className="space-y-3">
            <li><Link to="/services" className="hover:text-primary-500 transition-colors">General Dentistry</Link></li>
            <li><Link to="/services" className="hover:text-primary-500 transition-colors">Cosmetic Dentistry</Link></li>
            <li><Link to="/services" className="hover:text-primary-500 transition-colors">Orthodontics</Link></li>
            <li><Link to="/services" className="hover:text-primary-500 transition-colors">Pediatric Dental</Link></li>
            <li><Link to="/services" className="hover:text-primary-500 transition-colors">Dental Implants</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold text-lg mb-6">Contact Info</h3>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <MapPin className="text-primary-500 shrink-0 mt-1" size={18} />
              <span>Wemmah House, 1st Floor,<br />Limuru Rd, Ruaka</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="text-primary-500 shrink-0" size={18} />
              <a href="tel:0791281264" className="hover:text-primary-500 transition-colors">0791281264</a>
            </li>
            <li className="flex items-center space-x-3">
              <Clock className="text-primary-500 shrink-0" size={18} />
              <span>Mon - Fri: 9:00 AM - 5:00 PM</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Guardian Dental Clinic. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-600 bg-slate-50">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/254791281264"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20ba5a] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
};

export default Layout;