import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin, ShieldPlus } from 'lucide-react';
import clsx from 'clsx';
import WhatsAppButton from './WhatsAppButton';

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
      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </div>
  );
};

export default Layout;