import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Eye, Trash2, Ban } from 'lucide-react';
import { adminUsers } from '../data/adminData';
import { StatusBadge, DeleteModal, TableCard, Th, Tr, Td, EmptyState, FilterTabs, PageHeader, SearchInput, ActionBtn } from '../components/AdminUI';

// TODO: Replace with backend API later
const tabs = [
  { value: 'all',     label: 'All Users' },
  { value: 'active',  label: 'Active'    },
  { value: 'blocked', label: 'Blocked'   },
];

export default function AdminUsers() {
  const [users, setUsers]         = useState(adminUsers);
  const [deleteTarget, setDelete] = useState(null);
  const [filter, setFilter]       = useState('all');
  const [search, setSearch]       = useState('');

  const tabsWithCount = tabs.map(t => ({
    ...t,
    count: t.value === 'all' ? users.length : users.filter(u => u.status === t.value).length,
  }));

  const filtered = useMemo(() => users
    .filter(u => filter === 'all' || u.status === filter)
    .filter(u => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())),
    [users, filter, search]
  );

  const handleDelete = () => {
    // TODO: Call DELETE /api/admin/users/:id
    setUsers(u => u.filter(x => x.id !== deleteTarget.id));
    setDelete(null);
  };

  const handleBlock = id => {
    // TODO: Call PATCH /api/admin/users/:id/block
    setUsers(u => u.map(x => x.id === id ? { ...x, status: x.status === 'blocked' ? 'active' : 'blocked' } : x));
  };

  return (
    <div>
      <PageHeader title="Users" sub={`${users.length} registered users on the platform`}>
        <SearchInput value={search} onChange={setSearch} placeholder="Search name or email..." />
      </PageHeader>

      <div className="mb-16 overflow-x-auto pb-1">
        <FilterTabs tabs={tabsWithCount} active={filter} onChange={setFilter} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="👤" message="No users found" sub="Try adjusting your search or filter" />
      ) : (
        <TableCard>
          <thead>
            <tr>
              <Th>User</Th>
              <Th>Email</Th>
              <Th>Location</Th>
              <Th>Orders</Th>
              <Th>Joined</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user, i) => (
              <Tr key={user.id}>
                <Td>
                  <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }} className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <img src={user.avatar} alt={user.name}
                        className="w-9 h-9 rounded-xl object-cover"
                        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
                      <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${user.status === 'active' ? 'bg-green-400' : 'bg-red-400'}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1A0A02] text-sm whitespace-nowrap">{user.name}</p>
                      <p className="text-[11px] font-medium" style={{ color: '#9B7A52' }}>ID #{user.id}</p>
                    </div>
                  </motion.div>
                </Td>
                <Td className="text-xs font-medium" style={{ color: '#7B5C3A' }}>{user.email}</Td>
                <Td>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                    style={{ background: '#F5ECD8', color: '#7B5C3A' }}>{user.location}</span>
                </Td>
                <Td>
                  <span className="font-bold text-[#1A0A02] text-sm">{user.orders}</span>
                  <span className="text-xs font-medium ml-1" style={{ color: '#9B7A52' }}>orders</span>
                </Td>
                <Td className="text-xs font-medium whitespace-nowrap" style={{ color: '#9B7A52' }}>{user.joined}</Td>
                <Td><StatusBadge status={user.status} /></Td>
                <Td>
                  <div className="flex items-center gap-0.5">
                    <ActionBtn variant="info"    icon={Eye}   title="View user" />
                    <ActionBtn variant={user.status === 'blocked' ? 'success' : 'warning'} icon={Ban}
                      title={user.status === 'blocked' ? 'Unblock' : 'Block'}
                      onClick={() => handleBlock(user.id)} />
                    <ActionBtn variant="danger"  icon={Trash2} title="Delete user" onClick={() => setDelete(user)} />
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
