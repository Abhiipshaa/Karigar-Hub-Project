import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, ShoppingBag, BarChart2, Settings, LogOut, TrendingUp, Eye, Plus, Edit, Trash2, Menu, X, IndianRupee } from 'lucide-react';
import { dashboardStats, recentOrders } from '../data/sampleData';
import { getProducts, getMyOrders, createProduct, deleteProduct } from '../services/api';
import { useAuth } from '../context/AuthContext';

const statusColors = {
  Shipped: 'bg-blue-100 text-blue-700',
  Processing: 'bg-yellow-100 text-yellow-700',
  Delivered: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
  { icon: Package, label: 'Products', id: 'products' },
  { icon: ShoppingBag, label: 'Orders', id: 'orders' },
  { icon: BarChart2, label: 'Analytics', id: 'analytics' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

function StatCard({ title, value, sub, icon: Icon, color, growth }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E8D5B0]/60 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={18} />
        </div>
        {growth && <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full">↑ {growth}%</span>}
      </div>
      <p className="font-display text-2xl font-bold text-[#2C1A0E] mb-0.5">{value}</p>
      <p className="text-sm text-[#7B5C3A]">{title}</p>
      {sub && <p className="text-xs text-[#C0522B] mt-1">{sub}</p>}
    </div>
  );
}

function AddProductForm({ onClose }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E8D5B0]/60 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-xl font-bold text-[#2C1A0E]">नया Product जोड़ें</h3>
        <button onClick={onClose} className="text-[#7B5C3A] hover:text-[#C0522B]"><X size={20} /></button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'Product Name', placeholder: 'e.g. Madhubani Wall Art', type: 'text' },
          { label: 'Price (₹)', placeholder: '0', type: 'number' },
          { label: 'Category', type: 'select', options: ['Handloom', 'Jewellery', 'Pottery', 'Home Decor', 'Paintings', 'Festive Items', 'Wooden Crafts', 'Gifts'] },
          { label: 'State', type: 'select', options: ['Odisha', 'Rajasthan', 'West Bengal', 'Uttar Pradesh', 'Bihar', 'Assam', 'Kashmir', 'Gujarat'] },
          { label: 'Stock Quantity', placeholder: '1', type: 'number' },
          { label: 'Original Price (₹) — optional', placeholder: '0', type: 'number' },
        ].map(field => (
          <div key={field.label}>
            <label className="block text-sm font-semibold text-[#2C1A0E] mb-1.5">{field.label}</label>
            {field.type === 'select' ? (
              <select className="w-full px-4 py-2.5 rounded-xl border border-[#E8D5B0] text-[#2C1A0E] text-sm focus:outline-none focus:border-[#C0522B] bg-white">
                <option value="">Select...</option>
                {field.options.map(o => <option key={o}>{o}</option>)}
              </select>
            ) : (
              <input type={field.type} placeholder={field.placeholder}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8D5B0] text-[#2C1A0E] text-sm focus:outline-none focus:border-[#C0522B]" />
            )}
          </div>
        ))}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-[#2C1A0E] mb-1.5">Description</label>
          <textarea rows={3} placeholder="Describe your product, materials used, time taken..."
            className="w-full px-4 py-2.5 rounded-xl border border-[#E8D5B0] text-[#2C1A0E] text-sm focus:outline-none focus:border-[#C0522B] resize-none" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-[#2C1A0E] mb-1.5">Product Images</label>
          <div className="border-2 border-dashed border-[#E8D5B0] rounded-xl p-8 text-center hover:border-[#C0522B] transition-colors cursor-pointer">
            <p className="text-[#7B5C3A] text-sm">Drag & drop images or <span className="text-[#C0522B] font-semibold">browse</span></p>
            <p className="text-xs text-[#7B5C3A] mt-1">PNG, JPG up to 10MB</p>
          </div>
        </div>
        <div className="md:col-span-2 flex items-center gap-3">
          <input type="checkbox" id="customizable" className="accent-[#C0522B]" />
          <label htmlFor="customizable" className="text-sm text-[#2C1A0E]">This product accepts custom orders</label>
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button className="flex-1 py-3 rounded-full bg-[#C0522B] text-white font-bold hover:bg-[#9A3E1E] transition-colors">Publish Product</button>
        <button onClick={onClose} className="flex-1 py-3 rounded-full border border-[#E8D5B0] text-[#5C3317] font-semibold hover:bg-[#F5ECD8] transition-colors">Save Draft</button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  // API integrated here — fetch products and orders from backend
  const { user, logout } = useAuth();
  const [artisanProducts, setArtisanProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    getProducts()
      .then(data => setArtisanProducts(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoadingProducts(false));
    getMyOrders()
      .then(data => setOrders(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setArtisanProducts(prev => prev.filter(p => (p._id || p.id) !== id));
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[#F5ECD8]/30 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#1E0E06] flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex`}>
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#C0522B] flex items-center justify-center text-white font-bold font-display">क</div>
            <div>
              <span className="font-display text-base font-bold text-white block">Karigar Hub</span>
              <span className="text-[9px] tracking-widest text-[#C0522B]">KARIGAR DASHBOARD</span>
            </div>
          </Link>
        </div>
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&q=80" alt="" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="text-white text-sm font-bold">{user?.name || 'Karigar'}</p>
              <p className="text-[#B8A080] text-xs">{user?.category || user?.craft || 'Artisan'} · {user?.address?.state || user?.state || 'India'}</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === item.id ? 'bg-[#C0522B] text-white' : 'text-[#B8A080] hover:bg-white/10 hover:text-white'
              }`}>
              <item.icon size={16} /> {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#B8A080] hover:bg-white/10 hover:text-white text-sm font-semibold transition-all">
            <LogOut size={16} /> Back to Store
          </Link>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-[#E8D5B0]/60 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-[#F5ECD8] text-[#5C3317]">
              <Menu size={20} />
            </button>
            <div>
              <h1 className="font-display text-xl font-bold text-[#2C1A0E] capitalize">{activeTab}</h1>
              <p className="text-xs text-[#7B5C3A]">नमस्ते, {user?.name?.split(' ')[0] || 'Karigar'} जी! 🙏</p>
            </div>
          </div>
          <button onClick={() => { setShowAddForm(true); setActiveTab('products'); }}
            className="flex items-center gap-2 bg-[#C0522B] text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-[#9A3E1E] transition-colors">
            <Plus size={14} /> Add Product
          </button>
        </header>

        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {/* Overview */}
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard title="Total Earnings" value={`₹${dashboardStats.earnings.total.toLocaleString('en-IN')}`}
                  sub={`+₹${dashboardStats.earnings.thisMonth.toLocaleString('en-IN')} this month`}
                  icon={IndianRupee} color="bg-[#C0522B]/10 text-[#C0522B]" growth={dashboardStats.earnings.growth} />
                <StatCard title="Active Products" value={artisanProducts.length}
                  sub={`${artisanProducts.filter(p => !p.inStock && !p.stock).length} out of stock`}
                  icon={Package} color="bg-[#1E4D2B]/10 text-[#1E4D2B]" />
                <StatCard title="Total Orders" value={orders.length}
                  sub={`${orders.filter(o => !o.isDelivered).length} pending`}
                  icon={ShoppingBag} color="bg-blue-100 text-blue-600" />
                <StatCard title="Profile Views" value={dashboardStats.views.total.toLocaleString('en-IN')}
                  sub={`${dashboardStats.views.thisMonth.toLocaleString('en-IN')} this month`}
                  icon={Eye} color="bg-purple-100 text-purple-600" />
              </div>

              <div className="bg-white rounded-2xl border border-[#E8D5B0]/60 overflow-hidden">
                <div className="p-5 border-b border-[#E8D5B0]/60 flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-[#2C1A0E]">Recent Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-sm text-[#C0522B] font-semibold hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#F5ECD8]/50">
                      <tr>{['Order ID', 'Customer', 'Product', 'Amount', 'Status', 'Date'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-bold text-[#7B5C3A] uppercase tracking-wide">{h}</th>
                      ))}</tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8D5B0]/40">
                      {(orders.length ? orders : recentOrders).map((order, idx) => (
                        <tr key={order._id || order.id || idx} className="hover:bg-[#F5ECD8]/30 transition-colors">
                          <td className="px-4 py-3 font-mono text-xs text-[#C0522B] font-bold">{order._id ? `#KH-${order._id.slice(-4).toUpperCase()}` : order.id}</td>
                          <td className="px-4 py-3 font-semibold text-[#2C1A0E]">{order.customer || order.user?.name || 'Customer'}</td>
                          <td className="px-4 py-3 text-[#5C3317] max-w-[160px] truncate">{order.product || order.products?.[0]?.product?.name || 'Product'}</td>
                          <td className="px-4 py-3 font-bold text-[#2C1A0E]">₹{(order.amount || order.totalPrice || 0).toLocaleString('en-IN')}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColors[order.status] || (order.isDelivered ? statusColors.Delivered : order.isPaid ? statusColors.Shipped : statusColors.Processing)}`}>
                              {order.status || (order.isDelivered ? 'Delivered' : order.isPaid ? 'Shipped' : 'Processing')}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-[#7B5C3A]">{order.date || new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {showAddForm && <div className="mb-6"><AddProductForm onClose={() => setShowAddForm(false)} /></div>}
              <div className="bg-white rounded-2xl border border-[#E8D5B0]/60 overflow-hidden">
                <div className="p-5 border-b border-[#E8D5B0]/60 flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-[#2C1A0E]">मेरे Products</h3>
                  <button onClick={() => setShowAddForm(true)} className="flex items-center gap-1.5 text-sm text-[#C0522B] font-semibold hover:underline">
                    <Plus size={14} /> Add New
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#F5ECD8]/50">
                      <tr>{['Product', 'Category', 'Price', 'Stock', 'Rating', 'Actions'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-bold text-[#7B5C3A] uppercase tracking-wide">{h}</th>
                      ))}</tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8D5B0]/40">
                      {artisanProducts.map(product => (
                        <tr key={product._id || product.id} className="hover:bg-[#F5ECD8]/30 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img src={product.images?.[0] || product.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                              <span className="font-semibold text-[#2C1A0E] max-w-[160px] truncate">{product.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-[#5C3317]">{product.category}</td>
                          <td className="px-4 py-3 font-bold text-[#2C1A0E]">₹{product.price.toLocaleString('en-IN')}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${(product.stock > 0 || product.inStock) ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {(product.stock > 0 || product.inStock) ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-bold text-[#2C1A0E]">⭐ {product.ratings || product.rating || 0}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button className="p-1.5 rounded-lg hover:bg-[#F5ECD8] text-[#5C3317] hover:text-[#C0522B] transition-colors"><Edit size={14} /></button>
                              <button onClick={() => handleDeleteProduct(product._id || product.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-[#5C3317] hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="bg-white rounded-2xl border border-[#E8D5B0]/60 overflow-hidden">
                <div className="p-5 border-b border-[#E8D5B0]/60">
                  <h3 className="font-display text-lg font-bold text-[#2C1A0E]">All Orders</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#F5ECD8]/50">
                      <tr>{['Order ID', 'Customer', 'Product', 'Amount', 'Status', 'Date'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-bold text-[#7B5C3A] uppercase tracking-wide">{h}</th>
                      ))}</tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8D5B0]/40">
                      {(orders.length ? orders : recentOrders).map((order, idx) => (
                        <tr key={order._id || order.id || idx} className="hover:bg-[#F5ECD8]/30 transition-colors">
                          <td className="px-4 py-3 font-mono text-xs text-[#C0522B] font-bold">{order._id ? `#KH-${order._id.slice(-4).toUpperCase()}` : order.id}</td>
                          <td className="px-4 py-3 font-semibold text-[#2C1A0E]">{order.customer || order.user?.name || 'Customer'}</td>
                          <td className="px-4 py-3 text-[#5C3317]">{order.product || order.products?.[0]?.product?.name || 'Product'}</td>
                          <td className="px-4 py-3 font-bold text-[#2C1A0E]">₹{(order.amount || order.totalPrice || 0).toLocaleString('en-IN')}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColors[order.status] || (order.isDelivered ? statusColors.Delivered : order.isPaid ? statusColors.Shipped : statusColors.Processing)}`}>
                              {order.status || (order.isDelivered ? 'Delivered' : order.isPaid ? 'Shipped' : 'Processing')}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-[#7B5C3A]">{order.date || new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {(activeTab === 'analytics' || activeTab === 'settings') && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-5xl mb-3">{activeTab === 'analytics' ? '📊' : '⚙️'}</p>
                <h3 className="font-display text-xl font-bold text-[#2C1A0E] mb-2 capitalize">{activeTab}</h3>
                <p className="text-[#7B5C3A] text-sm">This section is ready for backend integration.</p>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
