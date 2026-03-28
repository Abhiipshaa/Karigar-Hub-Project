import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { adminKarigars } from '../data/adminData';
import { StatusBadge, DeleteModal, TableCard, Th, Tr, Td, EmptyState, FilterTabs, PageHeader, SearchInput } from '../components/AdminUI';

// TODO: Replace with backend API later
const tabs = [
  { value: 'all',      label: 'All'      },
  { value: 'approved', label: 'Approved' },
  { value: 'pending',  label: 'Pending'  },
];
const maxEarnings = Math.max(...adminKarigars.map(k => k.earnings));

export default function AdminKarigars() {
  const [karigars, setKarigars]   = useState(adminKarigars);
  const [deleteTarget, setDelete] = useState(null);
  const [filter, setFilter]       = useState('all');
  const [search, setSearch]       = useState('');

  const tabsWithCount = tabs.map(t => ({
    ...t,
    count: t.value === 'all' ? karigars.length : karigars.filter(k => k.status === t.value).length,
  }));

  const filtered = useMemo(() => karigars
    .filter(k => filter === 'all' || k.status === filter)
    .filter(k => !search || k.name.toLowerCase().includes(search.toLowerCase()) || k.craft.toLowerCase().includes(search.toLowerCase())),
    [karigars, filter, search]
  );

  const handleApprove = id => {
    // TODO: Call PATCH /api/admin/karigars/:id/approve
    setKarigars(k => k.map(x => x.id === id ? { ...x, status: 'approved' } : x));
  };
  const handleReject = id => {
    // TODO: Call PATCH /api/admin/karigars/:id/reject
    setKarigars(k => k.map(x => x.id === id ? { ...x, status: 'rejected' } : x));
  };
  const handleDelete = () => {
    // TODO: Call DELETE /api/admin/karigars/:id
    setKarigars(k => k.filter(x => x.id !== deleteTarget.id));
    setDelete(null);
  };

  return (
    <div>
      <PageHeader title="Karigars" sub={`${karigars.filter(k => k.status === 'pending').length} pending approval`}>
        <SearchInput value={search} onChange={setSearch} placeholder="Search karigar or craft..." />
      </PageHeader>

      <div className="mb-4 overflow-x-auto pb-1">
        <FilterTabs tabs={tabsWithCount} active={filter} onChange={setFilter} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="🧑‍🎨" message="No karigars found" sub="Try adjusting your search or filter" />
      ) : (
        <TableCard>
          <thead>
            <tr>
              <Th>Karigar</Th>
              <Th>State</Th>
              <Th>Craft</Th>
              <Th>Products</Th>
              <Th>Earnings</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((k, i) => (
              <Tr key={k.id}>
                <Td>
                  <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }} className="flex items-center gap-3">
                    <img src={k.avatar} alt={k.name} className="w-9 h-9 rounded-xl object-cover flex-shrink-0"
                      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
                    <p className="font-semibold text-[#1A0A02] text-sm whitespace-nowrap">{k.name}</p>
                  </motion.div>
                </Td>
                <Td>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                    style={{ background: '#F5ECD8', color: '#7B5C3A' }}>{k.state}</span>
                </Td>
                <Td className="text-sm font-medium max-w-[140px] truncate" style={{ color: '#7B5C3A' }}>{k.craft}</Td>
                <Td>
                  <span className="font-bold text-[#1A0A02]">{k.products}</span>
                  <span className="text-xs font-medium ml-1" style={{ color: '#9B7A52' }}>items</span>
                </Td>
                <Td>
                  <div className="min-w-[110px]">
                    <p className="font-bold text-[#1A0A02] text-sm">₹{k.earnings.toLocaleString('en-IN')}</p>
                    <div className="mt-1.5 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(232,213,176,0.5)' }}>
                      <motion.div
                        initial={{ width: 0 }} animate={{ width: `${(k.earnings / maxEarnings) * 100}%` }}
                        transition={{ delay: 0.3 + i * 0.05, duration: 0.7, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, #C0522B, #8B3A1A)' }}
                      />
                    </div>
                  </div>
                </Td>
                <Td><StatusBadge status={k.status} /></Td>
                <Td>
                  <div className="flex items-center gap-1.5">
                    {k.status === 'pending' && (
                      <>
                        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                          onClick={() => handleApprove(k.id)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors"
                          style={{ background: '#F0FDF4', color: '#15803D', border: '1px solid rgba(34,197,94,0.2)' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#DCFCE7'}
                          onMouseLeave={e => e.currentTarget.style.background = '#F0FDF4'}>
                          <CheckCircle size={12} /> Approve
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                          onClick={() => handleReject(k.id)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors"
                          style={{ background: '#FFF1F2', color: '#BE123C', border: '1px solid rgba(244,63,94,0.2)' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#FFE4E6'}
                          onMouseLeave={e => e.currentTarget.style.background = '#FFF1F2'}>
                          <XCircle size={12} /> Reject
                        </motion.button>
                      </>
                    )}
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                      onClick={() => setDelete(k)}
                      className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
                      style={{ color: '#9B7A52' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(244,63,94,0.08)'; e.currentTarget.style.color = '#F43F5E'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#9B7A52'; }}>
                      <Trash2 size={14} />
                    </motion.button>
                  </div>
                </Td>
              </Tr>
            ))}
          </tbody>
        </TableCard>
      )}

      <DeleteModal open={!!deleteTarget} onClose={() => setDelete(null)} onConfirm={handleDelete} label={deleteTarget?.name} />
    </div>
  );
}
