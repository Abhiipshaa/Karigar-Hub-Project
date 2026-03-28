import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { adminReturns } from '../data/adminData';
import { PageHeader, FilterTabs, SectionCard, EmptyState } from '../components/AdminUI';

// TODO: Replace with backend API later

const tabs = [
  { value: 'all',      label: 'All Requests' },
  { value: 'pending',  label: 'Pending'      },
  { value: 'approved', label: 'Approved'     },
  { value: 'rejected', label: 'Rejected'     },
];

const statusStyle = {
  pending:  { bg: '#FFFBEB', color: '#B45309', border: 'rgba(245,158,11,0.25)',  dot: '#F59E0B', label: 'Pending'  },
  approved: { bg: '#F0FDF4', color: '#15803D', border: 'rgba(34,197,94,0.25)',   dot: '#22C55E', label: 'Approved' },
  rejected: { bg: '#FFF1F2', color: '#BE123C', border: 'rgba(244,63,94,0.25)',   dot: '#F43F5E', label: 'Rejected' },
};

const reasonIcons = {
  'Damaged on arrival':      { icon: '📦', color: '#EF4444' },
  'Wrong item received':     { icon: '🔄', color: '#3B82F6' },
  'Not as described':        { icon: '📋', color: '#F59E0B' },
  'Quality not as expected': { icon: '⚠️', color: '#F97316' },
  'Size mismatch':           { icon: '📏', color: '#8B5CF6' },
  'Changed mind':            { icon: '💭', color: '#6B7280' },
};

