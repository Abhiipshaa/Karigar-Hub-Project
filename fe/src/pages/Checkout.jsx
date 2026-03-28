// API integrated here
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Lock, ChevronRight, AlertCircle, Leaf } from 'lucide-react';
import { products } from '../data/sampleData';
import { placeOrder } from '../services/api';

// ─── Dummy cart (same as Cart.jsx) ───────────────────────────────────────────
// TODO: Replace with global cart state / context later
const cartItems = [
  { ...products[0], quantity: 1 },
  { ...products[2], quantity: 2 },
  { ...products[6], quantity: 1 },
];

// ─── Mock logged-in user ──────────────────────────────────────────────────────
// TODO: Replace with auth context later
const MOCK_USER = { id: 'USR-001', name: 'Ananya Sharma', email: 'ananya@example.com' };

const INDIAN_STATES = [
  'Andhra Pradesh','Assam','Bihar','Chhattisgarh','Delhi','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala',
  'Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram',
  'Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu',
  'Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
];

const PAYMENT_METHODS = [
  { id: 'upi',  label: 'UPI Payment',         sub: 'GPay, PhonePe, Paytm, BHIM', icon: '📱' },
  { id: 'card', label: 'Credit / Debit Card',  sub: 'Visa, Mastercard, RuPay',    icon: '💳' },
  { id: 'cod',  label: 'Cash on Delivery',     sub: 'Pay when you receive',        icon: '🚚' },
];

const inputCls = 'w-full px-4 py-3 rounded-xl border border-[#E8D5B0] bg-white text-[#2C1A0E] placeholder-[#B09070] text-sm focus:outline-none focus:border-[#C0522B] focus:ring-2 focus:ring-[#C0522B]/10 transition-all';
const errCls   = 'text-xs text-red-500 mt-1 flex items-center gap-1';

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#2C1A0E] mb-1.5">{label}</label>
      {children}
      {error && <p className={errCls}><AlertCircle size={11} />{error}</p>}
    </div>
  );
}

// ─── Generate dummy order ID ──────────────────────────────────────────────────
const genOrderId = () => `#KH-${Math.floor(7800 + Math.random() * 200)}`;

