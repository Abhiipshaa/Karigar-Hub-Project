import { useState, useEffect } from 'react';
import { Users, Hammer, Package, ShoppingBag, IndianRupee, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { getStats, getKarigars, getOrders } from '../../services/adminApi';
import { StatCard, SectionCard, SectionHeader, StatusBadge } from '../components/AdminUI';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalKarigars: 0, totalProducts: 0, totalOrders: 0, totalRevenue: 0 });
  const [karigars, setKarigars] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getStats(), getKarigars(), getOrders()])
      .then(([s, k, o]) => {
        setStats(s);
        setKarigars(Array.isArray(k) ? k : []);
        setOrders(Array.isArray(o) ? o : []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const pendingKarigars = karigars.filter(k => !k.isVerified);

  const statCards = [
    { title: 'Total Users',    value: stats.totalUsers,    icon: Users,       gradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' },
    { title: 'Total Karigars', value: stats.totalKarigars, icon: Hammer,      gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' },
    { title: 'Total Products', value: stats.totalProducts, icon: Package,     gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)' },
    { title: 'Total Orders',   value: stats.totalOrders,   icon: ShoppingBag, gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' },
    { title: 'Total Revenue',  value: `₹${(stats.totalRevenue / 1000).toFixed(1)}k`, icon: IndianRupee, gradient: 'linear-gradient(135deg, #C0522B 0%, #8B3A1A 100%)' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#1A0A02] tracking-tight">Dashboard</h2>
        <p className="text-sm mt-1" style={{ color: '#9B7A52' }}>Live data from MongoDB</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 mb-8">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-28 rounded-2xl animate-pulse" style={{ background: 'rgba(232,213,176,0.4)' }} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 mb-8">
          {statCards.map((card, i) => (
            <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <StatCard {...card} />
            </motion.div>
          ))}
        </div>
      )}

      {pendingKarigars.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-wrap gap-3 mb-8">
          <Link to="/admin/karigars"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium"
            style={{ background: '#FFFBEB', border: '1px solid rgba(245,158,11,0.3)', color: '#B45309' }}>
            <AlertCircle size={15} />
            <span><strong>{pendingKarigars.length}</strong> karigar{pendingKarigars.length !== 1 ? 's' : ''} pending verification</span>
          </Link>
        </motion.div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Verified Karigars',    value: karigars.filter(k => k.isVerified).length,  icon: TrendingUp,  color: '#C0522B', bg: '#FDF4EC' },
          { label: 'Pending Verification', value: pendingKarigars.length,                      icon: Clock,       color: '#B45309', bg: '#FFFBEB' },
          { label: 'Delivered Orders',     value: orders.filter(o => o.isDelivered).length,    icon: ShoppingBag, color: '#15803D', bg: '#F0FDF4' },
          { label: 'Pending Orders',       value: orders.filter(o => !o.isDelivered).length,   icon: Package,     color: '#2563EB', bg: '#EFF6FF' },
        ].map((m, i) => (
          <motion.div key={m.label} whileHover={{ y: -2 }}
            className="flex items-center gap-3 px-4 py-5 rounded-2xl"
            style={{ background: 'white', border: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: m.bg }}>
              <m.icon size={16} style={{ color: m.color }} />
            </div>
            <div>
              <p className="text-base font-bold text-[#1A0A02] leading-none">{m.value}</p>
              <p className="text-[11px] mt-0.5 font-medium" style={{ color: '#9B7A52' }}>{m.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="xl:col-span-2">
          <SectionCard>
            <SectionHeader title="Recent Orders" sub={`${orders.length} total`} to="/admin/orders" />
            {orders.length === 0 ? (
              <p className="text-center py-8 text-sm" style={{ color: '#9B7A52' }}>No orders yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ background: '#FAFAF9', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                      {['Order ID', 'Customer', 'Amount', 'Status'].map(h => (
                        <th key={h} className="px-6 py-3 text-left text-[11px] font-medium uppercase tracking-wider" style={{ color: '#9B7A52' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 8).map(order => (
                      <tr key={order._id} style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                        <td className="px-6 py-4 font-mono text-xs font-semibold" style={{ color: '#C0522B' }}>
                          #KH-{order._id?.slice(-4).toUpperCase()}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-[#1A0A02]">{order.user?.name || 'Customer'}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-[#1A0A02]">₹{(order.totalPrice || 0).toLocaleString('en-IN')}</td>
                        <td className="px-6 py-4">
                          <StatusBadge status={order.isDelivered ? 'Delivered' : order.isPaid ? 'Shipped' : 'Processing'} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </SectionCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <SectionCard>
            <SectionHeader title="Registered Karigars" sub={`${karigars.length} total`} to="/admin/karigars" />
            {karigars.length === 0 ? (
              <p className="text-center py-8 text-sm" style={{ color: '#9B7A52' }}>No karigars yet</p>
            ) : (
              <div className="space-y-3 p-2">
                {karigars.slice(0, 6).map(k => {
                  const initials = k.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
                  return (
                    <div key={k._id} className="flex items-center gap-3 p-2 rounded-xl" style={{ background: '#FAFAF9' }}>
                      <div className="w-9 h-9 rounded-xl overflow-hidden bg-[#C0522B] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {k.profileImage ? <img src={k.profileImage} alt={k.name} className="w-full h-full object-cover" /> : initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#1A0A02] truncate">{k.name}</p>
                        <p className="text-[10px] truncate" style={{ color: '#9B7A52' }}>{k.category} · {k.address?.state || '—'}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${k.isVerified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {k.isVerified ? '✓' : 'Pending'}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </SectionCard>
        </motion.div>
      </div>
    </div>
  );
}
