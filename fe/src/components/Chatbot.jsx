import { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, Loader2 } from 'lucide-react';

const GEMINI_API_KEY = 'AIzaSyA41844adb-W1261OU8U002JEXOXeFCrt8';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_CONTEXT = `You are a helpful assistant for Karigar Hub, an Indian handcrafted marketplace that sells authentic handmade products from verified artisans across 28 Indian states.

Products include: Handloom & Sarees, Jewellery, Pottery & Decor, Paintings, Festive Items, Wooden Crafts, Gifts, Bamboo & Cane crafts, Dokra art, Madhubani paintings, Pattachitra, Chikankari, and more.

IMPORTANT: Always respond in English only, regardless of what language the user writes in. Keep responses short, friendly, and helpful. If asked about products, suggest relevant categories. If asked about artisans, mention they can browse the Karigars section. Do not use markdown formatting like ** or ## in your responses.`;

const PRODUCT_KEYWORDS = ['product', 'buy', 'shop', 'craft', 'handmade', 'saree', 'pottery', 'jewellery', 'painting', 'gift', 'suggest', 'show', 'recommend', 'handicraft', 'item', 'खरीद', 'उत्पाद', 'शिल्प'];

const PRODUCT_SUGGESTIONS = [
  { name: 'Sambalpuri Saree', price: '₹2,499', category: 'Handloom', emoji: '🧣' },
  { name: 'Dokra Jhumkas', price: '₹899', category: 'Jewellery', emoji: '💍' },
  { name: 'Madhubani Painting', price: '₹1,299', category: 'Paintings', emoji: '🎨' },
  { name: 'Terracotta Pot Set', price: '₹649', category: 'Pottery', emoji: '🏺' },
  { name: 'Brass Diya Set', price: '₹449', category: 'Festive Items', emoji: '🪔' },
  { name: 'Coconut Shell Craft', price: '₹299', category: 'Bamboo & Cane', emoji: '🥥' },
];

function isProductQuery(text) {
  return PRODUCT_KEYWORDS.some(k => text.toLowerCase().includes(k));
}