export default function Checkout() {
  const navigate = useNavigate();

  // ── Shipping form state ────────────────────────────────────────────────────
  const [addr, setAddr] = useState({
    fullName: '', phone: '', email: '',
    line1: '', line2: '', city: '', pincode: '', state: '',
  });

  // ── Payment state ──────────────────────────────────────────────────────────
  const [payMethod, setPayMethod] = useState('upi');
  const [upiId,     setUpiId]     = useState('');
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: '' });

  // ── Validation errors ──────────────────────────────────────────────────────
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderError, setOrderError] = useState('');

  // ── Pricing (auto-calculated, not editable) ────────────────────────────────
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping  = subtotal > 999 ? 0 : 99;
  const total     = subtotal + shipping;

  // ── Validation ─────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!addr.fullName.trim())              e.fullName = 'Full name is required';
    if (!/^\d{10}$/.test(addr.phone))       e.phone    = 'Enter a valid 10-digit mobile number';
    if (!/\S+@\S+\.\S+/.test(addr.email))  e.email    = 'Enter a valid email address';
    if (!addr.line1.trim())                 e.line1    = 'Address is required';
    if (!addr.city.trim())                  e.city     = 'City is required';
    if (!/^\d{6}$/.test(addr.pincode))      e.pincode  = 'Enter a valid 6-digit PIN code';
    if (!addr.state)                        e.state    = 'Please select your state';

    if (payMethod === 'upi' && !upiId.trim())
      e.upiId = 'Enter your UPI ID';
    if (payMethod === 'card') {
      if (!/^\d{16}$/.test(card.number.replace(/\s/g, ''))) e.cardNumber = 'Enter a valid 16-digit card number';
      if (!card.expiry.trim())  e.cardExpiry = 'Enter expiry date';
      if (!/^\d{3}$/.test(card.cvv)) e.cardCvv = 'Enter a valid 3-digit CVV';
      if (!card.name.trim())    e.cardName   = 'Enter name on card';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Place order ────────────────────────────────────────────────────────────
  const handlePlaceOrder = async () => {
    if (!validate()) return;
    setLoading(true);

    // API integrated here — POST /api/orders
    try {
      const orderPayload = {
        products: cartItems.map(i => ({ product: i._id || i.id, quantity: i.quantity })),
        totalPrice: total,
        paymentMethod: payMethod,
        shippingAddress: {
          addressLine: `${addr.line1}${addr.line2 ? ', ' + addr.line2 : ''}`,
          city: addr.city,
          pincode: addr.pincode,
        },
      };
      const order = await placeOrder(orderPayload);
      navigate('/order-confirmation', { state: { order: { ...order, orderId: order._id, shippingAddress: addr, paymentMethod: payMethod } } });
    } catch (err) {
      setOrderError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const setA = (k, v) => setAddr(a => ({ ...a, [k]: v }));

  return (
    <div className="min-h-screen bg-[#FDF6EC] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#7B5C3A] mb-8">
          <Link to="/cart" className="hover:text-[#C0522B] transition-colors">Cart</Link>
          <ChevronRight size={14} />
          <span className="text-[#2C1A0E] font-semibold">Checkout</span>
        </nav>

        <h1 className="font-display text-3xl font-bold text-[#2C1A0E] mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left: Forms ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Shipping Address */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-[#E8D5B0]/60 p-6">
              <div className="flex items-center gap-2 mb-5">
                <MapPin size={18} className="text-[#C0522B]" />
                <h2 className="font-display text-xl font-bold text-[#2C1A0E]">Delivery Address</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name *" error={errors.fullName}>
                  <input value={addr.fullName} onChange={e => setA('fullName', e.target.value)}
                    type="text" placeholder="Aapka Naam" className={inputCls} />
                </Field>

                <Field label="Mobile Number *" error={errors.phone}>
                  <div className="flex gap-2">
                    <span className="flex items-center px-3 py-3 rounded-xl border border-[#E8D5B0] bg-white text-[#2C1A0E] text-sm font-semibold shrink-0">🇮🇳 +91</span>
                    <input value={addr.phone} onChange={e => setA('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                      type="tel" placeholder="98765 43210" className={inputCls} />
                  </div>
                </Field>

                <div className="sm:col-span-2">
                  <Field label="Email Address *" error={errors.email}>
                    <input value={addr.email} onChange={e => setA('email', e.target.value)}
                      type="email" placeholder="aap@example.com" className={inputCls} />
                  </Field>
                </div>

                <div className="sm:col-span-2">
                  <Field label="Address Line 1 *" error={errors.line1}>
                    <input value={addr.line1} onChange={e => setA('line1', e.target.value)}
                      type="text" placeholder="Flat / House No., Street, Area" className={inputCls} />
                  </Field>
                </div>

                <div className="sm:col-span-2">
                  <Field label="Address Line 2">
                    <input value={addr.line2} onChange={e => setA('line2', e.target.value)}
                      type="text" placeholder="Landmark (optional)" className={inputCls} />
                  </Field>
                </div>

                <Field label="City *" error={errors.city}>
                  <input value={addr.city} onChange={e => setA('city', e.target.value)}
                    type="text" placeholder="e.g. Jaipur" className={inputCls} />
                </Field>

                <Field label="PIN Code *" error={errors.pincode}>
                  <input value={addr.pincode} onChange={e => setA('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                    type="text" placeholder="302001" className={inputCls} />
                </Field>

                <div className="sm:col-span-2">
                  <Field label="State *" error={errors.state}>
                    <select value={addr.state} onChange={e => setA('state', e.target.value)}
                      className={inputCls + ' cursor-pointer'}>
                      <option value="">Select State</option>
                      {INDIAN_STATES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </Field>
                </div>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              className="bg-white rounded-2xl border border-[#E8D5B0]/60 p-6">
              <h2 className="font-display text-xl font-bold text-[#2C1A0E] mb-5">Payment Method</h2>

              <div className="space-y-3 mb-5">
                {PAYMENT_METHODS.map(m => (
                  <button key={m.id} type="button" onClick={() => setPayMethod(m.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                      payMethod === m.id ? 'border-[#C0522B] bg-[#C0522B]/5' : 'border-[#E8D5B0] hover:border-[#C0522B]/40'
                    }`}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${payMethod === m.id ? 'border-[#C0522B]' : 'border-[#B09070]'}`}>
                      {payMethod === m.id && <div className="w-2.5 h-2.5 rounded-full bg-[#C0522B]" />}
                    </div>
                    <span className="text-xl">{m.icon}</span>
                    <div>
                      <p className={`font-semibold text-sm ${payMethod === m.id ? 'text-[#2C1A0E]' : 'text-[#5C3317]'}`}>{m.label}</p>
                      <p className="text-xs text-[#7B5C3A]">{m.sub}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* UPI input */}
              <AnimatePresence mode="wait">
                {payMethod === 'upi' && (
                  <motion.div key="upi" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <Field label="UPI ID *" error={errors.upiId}>
                      <input value={upiId} onChange={e => setUpiId(e.target.value)}
                        type="text" placeholder="yourname@upi" className={inputCls} />
                    </Field>
                  </motion.div>
                )}

                {/* Card inputs */}
                {payMethod === 'card' && (
                  <motion.div key="card" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="space-y-4">
                    <Field label="Name on Card *" error={errors.cardName}>
                      <input value={card.name} onChange={e => setCard(c => ({ ...c, name: e.target.value }))}
                        type="text" placeholder="As printed on card" className={inputCls} />
                    </Field>
                    <Field label="Card Number *" error={errors.cardNumber}>
                      <input value={card.number} onChange={e => setCard(c => ({ ...c, number: e.target.value.replace(/\D/g, '').slice(0, 16) }))}
                        type="text" placeholder="1234 5678 9012 3456" className={inputCls} maxLength={16} />
                    </Field>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Expiry *" error={errors.cardExpiry}>
                        <input value={card.expiry} onChange={e => setCard(c => ({ ...c, expiry: e.target.value }))}
                          type="text" placeholder="MM / YY" className={inputCls} maxLength={7} />
                      </Field>
                      <Field label="CVV *" error={errors.cardCvv}>
                        <input value={card.cvv} onChange={e => setCard(c => ({ ...c, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) }))}
                          type="password" placeholder="•••" className={inputCls} maxLength={3} />
                      </Field>
                    </div>
                  </motion.div>
                )}

                {payMethod === 'cod' && (
                  <motion.div key="cod" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="bg-[#1E4D2B]/8 border border-[#1E4D2B]/20 rounded-xl p-4 text-sm text-[#1E4D2B]">
                    💵 Pay ₹{total.toLocaleString('en-IN')} in cash when your order arrives. No advance payment needed.
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Impact note */}
            <div className="flex items-start gap-3 bg-[#1E4D2B]/8 border border-[#1E4D2B]/20 rounded-2xl p-4">
              <Leaf size={18} className="text-[#1E4D2B] mt-0.5 shrink-0" />
              <p className="text-sm text-[#1E4D2B] leading-relaxed">
                आपकी खरीद <strong>{cartItems.length} karigar परिवारों</strong> को सहारा देती है। 80% of your payment goes directly to the makers.
              </p>
            </div>
          </div>

          {/* ── Right: Order Summary ── */}
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
              className="bg-white rounded-2xl border border-[#E8D5B0]/60 p-6 sticky top-24">
              <h2 className="font-display text-xl font-bold text-[#2C1A0E] mb-5">Order Summary</h2>

              {/* Product list — read-only, auto from cart */}
              <div className="space-y-3 mb-5">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover shrink-0 border border-[#E8D5B0]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#2C1A0E] line-clamp-1">{item.name}</p>
                      <p className="text-xs text-[#7B5C3A]">Qty: {item.quantity} · {item.state}</p>
                    </div>
                    <span className="text-sm font-bold text-[#2C1A0E] shrink-0">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              {/* Pricing — auto-calculated, not editable */}
              <div className="border-t border-[#E8D5B0] pt-4 space-y-2 mb-5">
                <div className="flex justify-between text-sm text-[#5C3317]">
                  <span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span className="font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm text-[#5C3317]">
                  <span>Shipping</span>
                  <span className={`font-bold ${shipping === 0 ? 'text-[#1E4D2B]' : ''}`}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-[#2C1A0E] pt-2 border-t border-[#E8D5B0]">
                  <span>Total</span>
                  <span className="font-display text-xl">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {orderError && (
                <div className="mb-3 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">{orderError}</div>
              )}
              {/* Place Order */}
              <button onClick={handlePlaceOrder} disabled={loading}
                className="flex items-center justify-center gap-2 w-full py-4 bg-[#C0522B] text-white rounded-xl font-bold hover:bg-[#9A3E1E] active:scale-[0.98] transition-all shadow-md mb-3 disabled:opacity-60">
                <Lock size={16} /> {loading ? 'Placing Order...' : 'Order Place करें'}
              </button>
              <p className="text-center text-xs text-[#7B5C3A]">🔒 100% Secure · 🇮🇳 Made in India</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
