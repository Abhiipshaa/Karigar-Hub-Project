import { useState, useRef, useEffect } from 'react';
import { Menu, Search, Bell, ChevronDown, LogOut, Settings, User, Check, Plus } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const pageMeta = {
  '/admin':           { title: 'Dashboard',  sub: 'Overview of your platform',       emoji: '📊' },
  '/admin/users':     { title: 'Users',      sub: 'Manage registered users',         emoji: '👥' },
  '/admin/karigars':  { title: 'Karigars',   sub: 'Manage artisan accounts',         emoji: '🧑\u200d🎨' },
  '/admin/products':  { title: 'Products',   sub: 'Manage product listings',         emoji: '📦' },
  '/admin/orders':    { title: 'Orders',     sub: 'Track and manage orders',         emoji: '🛒' },
  '/admin/reviews':   { title: 'Reviews',    sub: 'Manage ratings & reviews',        emoji: '⭐' },
  '/admin/returns':   { title: 'Returns',    sub: 'Handle return & refund requests', emoji: '🔄' },
  '/admin/activity':  { title: 'Activity',   sub: 'Real-time platform activity',     emoji: '⚡' },
};

// TODO: Replace with backend API later
const notifications = [
  { id: 1, text: '2 new karigars pending approval', time: '5m ago',  unread: true,  icon: '🧑\u200d🎨', type: 'warning' },
  { id: 2, text: 'Order #KH-7821 has been shipped', time: '12m ago', unread: true,  icon: '📦',         type: 'info'    },
  { id: 3, text: 'New user registered from Mumbai',  time: '1h ago',  unread: false, icon: '👤',         type: 'success' },
  { id: 4, text: 'Revenue milestone: ₹42L reached',  time: '3h ago',  unread: false, icon: '🎉',         type: 'success' },
];

const notifColors = {
  warning: { bg: '#FFFBEB', border: '#FDE68A', dot: '#F59E0B' },
  info:    { bg: '#EFF6FF', border: '#BFDBFE', dot: '#3B82F6' },
  success: { bg: '#F0FDF4', border: '#BBF7D0', dot: '#22C55E' },
};

const dropVariants = {
  hidden:  { opacity: 0, y: 8, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 420, damping: 30 } },
  exit:    { opacity: 0, y: 6, scale: 0.97, transition: { duration: 0.15 } },
};

