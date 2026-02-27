import React, { useEffect, useState, useRef } from 'react';
import { TextConversation } from '@elevenlabs/client';

const GuardianChat = () => {
    const [conversation, setConversation] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [status, setStatus] = useState('Idle');
    const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Configuration for ElevenLabs Text Chat
    const initClient = async () => {
        try {
            // @ts-ignore - types in v0.15.0 are conflicted around agentId vs conversationToken
            const conv = await TextConversation.startSession({
                agentId: import.meta.env.VITE_ELEVENLABS_AGENT_ID,
                onConnect: () => {
                    setIsConnected(true);
                    setStatus('Connected');
                    setMessages([{ role: 'agent', text: 'Hi! I am Guardian AI. How can I assist you with your dental needs today?' }]);
                },
                onDisconnect: () => {
                    setIsConnected(false);
                    setStatus('Disconnected');
                },
                onError: (error: any) => {
                    console.error('ElevenLabs Error:', error);
                    setStatus('Error: ' + error.message);
                },
                onMessage: (msg: any) => {
                    // msg.role is 'agent' or 'user', msg.message is the string
                    setMessages(prev => [...prev, { role: msg.role === 'ai' ? 'agent' : msg.role, text: msg.message }]);
                }
            });

            setConversation(conv);
        } catch (err) {
            console.error('Failed to initialize ElevenLabs:', err);
            setStatus('Connection failed');
        }
    };

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim() || !conversation) return;

        // The user message gets rendered optimistically
        setMessages(prev => [...prev, { role: 'user', text: inputText }]);
        conversation.sendUserMessage(inputText);
        setInputText('');
    };

    const toggleConnection = async () => {
        if (isConnected && conversation) {
            await conversation.endSession();
            setConversation(null);
        } else {
            await initClient();
        }
    };

    const toggleChat = () => setIsOpen(!isOpen);

    return (
        <div className="fixed bottom-6 left-6 z-50 font-sans">
            {/* Chat Window */}
            <div
                className={`absolute bottom-[4.5rem] left-0 bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] w-[calc(100vw-3rem)] sm:w-[380px] overflow-hidden border border-slate-100 flex flex-col transition-all duration-300 origin-bottom-left ${isOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-90 translate-y-8 pointer-events-none"
                    }`}
            >
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-5 flex justify-between items-center shadow-md">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></svg>
                            </div>
                            <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-primary-700 ${isConnected ? 'bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]' : 'bg-slate-400'}`}></span>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg leading-tight">Guardian AI</h3>
                            <p className="text-[11px] font-medium text-primary-100 uppercase tracking-wider">
                                {status}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={toggleChat}
                        className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors active:scale-95"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                </div>

                {isConnected ? (
                    <div className="flex flex-col flex-1 bg-slate-50/50 h-[450px] max-h-[65vh]">
                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-5 scroll-smooth">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 fade-in duration-300`}>
                                    <div className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm ${msg.role === 'user' ? 'bg-primary-600 text-white rounded-br-sm' : 'bg-white text-slate-700 rounded-bl-sm border border-slate-200 shadow-slate-200/50'}`}>
                                        <p className="text-[15px] leading-relaxed font-medium">{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-slate-100 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)]">
                            <form onSubmit={sendMessage} className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Ask Guardian AI..."
                                    className="flex-1 bg-slate-100/50 border border-slate-200 rounded-full px-5 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/50 transition-all font-medium placeholder:text-slate-400"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputText.trim()}
                                    className="bg-primary-600 text-white w-12 h-12 flex items-center justify-center rounded-full hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/30 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none shrink-0"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                                </button>
                            </form>
                            <div className="text-center mt-3">
                                <button
                                    onClick={toggleConnection}
                                    className="text-[11px] font-bold tracking-wider uppercase text-slate-400 hover:text-red-500 transition-colors"
                                >
                                    End Conversation
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-8 flex flex-col items-center justify-center h-[400px] bg-gradient-to-b from-slate-50 to-white">
                        <div className="text-center mb-8">
                            <div className="w-24 h-24 bg-primary-50 text-primary-600 rounded-3xl rotate-3 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary-600/10 border border-primary-100/50 overflow-hidden relative">
                                <div className="absolute inset-0 bg-primary-600/5 animate-pulse"></div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 -rotate-3"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></svg>
                            </div>
                            <h4 className="font-bold text-xl text-slate-800 mb-3 tracking-tight">Guardian AI</h4>
                            <p className="text-[15px] font-medium text-slate-500 leading-relaxed max-w-[250px] mx-auto">
                                Have a question? Chat with our AI assistant to learn about our services or book an appointment.
                            </p>
                        </div>

                        <button
                            onClick={toggleConnection}
                            className="w-full py-4 px-6 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3 bg-primary-600 text-white hover:bg-primary-700 shadow-xl shadow-primary-600/20 hover:shadow-primary-600/40 active:scale-95"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                            Start Chat
                        </button>
                    </div>
                )}
            </div>

            {/* Floating Toggle Button */}
            <button
                onClick={toggleChat}
                className={`w-16 h-16 rounded-full shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 z-50 relative ${isOpen
                        ? 'bg-slate-800 text-white shadow-slate-900/20 rotate-[360deg]'
                        : 'bg-gradient-to-tr from-primary-600 to-primary-500 text-white shadow-primary-600/40'
                    }`}
                aria-label="Toggle Chat"
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-in spin-in-180 duration-300"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-in zoom-in duration-300"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" /><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" /></svg>
                )}
                {/* Notification Dot */}
                {!isOpen && !isConnected && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-bounce"></span>
                )}
            </button>
        </div>
    );
};

export default GuardianChat;
