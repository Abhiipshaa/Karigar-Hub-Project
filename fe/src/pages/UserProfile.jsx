import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, ShoppingBag, Heart, Edit3, Save, X, Package, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const tabs = ['Overview', 'My Orders', 'Wishlist', 'Settings'];

export default function UserProfile() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('Overview');
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city: user?.city || '',
    state: user?.state || '',
  });

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <div className="min-h-screen bg-[#FDF6EC] pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-[#E8D5B0]/60 overflow-hidden mb-6 shadow-sm">
          <div className="h-28 bg-gradient-to-r from-[#C0522B] to-[#7B1C2E] relative">
            <div className="absolute inset-0 pattern-dots opacity-20" />
          </div>
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-10">
              <div className="flex items-end gap-4">
                <div className="w-20 h-20 rounded-2xl bg-[#C0522B] border-4 border-white flex items-center justify-center text-white font-bold text-2xl font-display shadow-lg">
                  {initials}
                </div>
                <div className="mb-1">
                  <h1 className="font-display text-2xl font-bold text-[#2C1A0E]">{user?.name || 'User'}</h1>
                  <p className="text-sm text-[#7B5C3A]">{user?.email}</p>
                </div>
              </div>
              <div className="flex gap-2 mb-1">
                <button onClick={() => setEditing(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#C0522B] text-[#C0522B] text-sm font-semibold hover:bg-[#C0522B] hover:text-white transition-all">
                  <Edit3 size={13} /> Edit Profile
                </button>
                <button onClick={logout}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E8D5B0] text-[#7B5C3A] text-sm font-semibold hover:border-red-400 hover:text-red-500 transition-all">
                  <LogOut size={13} /> Sign Out
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-2xl border border-[#E8D5B0]/60 p-1 mb-6 shadow-sm">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab ? 'bg-[#C0522B] text-white shadow-sm' : 'text-[#7B5C3A] hover:text-[#2C1A0E]'
              }`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>

          {/* ── Overview ── */}
          {activeTab === 'Overview' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Stats */}
              {[
                { icon: ShoppingBag, label: 'Total Orders', value: '0', color: 'bg-orange-50 text-[#C0522B]' },
                { icon: Heart, label: 'Wishlist Items', value: '0', color: 'bg-rose-50 text-rose-500' },
                { icon: Package, label: 'Delivered', value: '0', color: 'bg-green-50 text-green-600' },
                { icon: MapPin, label: 'Saved Addresses', value: '0', color: 'bg-blue-50 text-blue-500' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="bg-white rounded-2xl border border-[#E8D5B0]/60 p-5 flex items-center gap-4 shadow-sm">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-display text-[#2C1A0E]">{value}</p>
                    <p className="text-sm text-[#7B5C3A]">{label}</p>
                  </div>
                </div>
              ))}

              {/* Info Card */}
              <div className="sm:col-span-2 bg-white rounded-2xl border border-[#E8D5B0]/60 p-6 shadow-sm">
                <h3 className="font-semibold text-[#2C1A0E] mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: User, label: 'Full Name', value: user?.name || '—' },
                    { icon: Mail, label: 'Email', value: user?.email || '—' },
                    { icon: Phone, label: 'Phone', value: user?.phone || '—' },
                    { icon: MapPin, label: 'Location', value: user?.city ? `${user.city}, ${user.state}` : '—' },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-[#FDF6EC]">
                      <Icon size={16} className="text-[#C0522B]" />
                      <div>
                        <p className="text-[10px] text-[#7B5C3A] font-semibold uppercase tracking-wide">{label}</p>
                        <p className="text-sm text-[#2C1A0E] font-medium">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── My Orders ── */}
          {activeTab === 'My Orders' && (
            <div className="bg-white rounded-2xl border border-[#E8D5B0]/60 p-8 text-center shadow-sm">
              <p className="text-5xl mb-4">📦</p>
              <h3 className="font-display text-xl font-bold text-[#2C1A0E] mb-2">No orders yet</h3>
              <p className="text-[#7B5C3A] mb-6">Your orders will appear here once you start shopping.</p>
              <Link to="/products"
                className="inline-flex items-center gap-2 bg-[#C0522B] text-white px-6 py-3 rounded-full font-bold hover:bg-[#9A3E1E] transition-all">
                Start Shopping
              </Link>
            </div>
          )}

          {/* ── Wishlist ── */}
          {activeTab === 'Wishlist' && (
            <div className="bg-white rounded-2xl border border-[#E8D5B0]/60 p-8 text-center shadow-sm">
              <p className="text-5xl mb-4">🤍</p>
              <h3 className="font-display text-xl font-bold text-[#2C1A0E] mb-2">Your wishlist is empty</h3>
              <p className="text-[#7B5C3A] mb-6">Save items you love and come back to them anytime.</p>
              <Link to="/products"
                className="inline-flex items-center gap-2 bg-[#C0522B] text-white px-6 py-3 rounded-full font-bold hover:bg-[#9A3E1E] transition-all">
                Explore Products
              </Link>
            </div>
          )}

          {/* ── Settings ── */}
          {activeTab === 'Settings' && (
            <div className="bg-white rounded-2xl border border-[#E8D5B0]/60 p-6 shadow-sm space-y-4">
              <h3 className="font-semibold text-[#2C1A0E]">Account Settings</h3>
              {[
                { label: 'Email Notifications', desc: 'Receive order updates and offers via email' },
                { label: 'SMS Alerts', desc: 'Get delivery updates on your phone' },
                { label: 'Newsletter', desc: 'Artisan stories and new arrivals' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-4 rounded-xl bg-[#FDF6EC]">
                  <div>
                    <p className="text-sm font-semibold text-[#2C1A0E]">{item.label}</p>
                    <p className="text-xs text-[#7B5C3A]">{item.desc}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="accent-[#C0522B] w-4 h-4 cursor-pointer" />
                </div>
              ))}
              <button onClick={logout}
                className="w-full mt-2 py-3 rounded-xl border-2 border-red-200 text-red-500 font-semibold text-sm hover:bg-red-50 transition-all">
                Delete Account
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-xl font-bold text-[#2C1A0E]">Edit Profile</h3>
              <button onClick={() => setEditing(false)} className="p-2 rounded-full hover:bg-[#F5ECD8] transition-colors">
                <X size={18} className="text-[#7B5C3A]" />
              </button>
            </div>
            <div className="space-y-3">
              {[
                { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
                { key: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                { key: 'phone', label: 'Phone', type: 'tel', placeholder: '98765 43210' },
                { key: 'city', label: 'City', type: 'text', placeholder: 'Your city' },
                { key: 'state', label: 'State', type: 'text', placeholder: 'Your state' },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-[#2C1A0E] mb-1">{label}</label>
                  <input type={type} value={form[key]} placeholder={placeholder}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8D5B0] text-sm text-[#2C1A0E] focus:outline-none focus:border-[#C0522B] transition-colors" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setEditing(false)}
                className="flex-1 py-2.5 rounded-xl border border-[#E8D5B0] text-[#7B5C3A] text-sm font-semibold hover:border-[#C0522B] transition-all">
                Cancel
              </button>
              <button onClick={() => setEditing(false)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#C0522B] text-white text-sm font-semibold hover:bg-[#9A3E1E] transition-all">
                <Save size={14} /> Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
