// TODO: Replace with backend API later
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClipboardList, Package, ArrowRight, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { products } from '../data/sampleData';

// ─── Dummy orders ─────────────────────────────────────────────────────────────
// TODO: Replace with backend API later — GET /api/user/orders
const DUMMY_ORDERS = [
  {
    orderId:    '#KH-7821',
    placedAt:   '2025-06-12T10:30:00.000Z',
    products:   [{ ...products[0], quantity: 1 }, { ...products[2], quantity: 2 }],
    totalPrice: 5600,
    shippingAddress: { fullName: 'Ananya Sharma', city: 'Delhi', state: 'Delhi', pincode: '110001' },
    paymentMethod: 'upi',
    isPaid:      true,
    isDelivered: false,
  },
  {
    orderId:    '#KH-7798',
    placedAt:   '2025-05-28T14:15:00.000Z',
    products:   [{ ...products[3], quantity: 1 }],
    totalPrice: 2800,
    shippingAddress: { fullName: 'Ananya Sharma', city: 'Delhi', state: 'Delhi', pincode: '110001' },
    paymentMethod: 'card',
    isPaid:      true,
    isDelivered: true,
  },
  {
    orderId:    '#KH-7754',
    placedAt:   '2025-05-10T09:00:00.000Z',
    products:   [{ ...products[6], quantity: 3 }],
    totalPrice: 2670,
    shippingAddress: { fullName: 'Ananya Sharma', city: 'Delhi', state: 'Delhi', pincode: '110001' },
    paymentMethod: 'cod',
    isPaid:      false,
    isDelivered: false,
  },
  {
    orderId:    '#KH-7701',
    placedAt:   '2025-04-18T16:45:00.000Z',
    products:   [{ ...products[1], quantity: 1 }, { ...products[7], quantity: 1 }],
    totalPrice: 2530,
    shippingAddress: { fullName: 'Ananya Sharma', city: 'Delhi', state: 'Delhi', pincode: '110001' },
    paymentMethod: 'upi',
    isPaid:      true,
    isDelivered: true,
  },
];

const PAY_LABEL = { upi: 'UPI', card: 'Card', cod: 'COD' };

// ─── Status badge ─────────────────────────────────────────────────────────────
function Badge({ label, color }) {
  const cls = {
    green:  'bg-green-100  text-green-700  border-green-200',
    yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    blue:   'bg-blue-100   text-blue-700   border-blue-200',
    gray:   'bg-[#E8D5B0]  text-[#7B5C3A]  border-[#E8D5B0]',
  };
  return (
    <span className={`inline-flex items-center text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${cls[color]}`}>
      {label}
    </span>
  );
}

