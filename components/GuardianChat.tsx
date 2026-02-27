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
            {isOpen && (
                <div className="bg-white rounded-2xl shadow-2xl w-80 mb-4 overflow-hidden border border-gray-100 flex flex-col transition-all duration-300">
                    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold text-lg">Guardian AI</h3>
                            <p className="text-xs text-blue-100 flex items-center gap-1">
                                <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-gray-300'}`}></span>
                                {status}
                            </p>
                        </div>
                        <button
                            onClick={toggleChat}
                            className="text-white/80 hover:text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>
                    </div>

                    {isConnected ? (
                        <div className="flex flex-col h-[400px] bg-slate-50">
                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((msg, idx) => (
                                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${msg.role === 'user' ? 'bg-primary-600 text-white rounded-br-none' : 'bg-white text-slate-700 rounded-bl-none border border-slate-100'}`}>
                                            <p className="text-sm leading-relaxed">{msg.text}</p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-3 bg-white border-t border-slate-100">
                                <form onSubmit={sendMessage} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        placeholder="Type your message..."
                                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!inputText.trim()}
                                        className="bg-primary-600 text-white p-2.5 rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                                    </button>
                                </form>
                                <button
                                    onClick={toggleConnection}
                                    className="w-full mt-3 py-2 text-xs font-medium text-slate-500 hover:text-red-500 transition-colors"
                                >
                                    End Conversation
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="p-6 flex flex-col items-center justify-center min-h-[300px] bg-slate-50">
                            <div className="text-center mb-6">
                                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
                                </div>
                                <h4 className="font-semibold text-slate-800 mb-2">Guardian Dental Assistant</h4>
                                <p className="text-sm text-slate-600">
                                    Have a question? Chat with our AI assistant to learn about our services or book an appointment.
                                </p>
                            </div>

                            <button
                                onClick={toggleConnection}
                                className="w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                                Start Chat
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Floating Toggle Button */}
            <button
                onClick={toggleChat}
                className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-105 ${isOpen ? 'bg-gray-800' : 'bg-blue-600 text-white'}`}
                aria-label="Toggle Chat"
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" /><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" /></svg>
                )}
            </button>
        </div>
    );
};

export default GuardianChat;