export default function AdminTopbar({ onMenuClick }) {
  const [dropOpen, setDropOpen]   = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs]       = useState(notifications);
  const location = useLocation();
  const page = pageMeta[location.pathname] || { title: 'Admin', sub: '', emoji: '⚙️' };
  const unread = notifs.filter(n => n.unread).length;
  const dropRef  = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const h = e => {
      if (dropRef.current  && !dropRef.current.contains(e.target))  setDropOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 px-8 h-16"
      style={{
        background: 'rgba(247,241,232,0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 1px 0 rgba(0,0,0,0.04)',
      }}>

      {/* Hamburger */}
      <button onClick={onMenuClick}
        className="lg:hidden flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
        style={{ background: 'rgba(192,82,43,0.08)' }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(192,82,43,0.14)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(192,82,43,0.08)'}>
        <Menu size={18} style={{ color: '#7B3A18' }} />
      </button>

      {/* Page title */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="min-w-0">
          <h1 className="font-semibold text-[#1A0A02] text-[15px] leading-tight tracking-tight truncate">{page.title}</h1>
          <p className="text-xs hidden sm:block truncate mt-0.5" style={{ color: '#A07850' }}>{page.sub}</p>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search — right side */}
      <div className="hidden md:flex max-w-xs lg:max-w-sm">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-4 pr-9 py-2 rounded-xl text-sm focus:outline-none transition-all"
            style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.07)', color: '#2C1A0E' }}
            onFocus={e => { e.target.style.background = 'white'; e.target.style.borderColor = '#C0522B'; e.target.style.boxShadow = '0 0 0 3px rgba(192,82,43,0.08)'; }}
            onBlur={e => { e.target.style.background = 'rgba(0,0,0,0.04)'; e.target.style.borderColor = 'rgba(0,0,0,0.07)'; e.target.style.boxShadow = 'none'; }}
          />
          <Search size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#B8956A' }} />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1.5 flex-shrink-0">

        {/* Add button */}
        <button className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-white transition-all"
          style={{ background: '#C0522B', boxShadow: '0 1px 3px rgba(192,82,43,0.3)' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#A8421E'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(192,82,43,0.35)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#C0522B'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(192,82,43,0.3)'; }}>
          <Plus size={13} /> Add New
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setNotifOpen(v => !v); setDropOpen(false); }}
            className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150"
            style={{ color: '#7B5C3A' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <Bell size={16} />
            {unread > 0 && (
              <span
                className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full text-[8px] font-bold flex items-center justify-center text-white"
                style={{ background: '#C0522B' }}>
                {unread}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div variants={dropVariants} initial="hidden" animate="visible" exit="exit"
                className="absolute right-0 top-full mt-2 w-80 rounded-2xl overflow-hidden z-50"
                style={{ background: 'white', border: '1px solid rgba(232,213,176,0.5)', boxShadow: '0 24px 64px rgba(44,26,14,0.16)' }}>
                <div className="px-4 py-3 flex items-center justify-between"
                  style={{ background: 'linear-gradient(135deg, #FBF5EC 0%, #F5ECD8 100%)', borderBottom: '1px solid rgba(232,213,176,0.4)' }}>
                  <div className="flex items-center gap-2">
                    <Bell size={13} style={{ color: '#C0522B' }} />
                    <span className="font-bold text-[#1A0A02] text-sm">Notifications</span>
                    {unread > 0 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
                        style={{ background: '#C0522B' }}>{unread}</span>
                    )}
                  </div>
                  <button onClick={() => setNotifs(n => n.map(x => ({ ...x, unread: false })))}
                    className="flex items-center gap-1 text-xs font-semibold hover:underline"
                    style={{ color: '#C0522B' }}>
                    <Check size={10} /> Mark read
                  </button>
                </div>
                <div className="divide-y" style={{ '--tw-divide-opacity': 1, borderColor: 'rgba(232,213,176,0.3)' }}>
                  {notifs.map((n, i) => {
                    const c = notifColors[n.type] || notifColors.info;
                    return (
                      <motion.div key={n.id}
                        initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors"
                        style={{ background: n.unread ? '#FDFAF5' : 'white', borderBottom: '1px solid rgba(232,213,176,0.25)' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#FBF5EC'}
                        onMouseLeave={e => e.currentTarget.style.background = n.unread ? '#FDFAF5' : 'white'}>
                        <span className="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0"
                          style={{ background: c.bg, border: `1px solid ${c.border}` }}>{n.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs leading-snug ${n.unread ? 'font-semibold text-[#1A0A02]' : 'text-[#7B5C3A]'}`}>{n.text}</p>
                          <p className="text-[10px] mt-0.5 font-medium" style={{ color: '#B8956A' }}>{n.time}</p>
                        </div>
                        {n.unread && <span className="w-2 h-2 rounded-full mt-1 flex-shrink-0" style={{ background: c.dot }} />}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="w-px h-4 mx-1" style={{ background: 'rgba(0,0,0,0.1)' }} />

        {/* Profile */}
        <div className="relative" ref={dropRef}>
          <button
            onClick={() => { setDropOpen(v => !v); setNotifOpen(false); }}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg transition-all duration-150"
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80"
              alt="Admin" className="w-7 h-7 rounded-lg object-cover flex-shrink-0"
              style={{ boxShadow: '0 0 0 1.5px rgba(192,82,43,0.25)' }} />
            <div className="hidden sm:block text-left">
              <p className="text-xs font-medium text-[#1A0A02] leading-tight">ArtX</p>
              <p className="text-[10px]" style={{ color: '#9B7A52' }}>Super Admin</p>
            </div>
            <ChevronDown size={11} style={{ color: '#9B7A52' }}
              className={`transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {dropOpen && (
              <motion.div variants={dropVariants} initial="hidden" animate="visible" exit="exit"
                className="absolute right-0 top-full mt-2 w-52 rounded-2xl overflow-hidden z-50"
                style={{ background: 'white', border: '1px solid rgba(232,213,176,0.5)', boxShadow: '0 24px 64px rgba(44,26,14,0.16)' }}>
                <div className="px-4 py-3.5 flex items-center gap-3"
                  style={{ background: 'linear-gradient(135deg, #FBF5EC 0%, #F5ECD8 100%)', borderBottom: '1px solid rgba(232,213,176,0.4)' }}>
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80"
                    alt="Admin" className="w-9 h-9 rounded-xl object-cover"
                    style={{ boxShadow: '0 0 0 2px rgba(192,82,43,0.3)' }} />
                  <div>
                    <p className="text-sm font-bold text-[#1A0A02]">ArtX</p>
                    <p className="text-[10px] font-medium" style={{ color: '#9B7A52' }}>artx@karigarhub.in</p>
                  </div>
                </div>
                {[
                  { icon: User,     label: 'My Profile' },
                  { icon: Settings, label: 'Settings'   },
                ].map(({ icon: Icon, label }) => (
                  <button key={label} onClick={() => setDropOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors"
                    style={{ color: '#3C1E0A' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#FBF5EC'}
                    onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#F5ECD8' }}>
                      <Icon size={13} style={{ color: '#C0522B' }} />
                    </div>
                    {label}
                  </button>
                ))}
                <div style={{ borderTop: '1px solid rgba(232,213,176,0.4)' }}>
                  <button onClick={() => setDropOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors"
                    onMouseEnter={e => e.currentTarget.style.background = '#FEF2F2'}
                    onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-red-50">
                      <LogOut size={13} className="text-red-500" />
                    </div>
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
