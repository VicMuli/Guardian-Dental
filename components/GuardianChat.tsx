import React, { useEffect, useState, useRef } from 'react';
import { Conversation } from '@elevenlabs/client';

const GuardianChat = () => {
    const [conversation, setConversation] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [status, setStatus] = useState('Idle');

    // Audio configuration for ElevenLabs
    const initClient = async () => {
        try {
            // Request microphone permission
            await navigator.mediaDevices.getUserMedia({ audio: true });

            // @ts-ignore - types in v0.15.0 are conflicted around agentId vs conversationToken
            const conv = await Conversation.startSession({
                agentId: import.meta.env.VITE_ELEVENLABS_AGENT_ID,
                onConnect: () => {
                    setIsConnected(true);
                    setStatus('Connected');
                },
                onDisconnect: () => {
                    setIsConnected(false);
                    setStatus('Disconnected');
                },
                onError: (error) => {
                    console.error('ElevenLabs Error:', error);
                    setStatus('Error: ' + error.message);
                },
                onModeChange: ({ mode }) => {
                    setStatus(mode === 'speaking' ? 'Agent Speaking' : 'Listening...');
                },
            });

            setConversation(conv);
        } catch (err) {
            console.error('Failed to initialize ElevenLabs:', err);
            setStatus('Microphone access denied or connection failed');
        }
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
        <div className="fixed bottom-6 right-6 z-50 font-sans">
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

                    <div className="p-6 flex flex-col items-center justify-center min-h-[200px] bg-slate-50">
                        <div className="text-center mb-6">
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${isConnected ? 'bg-blue-100 text-blue-600 shadow-inner' : 'bg-gray-100 text-gray-400'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={status === 'Agent Speaking' ? 'animate-pulse' : ''}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>
                            </div>
                            <p className="text-sm text-gray-600">
                                {isConnected
                                    ? 'Voice chat is active. Ask me anything about our dental services!'
                                    : 'Click the microphone to start talking to our AI assistant.'}
                            </p>
                        </div>

                        <button
                            onClick={toggleConnection}
                            className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${isConnected
                                ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                                }`}
                        >
                            {isConnected ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /></svg>
                                    End Chat
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>
                                    Start Voice Chat
                                </>
                            )}
                        </button>
                    </div>
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
