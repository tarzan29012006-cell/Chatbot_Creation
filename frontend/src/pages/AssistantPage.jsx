import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Send, Plus, Trash2, RotateCcw, AlertCircle, Bot, User, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import CollegeLogo from '../assets/CollegeLogo';
import MascotRobot from '../assets/MascotRobot';

const SUGGESTION_CHIPS = [
  "Tell me about the courses",
  "Admission process",
  "Upcoming events",
  "Campus facilities"
];

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

export default function AssistantPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState(null);
  const [lastQuery, setLastQuery] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [sessionsList, setSessionsList] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize Visitor & Session
  useEffect(() => {
    let visitorId = localStorage.getItem('svce_visitor_id');
    if (!visitorId) {
      visitorId = `vis_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      localStorage.setItem('svce_visitor_id', visitorId);
    }

    loadSessionsList(visitorId);

    const storedSessionId = localStorage.getItem('svce_chat_session_id');
    if (storedSessionId) {
      setSessionId(storedSessionId);
      loadSessionMessages(storedSessionId);
    } else {
      createNewSession(visitorId);
    }
  }, []);

  const loadSessionsList = async (vId) => {
    try {
      const res = await fetch(`/api/chat/sessions/?visitor_id=${vId}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setSessionsList(data);
      }
    } catch (err) {
      console.error('Failed to load past sessions:', err);
    }
  };

  const loadSessionMessages = async (sid) => {
    try {
      const res = await fetch(`/api/chat/sessions/${sid}/messages/`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setMessages(data);
      }
    } catch (err) {
      console.error('Failed to load messages for session:', err);
    }
  };

  const createNewSession = async (overrideVisitorId) => {
    const vId = overrideVisitorId || localStorage.getItem('svce_visitor_id') || 'guest';
    try {
      const res = await fetch('/api/chat/sessions/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitor_id: vId, title: 'New Conversation' })
      });
      const data = await res.json();
      if (data.id) {
        setSessionId(data.id);
        localStorage.setItem('svce_chat_session_id', data.id);
        setMessages([]);
        setErrorState(null);
        loadSessionsList(vId);
      }
    } catch (err) {
      console.error('Failed to create new session:', err);
    }
  };

  const switchSession = (sid) => {
    setSessionId(sid);
    localStorage.setItem('svce_chat_session_id', sid);
    setErrorState(null);
    loadSessionMessages(sid);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const deleteSession = async (e, sid) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this conversation?')) return;
    try {
      await fetch(`/api/chat/sessions/${sid}/`, { method: 'DELETE' });
      const vId = localStorage.getItem('svce_visitor_id');
      loadSessionsList(vId);
      if (sessionId === sid) {
        createNewSession(vId);
      }
    } catch (err) {
      console.error('Failed to delete session:', err);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const handleSend = async (overrideText) => {
    const query = (overrideText || input).trim();
    if (!query || loading) return;

    if (query.length > 1000) {
      setErrorState('Your message exceeds the 1,000 character limit. Please shorten your question.');
      return;
    }

    setInput('');
    setErrorState(null);
    setLastQuery(query);

    // Optimistically show user message
    const tempUserMsg = { id: `temp_${Date.now()}`, role: 'user', content: query };
    setMessages((prev) => [...prev, tempUserMsg]);
    setLoading(true);

    try {
      let activeSid = sessionId;
      if (!activeSid) {
        const vId = localStorage.getItem('svce_visitor_id') || 'guest';
        const sRes = await fetch('/api/chat/sessions/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ visitor_id: vId, title: query.substring(0, 30) })
        });
        const sData = await sRes.json();
        activeSid = sData.id;
        setSessionId(activeSid);
        localStorage.setItem('svce_chat_session_id', activeSid);
      }

      const res = await fetch(`/api/chat/sessions/${activeSid}/messages/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: query })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Server error occurred');
      }

      if (data.assistant_message) {
        setMessages((prev) => [
          ...prev.filter((m) => m.id !== tempUserMsg.id),
          data.user_message,
          data.assistant_message
        ]);
        const vId = localStorage.getItem('svce_visitor_id');
        loadSessionsList(vId);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setErrorState("I'm having a brief connection hiccup reaching our knowledge server right now! Please click Retry.");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastQuery) {
      handleSend(lastQuery);
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f6ff] via-[#eaf2fc] to-[#f4f8ff] flex flex-col justify-between relative overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
      
      {/* Decorative Dot Matrix Grid (Top Right matching mockup) */}
      <div className="absolute top-16 right-8 sm:right-16 pointer-events-none opacity-40 select-none">
        <div className="grid grid-cols-6 gap-2.5">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-300" />
          ))}
        </div>
      </div>

      {/* Decorative Soft Curved Wave Shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-200/25 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 1. Dedicated Header matching Mockup */}
      <header className="bg-white/95 backdrop-blur-md border-b border-blue-100/80 px-4 sm:px-8 py-3.5 z-30 sticky top-0 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* College Crest & Title */}
          <Link to="/" className="hover:opacity-95 transition-opacity">
            <CollegeLogo />
          </Link>

          {/* Right Header Navigation */}
          <div className="flex items-center gap-3">
            {/* Conversation History Toggle Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-svce-primary" />
              <span>History ({sessionsList.length})</span>
            </button>

            {/* Back to Home Link matching mockup */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1254cf] hover:text-[#0b44aa] px-3.5 py-1.5 rounded-full hover:bg-blue-50/80 transition-all duration-150"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Sessions History Drawer / Modal */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar Drawer */}
          <div className="relative ml-auto w-80 sm:w-96 bg-white h-full shadow-2xl p-6 flex flex-col z-10 animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-svce-primary" />
                <h3 className="font-semibold text-slate-800 text-base">Conversation History</h3>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* New Chat Button (SRS FR-H6) */}
            <div className="py-4">
              <button
                onClick={() => {
                  createNewSession();
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#1254cf] hover:bg-[#0b44aa] text-white py-2.5 px-4 rounded-xl font-medium text-sm transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Start New Chat</span>
              </button>
            </div>

            {/* Session List (SRS FR-H5, FR-H7) */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {sessionsList.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-sm">
                  No saved conversations yet.
                </div>
              ) : (
                sessionsList.map((s) => {
                  const isCurrent = s.id === sessionId;
                  return (
                    <div
                      key={s.id}
                      onClick={() => switchSession(s.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                        isCurrent
                          ? 'bg-blue-50/80 border-blue-200 text-svce-primary font-medium'
                          : 'bg-slate-50/60 border-slate-100 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex-1 min-w-0 pr-2">
                        <div className="text-sm truncate font-medium">
                          {s.title || 'Conversation'}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {new Date(s.last_active_at).toLocaleDateString([], {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                      <button
                        onClick={(e) => deleteSession(e, s.id)}
                        title="Delete conversation"
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-white transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center">
              Conversations are stored per browser session (SRS FR-H1).
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col justify-between">
        
        {/* Welcome Section (When no messages or on initial load) */}
        {!hasMessages ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center my-auto py-6 space-y-6">
            
            {/* Mascot Robot Illustration matching Mockup */}
            <div className="w-44 h-44 sm:w-52 sm:h-52">
              <MascotRobot className="w-full h-full" />
            </div>

            {/* Title & Subtitle matching Mockup */}
            <div className="space-y-2 max-w-xl">
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0c2340] tracking-tight">
                College Assistant
              </h1>
              <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
                Ask me anything about our college — courses, admissions, events and more!
              </p>
            </div>

            {/* 4 Suggestion Chips (2x2 Grid matching Mockup) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-lg pt-2">
              {SUGGESTION_CHIPS.map((chip, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(chip)}
                  disabled={loading}
                  className="bg-white/95 hover:bg-blue-50/80 text-slate-700 hover:text-[#1254cf] font-medium text-xs sm:text-sm py-3 px-5 rounded-full border border-blue-100/90 shadow-2xs hover:shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-center"
                >
                  {chip}
                </button>
              ))}
            </div>

          </div>
        ) : (
          /* Conversation Messages Stream */
          <div className="flex-1 overflow-y-auto space-y-4 py-4 pr-1">
            {/* Compact Header for ongoing chat */}
            <div className="flex items-center justify-between pb-3 border-b border-blue-100/80 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-[#1254cf]">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="font-semibold text-slate-700">SVCE College Assistant</span>
                <span className="text-[11px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                  Official Assistant
                </span>
              </div>
              <button
                onClick={() => createNewSession()}
                className="flex items-center gap-1 text-svce-primary hover:text-blue-800 font-medium"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Chat</span>
              </button>
            </div>

            {messages.map((m, idx) => {
              const isUser = m.role === 'user';
              return (
                <div
                  key={m.id || idx}
                  className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in duration-200`}
                >
                  {!isUser && (
                    <div className="w-8 h-8 rounded-full bg-white border border-blue-200 flex-shrink-0 flex items-center justify-center text-[#1254cf] shadow-2xs mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 shadow-xs leading-relaxed text-sm ${
                      isUser
                        ? 'bg-[#1254cf] text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-blue-100/80 rounded-bl-xs'
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-sans">
                      {formatCleanText(m.content)}
                    </div>
                    <div
                      className={`text-[10px] mt-1.5 text-right ${
                        isUser ? 'text-blue-200' : 'text-slate-400'
                      }`}
                    >
                      {m.created_at
                        ? new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        : 'Just now'}
                    </div>
                  </div>

                  {isUser && (
                    <div className="w-8 h-8 rounded-full bg-[#0c2340] text-white flex-shrink-0 flex items-center justify-center text-xs shadow-2xs mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator (FR-C10) */}
            {loading && (
              <div className="flex gap-3 justify-start animate-in fade-in">
                <div className="w-8 h-8 rounded-full bg-white border border-blue-200 flex-shrink-0 flex items-center justify-center text-[#1254cf] shadow-2xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-blue-100 rounded-2xl rounded-bl-xs px-5 py-3 text-slate-500 flex items-center gap-2 shadow-xs">
                  <div className="flex space-x-1.5">
                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                  </div>
                  <span className="text-xs font-medium text-slate-500">
                    College Assistant is thinking...
                  </span>
                </div>
              </div>
            )}

            {/* Error & Friendly Retry Card (FR-C10) */}
            {errorState && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start justify-between gap-3 text-amber-900 text-xs sm:text-sm animate-in fade-in">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-amber-800">Connection Note</div>
                    <div className="mt-0.5">{errorState}</div>
                  </div>
                </div>
                <button
                  onClick={handleRetry}
                  className="flex-shrink-0 inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white font-medium px-3 py-1.5 rounded-lg text-xs transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retry</span>
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}

        {/* 2. Message Input Box matching Mockup */}
        <div className="w-full pt-4 pb-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="relative flex items-center w-full"
          >
            {/* Pill Search / Input Container */}
            <div className="relative w-full flex items-center bg-white rounded-full border border-blue-200/90 shadow-lg shadow-blue-900/5 focus-within:border-blue-500 focus-within:ring-3 focus-within:ring-blue-100 transition-all p-1.5 sm:p-2">
              
              {/* Left Search Icon matching Mockup */}
              <div className="pl-3 sm:pl-4 pr-2 text-slate-400">
                <Search className="w-5 h-5" />
              </div>

              {/* Input Field */}
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your query here..."
                maxLength={1000}
                disabled={loading}
                className="w-full text-sm sm:text-base text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none py-1.5 px-1 font-sans"
              />

              {/* Right Ask Button with Send Icon matching Mockup */}
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex-shrink-0 inline-flex items-center gap-2 bg-[#1254cf] hover:bg-[#0b44aa] disabled:opacity-50 disabled:hover:bg-[#1254cf] text-white font-medium px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-200 shadow-sm active:scale-95 text-xs sm:text-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Ask</span>
              </button>
            </div>
          </form>

          {/* Privacy Disclaimer (SRS NFR-6) */}
          <p className="text-[11px] text-slate-400 text-center mt-2.5">
            The College Assistant answers questions about Sri Venkateswara College of Engineering. Please do not submit personal passwords or confidential data.
          </p>
        </div>

      </main>

    </div>
  );
}
