import { Users, Hammer, Package, ShoppingBag, IndianRupee, ShoppingCart, UserPlus, Clock, TrendingUp, Star, RotateCcw, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { adminStats, adminOrders, adminActivities, adminKarigars, adminReviews, adminReturns } from '../data/adminData';
import { StatCard, StatusBadge, SectionCard, SectionHeader } from '../components/AdminUI';
import { Link } from 'react-router-dom';

const statCards = [
  { title: 'Total Users',    value: adminStats.totalUsers,    icon: Users,       gradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)', growth: 12 },
  { title: 'Total Karigars', value: adminStats.totalKarigars, icon: Hammer,      gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', growth: 8  },
  { title: 'Total Products', value: adminStats.totalProducts, icon: Package,     gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)', growth: 15 },
  { title: 'Total Orders',   value: adminStats.totalOrders,   icon: ShoppingBag, gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', growth: 21 },
  { title: 'Total Revenue',  value: adminStats.totalRevenue,  icon: IndianRupee, gradient: 'linear-gradient(135deg, #C0522B 0%, #8B3A1A 100%)', prefix: '₹', growth: 18 },
];

const rankColors = [
  'linear-gradient(135deg, #F59E0B, #D97706)',
  'linear-gradient(135deg, #94A3B8, #64748B)',
  'linear-gradient(135deg, #CD7C2F, #92400E)',
];

const activityIconMap = {
  order:   { icon: ShoppingCart, bg: '#F0FDF4', color: '#16A34A' },
  karigar: { icon: Hammer,       bg: '#FFFBEB', color: '#B45309' },
  user:    { icon: UserPlus,     bg: '#EFF6FF', color: '#2563EB' },
};

const pendingKarigars = adminKarigars.filter(k => k.status === 'pending');
const pendingReturns  = adminReturns.filter(r => r.status === 'pending');
const flaggedReviews  = adminReviews.filter(r => r.status === 'flagged');

const totalRevenue  = adminOrders.filter(o => o.status === 'Delivered').reduce((s, o) => s + o.amount, 0);
const avgOrderValue = Math.round(adminOrders.reduce((s, o) => s + o.amount, 0) / adminOrders.length);

export default function AdminDashboard() {
  return (
    <div>

      {/* ── Page Title ── */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#1A0A02] tracking-tight">Dashboard</h2>
        <p className="text-sm mt-1" style={{ color: '#9B7A52' }}>Welcome back — here's what's happening today.</p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 mb-8">
        {statCards.map((card, i) => (
          <motion.div key={card.title}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, type: 'spring', stiffness: 260, damping: 24 }}>
            <StatCard {...card} />
          </motion.div>
        ))}
      </div>

      {/* ── Alert Banners ── */}
      {(pendingKarigars.length > 0 || pendingReturns.length > 0 || flaggedReviews.length > 0) && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-3 mt-8 mb-8">
          {pendingKarigars.length > 0 && (
            <Link to="/admin/karigars"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:shadow-md"
              style={{ background: '#FFFBEB', border: '1px solid rgba(245,158,11,0.3)', color: '#B45309' }}>
              <AlertCircle size={15} />
              <span><strong>{pendingKarigars.length}</strong> karigar approvals pending</span>
            </Link>
          )}
          {pendingReturns.length > 0 && (
            <Link to="/admin/returns"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:shadow-md"
              style={{ background: '#FFF1F2', border: '1px solid rgba(244,63,94,0.25)', color: '#BE123C' }}>
              <RotateCcw size={15} />
              <span><strong>{pendingReturns.length}</strong> return requests pending</span>
            </Link>
          )}
          {flaggedReviews.length > 0 && (
            <Link to="/admin/reviews"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:shadow-md"
              style={{ background: '#FFF1F2', border: '1px solid rgba(244,63,94,0.25)', color: '#BE123C' }}>
              <Star size={15} />
              <span><strong>{flaggedReviews.length}</strong> reviews flagged</span>
            </Link>
          )}
        </motion.div>
      )}

      {/* ── Quick Metrics Bar ── */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 mb-32">
        {[
          { label: 'Revenue (Delivered)', value: `₹${(totalRevenue / 1000).toFixed(1)}k`, icon: TrendingUp,  color: '#C0522B', bg: '#FDF4EC' },
          { label: 'Avg. Order Value',    value: `₹${avgOrderValue.toLocaleString('en-IN')}`, icon: IndianRupee, color: '#2563EB', bg: '#EFF6FF' },
          { label: 'Pending Approvals',   value: pendingKarigars.length,                      icon: Clock,       color: '#B45309', bg: '#FFFBEB' },
          { label: 'Active Karigars',     value: adminKarigars.filter(k => k.status === 'approved').length, icon: Hammer, color: '#15803D', bg: '#F0FDF4' },
        ].map((m, i) => (
          <motion.div key={m.label} whileHover={{ y: -2 }}
            className="flex items-center gap-3 px-4 py-5 rounded-2xl"
            style={{ background: 'white', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: m.bg }}>
              <m.icon size={16} style={{ color: m.color }} />
            </div>
            <div>
              <p className="text-base font-bold text-[#1A0A02] leading-none">{m.value}</p>
              <p className="text-[11px] mt-0.5 font-medium" style={{ color: '#9B7A52' }}>{m.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Section Divider ── */}
      <div className="flex items-center gap-4 mt-32 mb-16">
        <p className="text-xl font-bold whitespace-nowrap" style={{ color: '#1A0A02' }}>Overview</p>
        <div className="flex-1 h-px" style={{ background: 'rgba(0,0,0,0.07)' }} />
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-16">

        {/* Recent Orders */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="xl:col-span-2">
          <SectionCard>
            <SectionHeader title="Recent Orders" sub={`${adminOrders.length} total orders`} to="/admin/orders" />
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ background: '#FAFAF9', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                    {['Order ID', 'Buyer', 'Amount', 'Status'].map(h => (
                      <th key={h} className="px-6 py-3 text-left text-[11px] font-medium uppercase tracking-wider whitespace-nowrap"
                        style={{ color: '#9B7A52' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {adminOrders.slice(0, 9).map((order, i) => (
                    <motion.tr key={order.id}
                      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 + i * 0.05 }}
                      whileHover={{ backgroundColor: '#FDFAF7' }}
                      style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                      <td className="px-6 py-4 font-mono text-xs font-semibold" style={{ color: '#C0522B' }}>{order.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-[#1A0A02] whitespace-nowrap">{order.buyer}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-[#1A0A02] whitespace-nowrap">₹{order.amount.toLocaleString('en-IN')}</td>
                      <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </motion.div>

        {/* Right column — Top Karigars with State col */}
        <div className="flex flex-col gap-3">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}>
            <SectionCard>
              <SectionHeader title="Top Karigars" sub="By total earnings" to="/admin/karigars" />
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ background: '#FAFAF9', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                      {['Karigar', 'State', 'Earnings'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider whitespace-nowrap"
                          style={{ color: '#9B7A52' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {adminKarigars.filter(k => k.status === 'approved').slice(0, 5).map((k, i) => (
                      <motion.tr key={k.id}
                        initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.06 }}
                        whileHover={{ backgroundColor: '#FDFAF7' }}
                        style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <img src={k.avatar} alt={k.name} className="w-7 h-7 rounded-lg object-cover flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-[#1A0A02] truncate">{k.name}</p>
                              <p className="text-[10px] truncate" style={{ color: '#9B7A52' }}>{k.craft}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-lg" style={{ background: '#F5ECD8', color: '#7B5C3A' }}>{k.state}</span>
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold whitespace-nowrap" style={{ color: '#C0522B' }}>₹{(k.earnings / 1000).toFixed(0)}k</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          </motion.div>
        </div>
      </div>

      {/* ── Live Activity (footer, full width) ── */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <SectionCard>
          <SectionHeader title="Live Activity" to="/admin/activity">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full"
              style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.6 }}
                className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[10px] font-medium text-green-700">Live</span>
            </div>
          </SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x"
            style={{ borderColor: 'rgba(0,0,0,0.04)' }}>
            {adminActivities.slice(0, 6).map((act, i) => {
              const cfg = activityIconMap[act.type] || activityIconMap.user;
              const IconComp = cfg.icon;
              return (
                <motion.div key={act.id}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + i * 0.05 }}
                  whileHover={{ backgroundColor: '#FDFAF7' }}
                  className="flex items-start gap-3 px-5 py-4 cursor-default transition-colors">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: cfg.bg }}>
                    <IconComp size={13} style={{ color: cfg.color }} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-[#2C1A0E] leading-relaxed">{act.message}</p>
                    <p className="text-[10px] mt-1" style={{ color: '#B8956A' }}>{act.time}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </SectionCard>
      </motion.div>

    </div>
  );
}
