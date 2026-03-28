import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { adminActivities } from '../data/adminData';
import { FilterTabs, PageHeader } from '../components/AdminUI';

// TODO: Replace with backend API later
const tabs = [
  { value: 'all',     label: 'All Activity' },
  { value: 'order',   label: 'Orders'       },
  { value: 'karigar', label: 'Karigars'     },
  { value: 'user',    label: 'Users'        },
];

const typeConfig = {
  order:   { label: 'Order',   bg: '#F0FDF4', color: '#15803D', border: '#BBF7D0', line: '#22C55E' },
  karigar: { label: 'Karigar', bg: '#FFFBEB', color: '#B45309', border: '#FDE68A', line: '#F59E0B' },
  user:    { label: 'User',    bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE', line: '#3B82F6' },
};

export default function AdminActivity() {
  const [filter, setFilter] = useState('all');

  const tabsWithCount = tabs.map(t => ({
    ...t,
    count: t.value === 'all' ? adminActivities.length : adminActivities.filter(a => a.type === t.value).length,
  }));

  const filtered = useMemo(() =>
    filter === 'all' ? adminActivities : adminActivities.filter(a => a.type === filter),
    [filter]
  );

  return (
    <div>
      <PageHeader title="Activity Feed" sub="Real-time platform activity log">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
          <motion.span animate={{ opacity: [1, 0.25, 1] }} transition={{ repeat: Infinity, duration: 1.6 }}
            className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs font-bold text-green-700">Live</span>
        </div>
      </PageHeader>

      <div className="mb-6 overflow-x-auto pb-1">
        <FilterTabs tabs={tabsWithCount} active={filter} onChange={setFilter} />
      </div>

      <div className="max-w-2xl">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(180deg, rgba(192,82,43,0.25) 0%, rgba(232,213,176,0.15) 100%)' }} />

          <AnimatePresence mode="popLayout">
            <div className="space-y-4">
              {filtered.map((act, i) => {
                const cfg = typeConfig[act.type] || typeConfig.user;
                return (
                  <motion.div
                    key={act.id} layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16, scale: 0.97 }}
                    transition={{ delay: i * 0.05, type: 'spring', stiffness: 240, damping: 24 }}
                    className="relative flex items-start gap-4 pl-14"
                  >
                    {/* Icon on timeline */}
                    <div className="absolute left-0 w-10 h-10 rounded-2xl flex items-center justify-center text-base flex-shrink-0"
                      style={{
                        background: cfg.bg,
                        border: `1px solid ${cfg.border}`,
                        boxShadow: `0 2px 12px ${cfg.line}22`,
                      }}>
                      {act.icon}
                    </div>

                    {/* Card */}
                    <motion.div
                      whileHover={{ x: 4, boxShadow: '0 8px 32px rgba(44,26,14,0.1)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className="flex-1 rounded-2xl px-4 py-3.5 cursor-default"
                      style={{
                        background: 'white',
                        border: '1px solid rgba(232,213,176,0.35)',
                        boxShadow: '0 2px 0 rgba(232,213,176,0.35), 0 2px 12px rgba(44,26,14,0.05)',
                      }}>
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-medium text-[#1A0A02] leading-snug flex-1">{act.message}</p>
                        <span className="text-[10px] font-semibold whitespace-nowrap flex-shrink-0 mt-0.5"
                          style={{ color: '#B8956A' }}>{act.time}</span>
                      </div>
                      <div className="mt-2.5 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full capitalize"
                          style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
                          <span className="w-1 h-1 rounded-full" style={{ background: cfg.line }} />
                          {cfg.label}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
        </div>

        {/* Load more */}
        {/* TODO: Implement pagination with backend API */}
        <div className="mt-8 flex justify-center">
          <motion.button
            whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(192,82,43,0.18)' }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold transition-all"
            style={{
              background: 'white',
              border: '1px solid rgba(192,82,43,0.25)',
              color: '#C0522B',
              boxShadow: '0 2px 0 rgba(232,213,176,0.4), 0 4px 12px rgba(192,82,43,0.08)',
            }}>
            Load more activity →
          </motion.button>
        </div>
      </div>
    </div>
  );
}