// ─── Single order card ────────────────────────────────────────────────────────
function OrderCard({ order, index }) {
  const [expanded, setExpanded] = useState(false);
  const date = new Date(order.placedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="bg-white rounded-2xl border border-[#E8D5B0]/60 overflow-hidden hover:shadow-md transition-shadow">

      {/* Card header — always visible */}
      <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">

        {/* Product thumbnails */}
        <div className="flex -space-x-2 shrink-0">
          {order.products.slice(0, 3).map((p, i) => (
            <img key={i} src={p.image} alt={p.name}
              className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-sm" />
          ))}
          {order.products.length > 3 && (
            <div className="w-12 h-12 rounded-xl bg-[#F5ECD8] border-2 border-white flex items-center justify-center text-xs font-bold text-[#7B5C3A]">
              +{order.products.length - 3}
            </div>
          )}
        </div>

        {/* Order meta */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-display font-bold text-[#C0522B] text-sm">{order.orderId}</span>
            <span className="text-[#E8D5B0]">·</span>
            <span className="text-xs text-[#7B5C3A]">{date}</span>
          </div>
          <p className="text-sm text-[#5C3317] line-clamp-1">
            {order.products.map(p => p.name).join(', ')}
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge label={order.isPaid ? '✓ Paid' : '⏳ Payment Pending'} color={order.isPaid ? 'green' : 'yellow'} />
            <Badge label={order.isDelivered ? '✓ Delivered' : '🚚 Processing'} color={order.isDelivered ? 'green' : 'blue'} />
            <Badge label={PAY_LABEL[order.paymentMethod]} color="gray" />
          </div>
        </div>

        {/* Total + expand */}
        <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1 shrink-0">
          <span className="font-display text-xl font-bold text-[#2C1A0E]">₹{order.totalPrice.toLocaleString('en-IN')}</span>
          <button onClick={() => setExpanded(e => !e)}
            className="flex items-center gap-1 text-xs text-[#C0522B] font-semibold hover:underline transition-all">
            {expanded ? <><ChevronUp size={13} /> Less</> : <><ChevronDown size={13} /> Details</>}
          </button>
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
          className="border-t border-[#E8D5B0]/60 px-5 pb-5 pt-4 space-y-4">

          {/* Items */}
          <div>
            <p className="text-xs font-bold text-[#7B5C3A] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Package size={11} /> Items
            </p>
            <div className="space-y-2.5">
              {order.products.map(item => (
                <div key={item.id} className="flex gap-3 items-center">
                  <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover shrink-0 border border-[#E8D5B0]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#2C1A0E] line-clamp-1">{item.name}</p>
                    <p className="text-xs text-[#7B5C3A]">Qty: {item.quantity} · {item.artisan}</p>
                  </div>
                  <span className="text-sm font-bold text-[#2C1A0E] shrink-0">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping */}
          <div className="flex items-start gap-2 text-sm text-[#5C3317]">
            <MapPin size={14} className="text-[#C0522B] mt-0.5 shrink-0" />
            <span>
              {order.shippingAddress.fullName} · {order.shippingAddress.city}, {order.shippingAddress.state} – {order.shippingAddress.pincode}
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Orders() {
  const [filter, setFilter] = useState('all');

  // TODO: Replace with backend API later — GET /api/user/orders?status=filter
  const filtered = DUMMY_ORDERS.filter(o => {
    if (filter === 'active')    return !o.isDelivered;
    if (filter === 'delivered') return o.isDelivered;
    if (filter === 'pending')   return !o.isPaid;
    return true;
  });

  const counts = {
    all:       DUMMY_ORDERS.length,
    active:    DUMMY_ORDERS.filter(o => !o.isDelivered).length,
    delivered: DUMMY_ORDERS.filter(o => o.isDelivered).length,
    pending:   DUMMY_ORDERS.filter(o => !o.isPaid).length,
  };

  return (
    <div className="min-h-screen bg-[#FDF6EC] pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <ClipboardList size={24} className="text-[#C0522B]" />
          <h1 className="font-display text-3xl font-bold text-[#2C1A0E]">My Orders</h1>
          <span className="bg-[#C0522B] text-white text-xs font-bold px-2.5 py-1 rounded-full">{DUMMY_ORDERS.length}</span>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: 'all',       label: 'All Orders' },
            { key: 'active',    label: 'Active' },
            { key: 'delivered', label: 'Delivered' },
            { key: 'pending',   label: 'Payment Pending' },
          ].map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === f.key
                  ? 'bg-[#C0522B] text-white shadow-sm'
                  : 'bg-white border border-[#E8D5B0] text-[#5C3317] hover:border-[#C0522B]'
              }`}>
              {f.label} <span className="ml-1 text-xs opacity-70">({counts[f.key]})</span>
            </button>
          ))}
        </div>

        {/* Order list */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <ClipboardList size={48} className="text-[#E8D5B0] mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold text-[#2C1A0E] mb-2">कोई order नहीं</h2>
            <p className="text-[#7B5C3A] mb-6">No orders found for this filter.</p>
            <Link to="/products"
              className="inline-flex items-center gap-2 bg-[#C0522B] text-white px-8 py-3 rounded-full font-bold hover:bg-[#9A3E1E] transition-all">
              Shopping शुरू करें <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((order, i) => (
              <OrderCard key={order.orderId} order={order} index={i} />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {filtered.length > 0 && (
          <div className="mt-8 text-center">
            <Link to="/products"
              className="inline-flex items-center gap-2 border border-[#E8D5B0] text-[#5C3317] px-6 py-3 rounded-full font-semibold hover:bg-[#F5ECD8] transition-colors text-sm">
              और Products देखें <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
