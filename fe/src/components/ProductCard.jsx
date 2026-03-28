import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, Sparkles, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toggleWishlist } from '../services/api';

export default function ProductCard({ product }) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleWishlist = async () => {
    if (!user) return;
    try {
      await toggleWishlist(product._id || product.id);
      setLiked(p => !p);
    } catch (err) {
      console.error('Wishlist error:', err);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-[#E8D5B0]/50"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-[#F5ECD8]">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#E8D5B0] to-[#F5ECD8] animate-pulse" />
        )}
        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setImgLoaded(true)}
          className="w-full h-full object-cover group-hover:scale-107 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.customizable && (
            <span className="flex items-center gap-1 bg-[#1E4D2B] text-white text-[10px] font-semibold px-2 py-1 rounded-full">
              <Sparkles size={9} /> Custom
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-[#C0522B] text-white text-[10px] font-semibold px-2 py-1 rounded-full">Sale</span>
          )}
          {!product.inStock && (
            <span className="bg-gray-600 text-white text-[10px] font-semibold px-2 py-1 rounded-full">Sold Out</span>
          )}
        </div>
        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          title={!user ? 'Sign in to save' : ''}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <Heart size={14} className={liked ? 'fill-[#C0522B] text-[#C0522B]' : 'text-[#7B5C3A]'} />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center gap-1 mb-1">
          <MapPin size={10} className="text-[#C0522B]" />
          <p className="text-[10px] text-[#C0522B] font-semibold tracking-wide uppercase">{product.state}</p>
          <span className="text-[#E8D5B0] mx-1">·</span>
          <p className="text-[10px] text-[#7B5C3A]">{product.artisan}</p>
        </div>
        <Link to={`/products/${product.id}`}>
          <h3 className="font-display text-[#2C1A0E] font-semibold text-sm leading-snug mb-2 line-clamp-2 hover:text-[#C0522B] transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-3">
          <Star size={11} className="fill-[#C9920A] text-[#C9920A]" />
          <span className="text-xs font-semibold text-[#2C1A0E]">{product.rating}</span>
          <span className="text-xs text-[#7B5C3A]">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-lg font-bold text-[#2C1A0E]">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <span className="text-xs text-[#7B5C3A] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>
          <Link to={`/products/${product.id}`} className="text-xs font-semibold text-[#C0522B] hover:text-[#9A3E1E] transition-colors">
            show →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
