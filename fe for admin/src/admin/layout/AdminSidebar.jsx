import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, Hammer, Package,
  ShoppingBag, Activity, LogOut, Crown,
  Star, RotateCcw,
} from 'lucide-react';

// TODO: Replace badge counts with backend API later
const navItems = [
  { to: '/admin',          icon: LayoutDashboard, label: 'Dashboard', end: true, badge: null },
  { to: '/admin/users',    icon: Users,           label: 'Users',     badge: null },
  { to: '/admin/karigars', icon: Hammer,          label: 'Karigars',  badge: 2 },
  { to: '/admin/products', icon: Package,         label: 'Products',  badge: null },
  { to: '/admin/orders',   icon: ShoppingBag,     label: 'Orders',    badge: 5 },
  { to: '/admin/reviews',  icon: Star,            label: 'Reviews',   badge: 3 },
  { to: '/admin/returns',  icon: RotateCcw,       label: 'Returns',   badge: 2 },
  { to: '/admin/activity', icon: Activity,        label: 'Activity',  badge: null },
];

const sidebarStats = [
  { label: 'Users',   val: '1.2k' },
  { label: 'Orders',  val: '8.6k' },
  { label: 'Revenue', val: '₹42L' },
];

// Lighter sidebar: #1C0E06 → #2A1208 → #1E0A04
// Nav text: #C8A882 (inactive) → white (active)
// Section label: #7A5535

export default function AdminSidebar({ open, onClose }) {
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 lg:hidden"
            style={{ background: 'rgba(8,3,0,0.7)', backdropFilter: 'blur(6px)' }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[260px] flex flex-col transition-transform duration-300 ease-out
          ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex`}
        style={{
          background: 'linear-gradient(180deg, #2D1506 0%, #3D1C0A 40%, #2D1506 100%)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '1px 0 0 rgba(255,255,255,0.04), 4px 0 32px rgba(0,0,0,0.25)',
        }}
      >
        {/* Gold shimmer top line */}
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(212,165,74,0.7) 40%, rgba(192,82,43,0.8) 60%, transparent)' }} />

        {/* ── Logo ── */}
        <div className="px-6 py-5 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3.5">
            <div className="relative w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-base flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #E8622F 0%, #A03A18 100%)',
                boxShadow: '0 4px 16px rgba(192,82,43,0.45)',
              }}>
              क
            </div>
            <div>
              <p className="font-semibold text-sm leading-tight text-white tracking-tight">Karigar Hub</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Crown size={8} style={{ color: '#D4A843' }} />
                <p className="text-[9px] tracking-[0.2em] font-medium" style={{ color: '#D4A843' }}>ADMIN PANEL</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Admin profile ── */}
        <div className="px-4 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div className="relative flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80"
                alt="Admin"
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400"
                style={{ border: '1.5px solid #2D1506' }} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium leading-tight truncate text-white">ArtX</p>
              <p className="text-[11px] truncate mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Super Admin</p>
            </div>
          </div>
        </div>

        {/* ── Navigation ── */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <p className="px-3 mb-2 text-[10px] font-medium tracking-[0.15em] uppercase select-none"
            style={{ color: 'rgba(255,255,255,0.25)' }}>Menu</p>
          <div className="space-y-0.5">

          {navItems.map(({ to, icon: Icon, label, end, badge }) => (
            <NavLink key={to} to={to} end={end} onClick={onClose} className="block">
              {({ isActive }) => (
                <motion.div
                  whileHover={{ x: isActive ? 0 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150"
                  style={isActive ? {
                    background: 'rgba(255,255,255,0.1)',
                    color: '#FFFFFF',
                    fontWeight: 500,
                  } : {
                    color: 'rgba(255,255,255,0.5)',
                    fontWeight: 400,
                  }}
                >
                  {/* Active left bar */}
                  {isActive && (
                    <motion.div
                      layoutId="sidebarActiveBar"
                      className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r-full"
                      style={{ background: '#E8622F' }}
                    />
                  )}

                  {/* Icon */}
                  <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                    style={isActive
                      ? { background: 'rgba(232,98,47,0.25)' }
                      : { background: 'transparent' }
                    }>
                    <Icon size={15}
                      style={isActive ? { color: '#F5A07A' } : { color: 'rgba(255,255,255,0.4)' }}
                    />
                  </div>

                  <span className="flex-1 text-sm">{label}</span>

                  {badge && (
                    <span
                      className="min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-medium flex items-center justify-center text-white flex-shrink-0"
                      style={{ background: '#C0522B' }}>
                      {badge}
                    </span>
                  )}
                </motion.div>
              )}
            </NavLink>
          ))}
        </div>
        </nav>

        {/* ── Bottom stats + logout ── */}
        <div className="px-4 pb-5 pt-4 flex-shrink-0"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>

          {/* Mini stats */}
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            {sidebarStats.map(s => (
              <div key={s.label} className="flex flex-col items-center py-2 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.05)' }}>
                <p className="text-xs font-semibold text-white leading-tight">{s.val}</p>
                <p className="text-[9px] mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Sign out */}
          <button
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all duration-150"
            style={{ color: 'rgba(255,255,255,0.4)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
          >
            <LogOut size={14} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