async function askGemini(userMessage) {
  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        { role: 'user', parts: [{ text: SYSTEM_CONTEXT }] },
        { role: 'model', parts: [{ text: 'Understood! I am the Karigar Hub assistant. How can I help you today?' }] },
        { role: 'user', parts: [{ text: userMessage }] },
      ],
    }),
  });
  if (!res.ok) throw new Error('Gemini API error');
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "Thanks for your message. We'll get back to you soon.";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, from: 'bot', text: 'Hello! 👋 How can I help you today?\n\nI can help you find handcrafted products, learn about our artisans, or answer any questions about Karigar Hub.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = async (overrideText) => {
    const text = (overrideText || input).trim();
    if (!text || loading) return;

    const userMsg = { id: Date.now(), from: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const reply = await askGemini(text);
      const botMsg = { id: Date.now() + 1, from: 'bot', text: reply };
      setMessages(prev => [...prev, botMsg]);

      if (isProductQuery(text)) {
        const shuffled = [...PRODUCT_SUGGESTIONS].sort(() => 0.5 - Math.random()).slice(0, 3);
        setMessages(prev => [...prev, { id: Date.now() + 2, from: 'bot', type: 'products', products: shuffled }]);
      }
    } catch (err) {
      console.error('Gemini error:', err);
      setMessages(prev => [...prev, {
        id: Date.now() + 1, from: 'bot',
        text: "Sorry, I couldn't connect right now. Please try again in a moment! 🙏",
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <>
      {/* ── Chat Window ── */}
      <div
        style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: 'min(380px, calc(100vw - 32px))',
          height: 'min(520px, calc(100vh - 120px))',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
          border: '1px solid rgba(232,213,176,0.6)',
          background: '#FDF6EC',
          transformOrigin: 'bottom right',
          transform: open ? 'scale(1)' : 'scale(0.85)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease',
        }}
      >
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #C0522B, #7B1C2E)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
            🏺
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: '#fff', fontWeight: 700, fontSize: 14, margin: 0 }}>Karigar Hub Assistant</p>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, margin: 0 }}>
              {loading ? '✦ Typing...' : '● Online'}
            </p>
          </div>
          <button onClick={() => setOpen(false)}
            style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 30, height: 30, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <X size={15} />
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {messages.map(msg => (
            <div key={msg.id}>
              {/* Product cards */}
              {msg.type === 'products' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <p style={{ fontSize: 11, color: '#7B5C3A', fontWeight: 600, margin: '0 0 4px 0' }}>✨ You might like these:</p>
                  {msg.products.map((p, i) => (
                    <a key={i} href={`/products?category=${p.category}`}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: '1px solid #E8D5B0', borderRadius: 12, padding: '8px 12px', textDecoration: 'none', transition: 'box-shadow 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(192,82,43,0.15)'}
                      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                      <span style={{ fontSize: 24 }}>{p.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: '#2C1A0E' }}>{p.name}</p>
                        <p style={{ margin: 0, fontSize: 11, color: '#7B5C3A' }}>{p.category}</p>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#C0522B' }}>{p.price}</span>
                    </a>
                  ))}
                </div>
              ) : (
                /* Text bubble */
                <div style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
                  {msg.from === 'bot' && (
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#C0522B,#7B1C2E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, marginRight: 6, flexShrink: 0, alignSelf: 'flex-end' }}>
                      🏺
                    </div>
                  )}
                  <div style={{
                    maxWidth: '78%',
                    padding: '9px 13px',
                    borderRadius: msg.from === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: msg.from === 'user' ? 'linear-gradient(135deg,#C0522B,#9A3E1E)' : '#fff',
                    color: msg.from === 'user' ? '#fff' : '#2C1A0E',
                    fontSize: 13,
                    lineHeight: 1.5,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                    border: msg.from === 'bot' ? '1px solid #E8D5B0' : 'none',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}>
                    {msg.text}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#C0522B,#7B1C2E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>🏺</div>
              <div style={{ background: '#fff', border: '1px solid #E8D5B0', borderRadius: '18px 18px 18px 4px', padding: '10px 14px', display: 'flex', gap: 4, alignItems: 'center' }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#C0522B', display: 'inline-block', animation: `chatDot 1.2s ${i * 0.2}s infinite ease-in-out` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick suggestions — show after every bot reply */}
        <div style={{ padding: '0 12px 8px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['Show products', 'Meet artisans', 'Track my order', 'About Karigar Hub'].map(s => (
            <button key={s} onClick={() => sendMessage(s)}
                style={{ fontSize: 11, padding: '5px 10px', borderRadius: 20, border: '1px solid #E8D5B0', background: '#fff', color: '#C0522B', cursor: 'pointer', fontWeight: 600, transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#C0522B'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#C0522B'; }}>
                {s}
              </button>
            ))}
        </div>

        {/* Input */}
        <div style={{ padding: '10px 12px', borderTop: '1px solid #E8D5B0', background: '#fff', display: 'flex', gap: 8, alignItems: 'flex-end', flexShrink: 0 }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type a message..."
            rows={1}
            style={{
              flex: 1, border: '1.5px solid #E8D5B0', borderRadius: 14, padding: '9px 12px', fontSize: 13,
              color: '#2C1A0E', background: '#FDF6EC', resize: 'none', outline: 'none', fontFamily: 'inherit',
              lineHeight: 1.4, maxHeight: 80, overflowY: 'auto', transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = '#C0522B'}
            onBlur={e => e.target.style.borderColor = '#E8D5B0'}
          />
          <button onClick={sendMessage} disabled={!input.trim() || loading}
            style={{
              width: 38, height: 38, borderRadius: '50%', border: 'none', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
              background: input.trim() && !loading ? 'linear-gradient(135deg,#C0522B,#9A3E1E)' : '#E8D5B0',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s',
            }}>
            {loading ? <Loader2 size={15} color="#fff" style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={15} color={input.trim() ? '#fff' : '#B8A080'} />}
          </button>
        </div>
      </div>

      {/* ── Floating Button ── */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed', bottom: 20, right: 20, zIndex: 9999,
          width: 56, height: 56, borderRadius: '50%', border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg, #C0522B, #7B1C2E)',
          boxShadow: '0 4px 20px rgba(192,82,43,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(192,82,43,0.55)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(192,82,43,0.45)'; }}
        title="Chat with us"
      >
        <div style={{ transition: 'transform 0.25s, opacity 0.2s', transform: open ? 'rotate(90deg) scale(0.8)' : 'rotate(0deg) scale(1)', opacity: open ? 0 : 1, position: 'absolute' }}>
          <MessageCircle size={24} color="#fff" />
        </div>
        <div style={{ transition: 'transform 0.25s, opacity 0.2s', transform: open ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.8)', opacity: open ? 1 : 0, position: 'absolute' }}>
          <X size={22} color="#fff" />
        </div>
      </button>

      {/* ── Keyframe styles injected once ── */}
      <style>{`
        @keyframes chatDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
