'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  timestamp: Date;
  isEmergency?: boolean;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: 'Hey! 👋 I\'m Clara, your healthcare AI assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string>();
  const widgetRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Animation: Open/Close
  useEffect(() => {
    if (!widgetRef.current) return;

    if (isOpen) {
      gsap.to(widgetRef.current, {
        opacity: 1,
        scale: 1,
        pointerEvents: 'auto',
        duration: 0.3,
        ease: 'back.out',
      });
    } else {
      gsap.to(widgetRef.current, {
        opacity: 0,
        scale: 0.8,
        pointerEvents: 'none',
        duration: 0.2,
        ease: 'back.in',
      });
    }
  }, [isOpen]);

  // Animation: Button pulse when closed
  useEffect(() => {
    if (isOpen || !buttonRef.current) return;

    const pulse = gsap.timeline({ repeat: -1 });
    pulse.to(buttonRef.current, {
      scale: 1.1,
      duration: 0.5,
      ease: 'sine.inOut',
    });
    pulse.to(
      buttonRef.current,
      {
        scale: 1,
        duration: 0.5,
        ease: 'sine.inOut',
      },
      0.5
    );

    return () => {
      pulse.kill();
    };
  }, [isOpen]);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call chat API directly
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationId,
          sessionId: conversationId || 'session-' + Date.now(),
          userMessage: input,
          topic: 'general',
        }),
      });

      const result = await response.json();

      if (result.success && result.data) {
        if (!conversationId && result.data.conversationId) {
          setConversationId(result.data.conversationId);
        }

        // Track analytics
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'chat_message', {
            conversation_id: result.data.conversationId,
            is_emergency: result.data.isEmergency || false,
            has_phi: result.data.hasPHI || false,
          });
        }

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          text: result.data.assistantMessage,
          timestamp: new Date(),
          isEmergency: result.data.isEmergency,
        };

        setMessages((prev) => [...prev, botMessage]);

        // Auto-alert if emergency
        if (result.data.isEmergency) {
          console.warn('🚨 Emergency detected - admin notification sent');
        }
      } else {
        throw new Error(result.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: 'I encountered an error processing your message. Please try again or contact our support team at hello@ibusiness.com.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
    // Trigger send immediately
    setTimeout(() => {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        text: action,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          text: 'Great! You can also reach out via email at hello@ibusiness.com or book a briefing directly on our website.',
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);
      }, 800);
    }, 100);
  };

  return (
    <>
      {/* Chatbot Widget */}
      <div
        ref={widgetRef}
        className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-32px)] rounded-2xl shadow-2xl bg-white overflow-hidden opacity-0 scale-75 pointer-events-none z-50"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-accent-sage to-accent-navy p-4 text-white">
          <h3 className="font-semibold text-lg">Clara - Healthcare AI</h3>
          <p className="text-sm text-gray-200">Powered by ibusiness</p>
        </div>

        {/* Messages Container */}
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.type === 'user'
                    ? 'bg-accent-navy text-white rounded-br-none'
                    : `${msg.isEmergency ? 'bg-red-100 border-2 border-red-500' : 'bg-gray-200'} text-text-primary rounded-bl-none`
                }`}
              >
                {msg.isEmergency && (
                  <p className="text-xs font-bold text-red-600 mb-1">🚨 EMERGENCY ALERT</p>
                )}
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 px-4 py-2 rounded-lg rounded-bl-none">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length === 1 && (
          <div className="px-4 py-3 border-t border-gray-200 space-y-2">
            <p className="text-xs text-text-secondary font-medium">Quick actions:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleQuickAction('Tell me about your AI solutions')}
                className="text-xs bg-accent-sage text-white px-3 py-1 rounded-full hover:bg-opacity-90 transition"
              >
                AI Solutions
              </button>
              <button
                onClick={() => handleQuickAction('Book a briefing')}
                className="text-xs bg-accent-sage text-white px-3 py-1 rounded-full hover:bg-opacity-90 transition"
              >
                Book Meeting
              </button>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-accent-sage"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="bg-accent-navy text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-accent-sage to-accent-navy text-white shadow-lg hover:shadow-xl transition-shadow z-40 flex items-center justify-center text-2xl"
      >
        {isOpen ? '✕' : '💬'}
      </button>
    </>
  );
}
