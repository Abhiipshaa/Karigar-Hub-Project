import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Artisans from './pages/Artisans';
import ArtisanProfile from './pages/ArtisanProfile';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ManageProducts from './pages/ManageProducts';
import AddProduct from './pages/AddProduct';
import Wishlist from './pages/Wishlist';
import OrderConfirmation from './pages/OrderConfirmation';
import Orders from './pages/Orders';
import Terms from './pages/Terms';
import RefundPolicy from './pages/RefundPolicy';
import UserProfile from './pages/UserProfile';


const noLayoutRoutes = ['/login', '/register', '/dashboard'];  // dashboard/* also matched via startsWith

function AppLayout() {
  const location = useLocation();
  const hideLayout = noLayoutRoutes.some(r => location.pathname.startsWith(r));

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navbar cartCount={3} />}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}>
            <Routes location={location}>
              <Route path="/" element={<Landing />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/artisans" element={<Artisans />} />
              <Route path="/artisans/:id" element={<ArtisanProfile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/products" element={<ManageProducts />} />
              <Route path="/dashboard/products/add" element={<AddProduct />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-[#FDF6EC] flex items-center justify-center text-center px-4 pt-20">
      <div>
        <p className="text-6xl mb-4">🏺</p>
        <p className="font-devanagari text-[#C0522B] text-xl mb-2">यह पृष्ठ नहीं मिला</p>
        <h1 className="font-display text-4xl font-bold text-[#2C1A0E] mb-3">Page Not Found</h1>
        <p className="text-[#7B5C3A] mb-6">This page seems to have wandered off like a nomadic karigar.</p>
        <a href="/" className="inline-flex items-center gap-2 bg-[#C0522B] text-white px-8 py-3 rounded-full font-bold hover:bg-[#9A3E1E] transition-all">
          Home पर जाएं
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