export default function AdminReturns() {
  const [returns, setReturns]   = useState(adminReturns);
  const [filter, setFilter]     = useState('all');
  const [expanded, setExpanded] = useState(null);

  const tabsWithCount = tabs.map(t => ({
    ...t,
    count: t.value === 'all' ? returns.length : returns.filter(r => r.status === t.value).length,
  }));

  const filtered = useMemo(() =>
    filter === 'all' ? returns : returns.filter(r => r.status === filter),
    [returns, filter]
  );

  const totalRefund = returns.filter(r => r.status === 'approved').reduce((s, r) => s + r.amount, 0);
  const pendingCount = returns.filter(r => r.status === 'pending').length;

  const handleApprove = id => {
    // TODO: Call PATCH /api/admin/returns/:id/approve
    setReturns(r => r.map(x => x.id === id ? { ...x, status: 'approved' } : x));
  };
  const handleReject = id => {
    // TODO: Call PATCH /api/admin/returns/:id/reject
    setReturns(r => r.map(x => x.id === id ? { ...x, status: 'rejected' } : x));
  };

  return (
    <div>
      <PageHeader title="Return Requests" sub={`${pendingCount} pending · ₹${totalRefund.toLocaleString('en-IN')} approved refunds`} />

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total',    val: returns.length,                                    color: '#7B5C3A', bg: '#F5ECD8',  icon: '📋' },
          { label: 'Pending',  val: returns.filter(r => r.status === 'pending').length, color: '#B45309', bg: '#FFFBEB',  icon: '⏳' },
          { label: 'Approved', val: returns.filter(r => r.status === 'approved').length,color: '#15803D', bg: '#F0FDF4',  icon: '✅' },
          { label: 'Rejected', val: returns.filter(r => r.status === 'rejected').length,color: '#BE123C', bg: '#FFF1F2',  icon: '❌' },
        ].map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -2 }}
            className="flex items-center gap-3 px-5 py-4 rounded-2xl"
            style={{ background: 'white', border: '1px solid rgba(232,213,176,0.35)', boxShadow: '0 2px 0 rgba(232,213,176,0.4)' }}>
            <span className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
              style={{ background: s.bg }}>{s.icon}</span>
            <div>
              <p className="font-display font-bold text-xl leading-none" style={{ color: s.color }}>{s.val}</p>
              <p className="text-[11px] font-medium mt-0.5" style={{ color: '#9B7A52' }}>{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="mb-6 overflow-x-auto pb-1">
        <FilterTabs tabs={tabsWithCount} active={filter} onChange={setFilter} />
      </div>

      {/* Return cards */}
      {filtered.length === 0 ? (
        <EmptyState icon="🔄" message="No return requests" sub="Try a different filter" />
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((ret, i) => {
              const ss = statusStyle[ret.status] || statusStyle.pending;
              const ri = reasonIcons[ret.reason] || { icon: '❓', color: '#9B7A52' };
              const isExpanded = expanded === ret.id;

              return (
                <motion.div
                  key={ret.id} layout
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ delay: i * 0.05, type: 'spring', stiffness: 280, damping: 26 }}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: 'white',
                    border: '1px solid rgba(232,213,176,0.35)',
                    boxShadow: '0 2px 0 rgba(232,213,176,0.4), 0 4px 16px rgba(44,26,14,0.05)',
                  }}
                >
                  {/* Status top bar */}
                  <div className="h-[3px]" style={{ background: ss.dot }} />

                  <div className="p-6">
                    {/* Header row */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                      <div className="flex items-center gap-3">
                        <img src={ret.avatar} alt={ret.user}
                          className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
                        <div>
                          <p className="font-bold text-[#1A0A02] text-sm">{ret.user}</p>
                          <p className="text-xs font-medium" style={{ color: '#9B7A52' }}>
                            Order <span className="font-mono font-bold" style={{ color: '#C0522B' }}>{ret.orderId}</span>
                            {' · '}{ret.date}
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold"
                        style={{ background: ss.bg, color: ss.color, border: `1px solid ${ss.border}` }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: ss.dot }} />
                        {ss.label}
                      </span>
                    </div>

                    {/* Product + reason */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                      {/* Product image */}
                      <div className="flex items-center gap-3 flex-1 p-3 rounded-xl"
                        style={{ background: '#FBF5EC', border: '1px solid rgba(232,213,176,0.4)' }}>
                        <img src={ret.image} alt={ret.product}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-[#1A0A02] truncate">{ret.product}</p>
                          <p className="font-display font-bold text-base" style={{ color: '#C0522B' }}>
                            ₹{ret.amount.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>

                      {/* Reason */}
                      <div className="flex items-center gap-3 flex-1 p-3 rounded-xl"
                        style={{ background: '#FBF5EC', border: '1px solid rgba(232,213,176,0.4)' }}>
                        <span className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                          style={{ background: 'white' }}>
                          {ri.icon}
                        </span>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: '#9B7A52' }}>Return Reason</p>
                          <p className="text-sm font-bold" style={{ color: ri.color }}>{ret.reason}</p>
                        </div>
                      </div>
                    </div>

                    {/* Expandable detail */}
                    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(232,213,176,0.35)' }}>
                      <button
                        onClick={() => setExpanded(isExpanded ? null : ret.id)}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold transition-colors"
                        style={{ background: '#FBF5EC', color: '#5C3317' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#F5ECD8'}
                        onMouseLeave={e => e.currentTarget.style.background = '#FBF5EC'}
                      >
                        <span className="flex items-center gap-2">
                          <RotateCcw size={13} style={{ color: '#C0522B' }} />
                          Customer's detailed reason
                        </span>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                          >
                            <p className="px-4 py-3 text-sm leading-relaxed" style={{ color: '#3C1E0A', borderTop: '1px solid rgba(232,213,176,0.35)' }}>
                              "{ret.reasonDetail}"
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Actions */}
                    {ret.status === 'pending' && (
                      <div className="flex items-center gap-3 mt-4 pt-4"
                        style={{ borderTop: '1px solid rgba(232,213,176,0.3)' }}>
                        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                          onClick={() => handleApprove(ret.id)}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors"
                          style={{ background: '#F0FDF4', color: '#15803D', border: '1px solid rgba(34,197,94,0.25)' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#DCFCE7'}
                          onMouseLeave={e => e.currentTarget.style.background = '#F0FDF4'}>
                          <CheckCircle size={15} /> Approve Refund
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                          onClick={() => handleReject(ret.id)}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors"
                          style={{ background: '#FFF1F2', color: '#BE123C', border: '1px solid rgba(244,63,94,0.25)' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#FFE4E6'}
                          onMouseLeave={e => e.currentTarget.style.background = '#FFF1F2'}>
                          <XCircle size={15} /> Reject
                        </motion.button>
                        <span className="text-xs font-medium ml-auto" style={{ color: '#9B7A52' }}>
                          Refund: <span className="font-bold" style={{ color: '#C0522B' }}>₹{ret.amount.toLocaleString('en-IN')}</span>
                        </span>
                      </div>
                    )}

                    {ret.status !== 'pending' && (
                      <div className="mt-4 pt-4 flex items-center justify-between"
                        style={{ borderTop: '1px solid rgba(232,213,176,0.3)' }}>
                        <span className="text-xs font-medium" style={{ color: '#9B7A52' }}>
                          {ret.status === 'approved' ? '✅ Refund of' : '❌ Refund request'}{' '}
                          <span className="font-bold" style={{ color: ret.status === 'approved' ? '#15803D' : '#BE123C' }}>
                            ₹{ret.amount.toLocaleString('en-IN')}
                          </span>
                          {' '}{ret.status === 'approved' ? 'approved' : 'rejected'}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
