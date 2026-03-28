import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { adminOrders } from '../data/adminData';
import { StatusBadge, TableCard, Th, Tr, Td, EmptyState, FilterTabs, SectionCard, PageHeader } from '../components/AdminUI';

// TODO: Replace with backend API later
const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const statusStyle = {
  Pending:    { bg: '#FFFBEB', color: '#B45309', border: 'rgba(245,158,11,0.25)' },
  Processing: { bg: '#FFFBEB', color: '#92400E', border: 'rgba(245,158,11,0.2)'  },
  Shipped:    { bg: '#EFF6FF', color: '#1D4ED8', border: 'rgba(59,130,246,0.25)' },
  Delivered:  { bg: '#F0FDF4', color: '#15803D', border: 'rgba(34,197,94,0.25)'  },
  Cancelled:  { bg: '#FFF1F2', color: '#BE123C', border: 'rgba(244,63,94,0.25)'  },
};

const tabs = [
  { value: 'all',       label: 'All'       },
  { value: 'Pending',   label: 'Pending'   },
  { value: 'Shipped',   label: 'Shipped'   },
  { value: 'Delivered', label: 'Delivered' },
  { value: 'Cancelled', label: 'Cancelled' },
];

const metrics = [
  { key: 'all',       label: 'Total',     color: '#7B5C3A', bg: '#F5ECD8' },
  { key: 'Pending',   label: 'Pending',   color: '#B45309', bg: '#FFFBEB' },
  { key: 'Shipped',   label: 'Shipped',   color: '#1D4ED8', bg: '#EFF6FF' },
  { key: 'Delivered', label: 'Delivered', color: '#15803D', bg: '#F0FDF4' },
  { key: 'Cancelled', label: 'Cancelled', color: '#BE123C', bg: '#FFF1F2' },
];

export default function AdminOrders() {
  const [orders, setOrders] = useState(adminOrders);
  const [filter, setFilter] = useState('all');

  const tabsWithCount = tabs.map(t => ({
    ...t,
    count: t.value === 'all' ? orders.length : orders.filter(o => o.status === t.value).length,
  }));

  const filtered = useMemo(() =>
    filter === 'all' ? orders : orders.filter(o => o.status === filter),
    [orders, filter]
  );

  const handleStatusChange = (id, newStatus) => {
    // TODO: Call PATCH /api/admin/orders/:id/status
    setOrders(o => o.map(x => x.id === id ? { ...x, status: newStatus } : x));
  };

  const revenue = orders.filter(o => o.status === 'Delivered').reduce((s, o) => s + o.amount, 0);

  return (
    <div>
      <PageHeader title="Orders" sub={`${orders.length} total orders`} />

      {/* Metric cards */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-6">
        {metrics.map((m, i) => (
          <motion.div key={m.key}
            whileHover={{ y: -2 }}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="flex flex-col items-center py-4 px-3 rounded-2xl cursor-pointer transition-all"
            style={{
              background: filter === m.key ? m.bg : 'white',
              border: `1px solid ${filter === m.key ? m.color + '30' : 'rgba(232,213,176,0.35)'}`,
              boxShadow: '0 2px 0 rgba(232,213,176,0.4), 0 4px 12px rgba(44,26,14,0.05)',
            }}
            onClick={() => setFilter(m.key)}>
            <p className="font-display font-bold text-xl leading-none" style={{ color: m.color }}>
              {m.key === 'all' ? orders.length : orders.filter(o => o.status === m.key).length}
            </p>
            <p className="text-[10px] font-semibold mt-1 text-center" style={{ color: '#9B7A52' }}>{m.label}</p>
          </motion.div>
        ))}
        {/* Revenue */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="flex flex-col items-center py-4 px-3 rounded-2xl"
          style={{ background: '#FDF4EC', border: '1px solid rgba(192,82,43,0.2)', boxShadow: '0 2px 0 rgba(232,213,176,0.4)' }}>
          <p className="font-display font-bold text-xl leading-none" style={{ color: '#C0522B' }}>
            ₹{(revenue / 1000).toFixed(1)}k
          </p>
          <p className="text-[10px] font-semibold mt-1" style={{ color: '#9B7A52' }}>Revenue</p>
        </motion.div>
      </motion.div>

      {/* Filter tabs */}
      <div className="mb-4 overflow-x-auto pb-1">
        <FilterTabs tabs={tabsWithCount} active={filter} onChange={setFilter} />
      </div>

      {/* Order Breakdown */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        className="mb-6 p-5 rounded-2xl bg-white"
        style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <p className="text-sm font-semibold text-[#1A0A02] mb-4">Order Breakdown</p>
        <div className="space-y-3">
          {metrics.map((m, i) => {
            const count = m.key === 'all' ? orders.length : orders.filter(o => o.status === m.key).length;
            const pct = Math.round((count / orders.length) * 100);
            return (
              <div key={m.key} className="flex items-center gap-3">
                <span className="text-xs font-semibold w-20 flex-shrink-0" style={{ color: '#5C3317' }}>{m.label}</span>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}>
                  <motion.div
                    initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                    transition={{ delay: 0.4 + i * 0.05, duration: 0.6, ease: 'easeOut' }}
                    className="h-full rounded-full" style={{ background: m.color }} />
                </div>
                <span className="text-xs font-bold w-6 text-right flex-shrink-0" style={{ color: m.color }}>{count}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {filtered.length === 0 ? (
        <EmptyState icon="🛒" message="No orders found" sub="Try a different filter" />
      ) : (
        <TableCard>
          <thead>
            <tr>
              <Th>Order ID</Th>
              <Th>Buyer</Th>
              <Th>Product</Th>
              <Th>Amount</Th>
              <Th>Date</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order, i) => {
              const ss = statusStyle[order.status] || { bg: '#F8FAFC', color: '#64748B', border: 'rgba(148,163,184,0.2)' };
              return (
                <Tr key={order.id}>
                  <Td>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                      className="font-mono text-xs font-bold" style={{ color: '#C0522B' }}>
                      {order.id}
                    </motion.span>
                  </Td>
                  <Td className="font-semibold text-[#1A0A02] whitespace-nowrap">{order.buyer}</Td>
                  <Td className="text-sm font-medium max-w-[160px] truncate" style={{ color: '#7B5C3A' }}>{order.product}</Td>
                  <Td className="font-bold text-[#1A0A02] whitespace-nowrap">₹{order.amount.toLocaleString('en-IN')}</Td>
                  <Td className="text-xs font-medium whitespace-nowrap" style={{ color: '#9B7A52' }}>{order.date}</Td>
                  <Td>
                    <select
                      value={order.status}
                      onChange={e => handleStatusChange(order.id, e.target.value)}
                      className="text-[11px] font-bold rounded-full px-3 py-1.5 cursor-pointer focus:outline-none transition-colors appearance-none"
                      style={{ background: ss.bg, color: ss.color, border: `1px solid ${ss.border}` }}>
                      {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Td>
                </Tr>
              );
            })}
          </tbody>
        </TableCard>
      )}
    </div>
  );
}
