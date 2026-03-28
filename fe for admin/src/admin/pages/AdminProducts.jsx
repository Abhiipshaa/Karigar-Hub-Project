import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { adminProducts } from '../data/adminData';
import { Toggle, DeleteModal, EmptyState, FilterTabs, PageHeader, SearchInput } from '../components/AdminUI';

// TODO: Replace with backend API later
const categories = ['All', 'Handloom', 'Pottery', 'Jewellery', 'Paintings', 'Festive Items', 'Home Decor'];

export default function AdminProducts() {
  const [products, setProducts]   = useState(adminProducts);
  const [deleteTarget, setDelete] = useState(null);
  const [category, setCategory]   = useState('All');
  const [search, setSearch]       = useState('');

  const catTabs = categories.map(c => ({
    value: c, label: c,
    count: c === 'All' ? products.length : products.filter(p => p.category === c).length,
  }));

  const filtered = useMemo(() => products
    .filter(p => category === 'All' || p.category === category)
    .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.artisan.toLowerCase().includes(search.toLowerCase())),
    [products, category, search]
  );

  const handleToggle = id => {
    // TODO: Call PATCH /api/admin/products/:id/toggle
    setProducts(p => p.map(x => x.id === id ? { ...x, active: !x.active } : x));
  };
  const handleDelete = () => {
    // TODO: Call DELETE /api/admin/products/:id
    setProducts(p => p.filter(x => x.id !== deleteTarget.id));
    setDelete(null);
  };

  return (
    <div>
      <PageHeader
        title="Products"
        sub={`${products.filter(p => p.active).length} active · ${products.filter(p => !p.active).length} inactive`}>
        <SearchInput value={search} onChange={setSearch} placeholder="Search product or artisan..." />
      </PageHeader>

      <div className="mb-5 overflow-x-auto pb-1">
        <FilterTabs tabs={catTabs} active={category} onChange={setCategory} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="📦" message="No products found" sub="Try a different category or search term" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id} layout
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.93 }}
                transition={{ delay: i * 0.04, type: 'spring', stiffness: 300, damping: 26 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl overflow-hidden"
                style={{
                  background: 'white',
                  border: '1px solid rgba(232,213,176,0.35)',
                  boxShadow: '0 2px 0 rgba(232,213,176,0.4), 0 4px 20px rgba(44,26,14,0.06)',
                  transition: 'box-shadow 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 2px 0 rgba(232,213,176,0.4), 0 16px 40px rgba(44,26,14,0.12)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 0 rgba(232,213,176,0.4), 0 4px 20px rgba(44,26,14,0.06)'}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-[#F5ECD8]">
                  <motion.img
                    src={product.image} alt={product.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                  {/* Inactive overlay */}
                  <AnimatePresence>
                    {!product.active && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ background: 'rgba(15,5,0,0.55)', backdropFilter: 'blur(3px)' }}>
                        <span className="text-white text-xs font-bold px-3 py-1.5 rounded-full"
                          style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.15)' }}>
                          Inactive
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {/* Category chip */}
                  <span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-1 rounded-lg"
                    style={{ background: 'rgba(251,245,236,0.9)', color: '#7B5C3A', backdropFilter: 'blur(6px)' }}>
                    {product.category}
                  </span>
                  {/* Active dot */}
                  <span className={`absolute top-2.5 right-2.5 w-2 h-2 rounded-full ${product.active ? 'bg-green-400' : 'bg-gray-400'}`}
                    style={{ boxShadow: product.active ? '0 0 6px rgba(74,222,128,0.6)' : 'none' }} />
                </div>

                {/* Info */}
                <div className="p-5">
                  <p className="font-bold text-[#1A0A02] text-sm leading-snug truncate mb-0.5">{product.name}</p>
                  <p className="text-xs font-medium mb-3 truncate" style={{ color: '#9B7A52' }}>by {product.artisan}</p>
                  <p className="font-display font-bold text-[#C0522B] text-lg mb-4">₹{product.price.toLocaleString('en-IN')}</p>

                  <div className="flex items-center justify-between pt-3"
                    style={{ borderTop: '1px solid rgba(232,213,176,0.35)' }}>
                    <div className="flex items-center gap-2.5">
                      <Toggle checked={product.active} onChange={() => handleToggle(product.id)} />
                      <span className={`text-xs font-semibold ${product.active ? 'text-green-600' : 'text-gray-400'}`}>
                        {product.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                      onClick={() => setDelete(product)}
                      className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
                      style={{ color: '#C0B090' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(244,63,94,0.08)'; e.currentTarget.style.color = '#F43F5E'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C0B090'; }}>
                      <Trash2 size={14} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <DeleteModal open={!!deleteTarget} onClose={() => setDelete(null)} onConfirm={handleDelete} label={deleteTarget?.name} />
    </div>
  );
}
