import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MessageSquare, X, Send, Maximize2, RotateCcw, Bot } from 'lucide-react';

function formatCleanText(text) {
  if (!text) return '';
  return text
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/\*{2,}(.*?)\*{2,}/g, '$1')
    .replace(/^\s*[\*\•]\s+/gm, '- ')
    .replace(/\*{1,2}/g, '')
    .replace(/_{1,2}(.*?)_{1,2}/g, '$1')
    .replace(/`/g, '')
    .trim();
}

export default function FloatingChatButton() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  // Hide on assistant page per SRS 3.1
  if (location.pathname === '/assistant') {
    return null;
  }

  // Retrieve or create session ID from localStorage
  useEffect(() => {
    let sid = localStorage.getItem('svce_chat_session_id');
    if (!sid) {
      const visitorId = localStorage.getItem('svce_visitor_id') || `vis_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      localStorage.setItem('svce_visitor_id', visitorId);

      // Create session in backend
      fetch('/api/chat/sessions/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitor_id: visitorId, title: 'Quick Chat' })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.id) {
            localStorage.setItem('svce_chat_session_id', data.id);
            setSessionId(data.id);
          }
        })
        .catch((err) => console.error('Session init error:', err));
    } else {
      setSessionId(sid);
      // Load earlier messages
      fetch(`/api/chat/sessions/${sid}/messages/`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setMessages(data);
          }
        })
        .catch((err) => console.error('Load messages error:', err));
    }
  }, []);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    setInput('');
    const tempUserMsg = { id: Date.now(), role: 'user', content: query };
    setMessages((prev) => [...prev, tempUserMsg]);
    setLoading(true);

    try {
      let activeSession = sessionId;
      if (!activeSession) {
        const sidRes = await fetch('/api/chat/sessions/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ visitor_id: localStorage.getItem('svce_visitor_id') || 'guest' })
        });
        const sidData = await sidRes.json();
        activeSession = sidData.id;
        setSessionId(activeSession);
        localStorage.setItem('svce_chat_session_id', activeSession);
      }

      const res = await fetch(`/api/chat/sessions/${activeSession}/messages/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: query })
      });
      const data = await res.json();

      if (data.assistant_message) {
        setMessages((prev) => [...prev, data.assistant_message]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            role: 'assistant',
            content: data.reply || "I'm having a brief connection hiccup. Please try again! 😊"
          }
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: "I'm having trouble connecting to the knowledge server. Please retry! 🎓"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Quick Chat Popup Modal */}
      {isOpen && (
        <div className="mb-4 w-[360px] sm:w-[400px] h-[520px] bg-white rounded-2xl shadow-2xl border border-blue-100 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-[#0b1a30] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">SVCE College Assistant</h3>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online • SVCE Virtual Assistant
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/assistant');
                }}
                title="Expand to Full Assistant Page"
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Suggestion Chips */}
          <div className="bg-blue-50/60 px-3 py-2 border-b border-blue-100/60 flex gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
            {['Courses offered', 'Admission process', 'Fee details', 'Placements'].map((chip, i) => (
              <button
                key={i}
                onClick={() => handleSend(chip)}
                className="flex-shrink-0 bg-white hover:bg-blue-600 hover:text-white text-slate-700 px-2.5 py-1 rounded-full border border-blue-200 shadow-2xs transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Message History Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-blue-50/20 to-white text-xs">
            {messages.length === 0 ? (
              <div className="text-center py-8 px-4 text-slate-500 space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-[#1254cf]">
                  <Bot className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-slate-700 text-sm">Welcome to SVCE Assistant!</h4>
                <p className="text-xs text-slate-500">
                  Ask me about engineering courses, cut-offs, fee structure, hostel facilities, or campus events.
                </p>
              </div>
            ) : (
              messages.map((m, idx) => {
                const isUser = m.role === 'user';
                return (
                  <div
                    key={idx}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-xs leading-relaxed whitespace-pre-wrap ${
                        isUser
                          ? 'bg-[#1254cf] text-white rounded-br-xs'
                          : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                      }`}
                    >
                      {formatCleanText(m.content)}
                    </div>
                  </div>
                );
              })
            )}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-xs px-4 py-2 text-slate-500 flex items-center gap-2 shadow-xs">
                  <div className="flex space-x-1">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" />
                  </div>
                  <span className="text-[11px]">Assistant is typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Input Field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your query..."
              className="flex-1 px-3 py-2 text-xs rounded-full border border-slate-200 focus:outline-none focus:border-blue-500 bg-slate-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-8 h-8 rounded-full bg-[#1254cf] hover:bg-blue-700 disabled:opacity-50 text-white flex items-center justify-center transition-colors shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Full Page Link Footer */}
          <div className="bg-slate-50 px-3 py-1.5 border-t border-slate-100 text-center">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/assistant');
              }}
              className="text-[11px] text-blue-600 hover:text-blue-800 font-medium"
            >
              View Full Assistant Screen & History →
            </button>
          </div>
        </div>
      )}

      {/* Floating Button matching the uploaded image */}
      <div className="flex flex-col items-end gap-2 group">
        {/* Tooltip speech bubble badge: "Chat with us!" matching mockup */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer bg-[#0b1a30] text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-lg relative transition-transform hover:scale-105 active:scale-95 animate-bounce [animation-duration:2.5s]"
        >
          <span>Chat with us!</span>
          {/* Pointer caret pointing down */}
          <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-[#0b1a30] rotate-45 transform" />
        </div>

        {/* Circular Blue Mascot Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open College Assistant Chat"
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#0d47a1] to-[#1e88e5] text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none"
        >
          {/* Pulsing Signal Wave Rings matching mockup arcs */}
          <span className="absolute inset-0 rounded-full bg-blue-400 opacity-30 animate-ping -z-10" />
          <span className="absolute -inset-1.5 rounded-full border border-blue-400/50 opacity-60 animate-pulse -z-10" />

          {/* Radiating Antenna Waves SVG */}
          <svg className="absolute -top-1 -right-1 w-5 h-5 text-yellow-300 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 4a8 8 0 0 1 0 16" />
            <path d="M19 1a12 12 0 0 1 0 22" />
          </svg>

          {/* Robot Icon */}
          <div className="w-8 h-8 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-white">
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <circle cx="12" cy="5" r="2" />
              <path d="M12 7v4" />
              <line x1="8" y1="16" x2="8.01" y2="16" strokeWidth="3" />
              <line x1="16" y1="16" x2="16.01" y2="16" strokeWidth="3" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
