import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Send, 
  X, 
  Bot, 
  User, 
  Sparkles, 
  RotateCcw, 
  Minimize2, 
  Maximize2,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  isError?: boolean;
}

const N8N_WEBHOOK_URL = 'https://lucky1843.app.n8n.cloud/webhook/7bdfa367-4b3a-4a98-92e6-a2e1b312e742/chat';

const QUICK_PROMPTS = [
  'What should I prioritize next in Physics?',
  'How do I eliminate Class 11 backlogs?',
  'Explain the 9-stage chapter study pipeline',
  'How does spaced revision work for JEE?',
];

export const N8nChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem('road_to_iit_chat_history');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'msg-welcome',
        sender: 'assistant',
        text: 'Hello aspirant! I am your Road to IIT 2028 Mentor, connected to your n8n AI agent. Ask me anything about chapter priorities, problem-solving workflows, revision cycles, or exam strategy.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>(() => {
    try {
      let sid = localStorage.getItem('road_to_iit_chat_session_id');
      if (!sid) {
        sid = 'jee2028_' + Math.random().toString(36).substring(2, 11);
        localStorage.setItem('road_to_iit_chat_session_id', sid);
      }
      return sid;
    } catch {
      return 'jee2028_' + Date.now();
    }
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem('road_to_iit_chat_history', JSON.stringify(messages));
    } catch {
      // ignore
    }
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || input).trim();
    if (!messageText || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Standard n8n chat payload structure
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
        },
        body: JSON.stringify({
          action: 'sendMessage',
          chatInput: messageText,
          message: messageText,
          sessionId: sessionId,
        }),
      });

      const contentType = response.headers.get('content-type') || '';
      let replyText = '';

      if (contentType.includes('application/json')) {
        const data = await response.json();
        // Support various n8n return schemas
        if (data.output) {
          replyText = typeof data.output === 'string' ? data.output : JSON.stringify(data.output);
        } else if (data.text) {
          replyText = data.text;
        } else if (data.response) {
          replyText = data.response;
        } else if (Array.isArray(data) && data[0]?.output) {
          replyText = data[0].output;
        } else if (data.message && data.message === 'Error in workflow') {
          replyText = 'n8n workflow error: The connected n8n AI agent encountered an issue (e.g. model rate-limit or temporary 503). Check your n8n workflow execution logs.';
        } else if (data.message) {
          replyText = data.message;
        } else {
          replyText = JSON.stringify(data, null, 2);
        }
      } else {
        replyText = await response.text();
      }

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: replyText || 'Response received from n8n agent.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `Unable to reach n8n webhook: ${err.message || 'Network error'}. Verify that your n8n cloud instance is active and CORS is allowed.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    const welcome: ChatMessage = {
      id: 'msg-welcome',
      sender: 'assistant',
      text: 'Chat history cleared. How can I help your JEE 2028 preparation today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([welcome]);
    sessionStorage.removeItem('road_to_iit_chat_history');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 z-40">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-xl shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all group"
            aria-label="Open n8n AI Chatbot"
          >
            <div className="relative">
              <Bot className="h-5 w-5 text-slate-950" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400" />
            </div>
            <span className="tracking-wide">Ask IIT Mentor</span>
          </button>
        </div>
      )}

      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <div 
          className="fixed bottom-4 right-4 z-50 w-[95vw] sm:w-[410px] h-[580px] max-h-[90vh] rounded-2xl border border-cyan-500/40 bg-slate-950 shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-200"
          role="dialog"
          aria-labelledby="n8n-chat-title"
        >
          {/* Header */}
          <div className="p-3.5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 id="n8n-chat-title" className="text-xs font-bold text-white leading-tight">
                    IIT Mentor AI
                  </h3>
                  <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>n8n Active</span>
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono block">
                  JEE 2028 Knowledge Agent
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearHistory}
                className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                title="Clear Chat History"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                aria-label="Close Chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Starter Chips */}
          <div className="px-3 py-2 bg-slate-900/40 border-b border-slate-800/60 overflow-x-auto flex gap-1.5 no-scrollbar">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="px-2.5 py-1 text-[11px] text-cyan-300 bg-cyan-950/40 border border-cyan-800/40 hover:bg-cyan-900/40 rounded-full whitespace-nowrap transition-colors shrink-0 disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map(msg => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-cyan-950 text-cyan-400 shrink-0 mt-0.5 border border-cyan-800">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl p-3 leading-relaxed whitespace-pre-wrap ${
                      isUser
                        ? 'bg-cyan-500 text-slate-950 font-medium rounded-tr-none shadow-sm'
                        : msg.isError
                        ? 'bg-rose-950/60 text-rose-200 border border-rose-800 rounded-tl-none'
                        : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none shadow-sm'
                    }`}
                  >
                    <div>{msg.text}</div>
                    <div
                      className={`text-[9px] mt-1 text-right font-mono ${
                        isUser ? 'text-slate-800' : 'text-slate-500'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {isUser && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-white shrink-0 mt-0.5">
                      <User className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-cyan-950 text-cyan-400 shrink-0 mt-0.5 border border-cyan-800">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none p-3 text-slate-400 flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" />
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="text-[11px] font-mono">Consulting n8n AI agent...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Deck */}
          <div className="p-3 border-t border-slate-800 bg-slate-900/90">
            <div className="relative flex items-center">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about syllabus, PYQs, backlogs..."
                rows={1}
                className="w-full pl-3 pr-10 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none max-h-24"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-1.5 text-cyan-400 hover:text-cyan-300 disabled:opacity-40 transition-colors"
                aria-label="Send Message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono mt-1 px-1">
              <span>Press Enter to send</span>
              <span>Endpoint: n8n.cloud</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
