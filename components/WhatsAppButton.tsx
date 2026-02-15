import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import clsx from 'clsx';

const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show button after a short delay for smooth entrance
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Trigger notification dot after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setHasNotification(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNotification(false);
    }
  };

  return (
    <div className={clsx(
      "fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4 transition-all duration-500",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    )}>
      
      {/* Popup Template */}
      <div className={clsx(
        "bg-white rounded-2xl shadow-2xl w-80 overflow-hidden transition-all duration-300 origin-bottom-right border border-slate-100",
        isOpen ? "scale-100 opacity-100 mb-2" : "scale-0 opacity-0 mb-0 h-0"
      )}>
        {/* Header */}
        <div className="bg-[#075E54] p-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
               <MessageCircle size={24} />
            </div>
            <div>
              <h3 className="font-bold text-sm">Guardian Dental</h3>
              <p className="text-xs text-green-100">Typically replies instantly</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 bg-[#E5DDD5]">
          <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] text-slate-800 text-sm relative">
            <p>Hello! 👋<br/>Welcome to Guardian Dental. How can we help you with your smile today?</p>
            <span className="text-[10px] text-slate-400 absolute bottom-1 right-2">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        {/* Footer / Action */}
        <div className="p-4 bg-white border-t border-slate-100">
          <a 
            href="https://wa.me/254791281264"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 rounded-full transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/30 active:scale-95"
          >
            <Send size={18} />
            Start Chat
          </a>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={toggleOpen}
        className="relative bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20ba5a] hover:scale-110 transition-all duration-300 group"
        aria-label={isOpen ? "Close WhatsApp chat" : "Open WhatsApp chat"}
      >
        {isOpen ? (
          <X size={32} className="relative z-10 transition-transform duration-300 rotate-90" />
        ) : (
          <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        )}
        
        {/* Notification Dot */}
        {hasNotification && !isOpen && (
          <span className="absolute top-0 right-0 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
          </span>
        )}
      </button>
    </div>
  );
};

export default WhatsAppButton;
