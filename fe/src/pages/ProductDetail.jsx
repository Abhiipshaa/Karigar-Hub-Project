import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Sparkles, Leaf, ChevronRight, MessageSquare, MapPin, Award } from 'lucide-react';
import { products, artisans, reviews } from '../data/sampleData';
import ProductCard from '../components/ProductCard';
import { StarRating, Badge } from '../components/UI';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id)) || products[0];
  const artisan = artisans.find(a => a.id === product.artisanId);
  const related = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [customNote, setCustomNote] = useState('');
  const [added, setAdded] = useState(false);

  const handleAdd = () => { setAdded(true); setTimeout(() => setAdded(false), 2000); };

  return (
    <div className="min-h-screen bg-[#FDF6EC] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#7B5C3A] mb-8">
          <Link to="/" className="hover:text-[#C0522B]">Home</Link>
          <ChevronRight size={14} />
          <Link to="/products" className="hover:text-[#C0522B]">Products</Link>
          <ChevronRight size={14} />
          <span className="text-[#2C1A0E] font-medium line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <div>
            <motion.div key={activeImg} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="aspect-square rounded-3xl overflow-hidden bg-[#F5ECD8] mb-4">
              <img src={product.images?.[activeImg] || product.image} alt={product.name} className="w-full h-full object-cover" />
            </motion.div>
            {product.images?.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${i === activeImg ? 'border-[#C0522B]' : 'border-transparent'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="default">{product.category}</Badge>
              <Badge variant="terracotta"><MapPin size={10} /> {product.state}</Badge>
              {product.customizable && <Badge variant="green"><Sparkles size={10} /> Customizable</Badge>}
              {!product.inStock && <Badge variant="maroon">Sold Out</Badge>}
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-[#2C1A0E] mb-3 leading-tight">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <StarRating rating={product.rating} />
              <span className="text-sm font-bold text-[#2C1A0E]">{product.rating}</span>
              <span className="text-sm text-[#7B5C3A]">({product.reviews} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-4xl font-bold text-[#2C1A0E]">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span className="text-xl text-[#7B5C3A] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
              {product.originalPrice && (
                <span className="text-sm font-bold text-[#1E4D2B] bg-[#1E4D2B]/10 px-2 py-0.5 rounded-full">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                </span>
              )}
            </div>

            <p className="text-[#5C3317] leading-relaxed mb-5">{product.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map(tag => (
                <span key={tag} className="text-xs bg-[#E8D5B0]/60 text-[#5C3317] px-3 py-1 rounded-full">#{tag}</span>
              ))}
            </div>

            {/* Qty + Add to Cart */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-[#E8D5B0] rounded-full overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-3 text-[#5C3317] hover:bg-[#F5ECD8] transition-colors font-bold">−</button>
                <span className="px-4 py-3 font-bold text-[#2C1A0E] min-w-[3rem] text-center">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="px-4 py-3 text-[#5C3317] hover:bg-[#F5ECD8] transition-colors font-bold">+</button>
              </div>
              <button onClick={handleAdd} disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full font-bold transition-all ${
                  product.inStock
                    ? added ? 'bg-[#1E4D2B] text-white' : 'bg-[#C0522B] text-white hover:bg-[#9A3E1E] shadow-md'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}>
                <ShoppingBag size={18} />
                {added ? 'Cart में जोड़ा! ✓' : product.inStock ? 'Cart में जोड़ें' : 'Out of Stock'}
              </button>
              <button className="w-12 h-12 rounded-full border border-[#E8D5B0] flex items-center justify-center hover:border-[#C0522B] hover:text-[#C0522B] transition-colors">
                <Heart size={18} />
              </button>
            </div>

            {/* Customization */}
            {product.customizable && (
              <div className="bg-[#F5ECD8]/60 border border-[#E8D5B0] rounded-2xl p-5 mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare size={15} className="text-[#C0522B]" />
                  <h4 className="font-semibold text-[#2C1A0E] text-sm">Customization Request करें</h4>
                </div>
                <textarea value={customNote} onChange={e => setCustomNote(e.target.value)}
                  placeholder="रंग, साइज़, नाम, संदेश... (Color, size, name, message...)"
                  rows={3}
                  className="w-full text-sm bg-white border border-[#E8D5B0] rounded-xl px-4 py-3 text-[#2C1A0E] placeholder-[#7B5C3A] focus:outline-none focus:border-[#C0522B] resize-none" />
              </div>
            )}

            {/* Impact */}
            <div className="flex items-start gap-3 bg-[#1E4D2B]/8 border border-[#1E4D2B]/20 rounded-2xl p-4">
              <Leaf size={18} className="text-[#1E4D2B] mt-0.5 shrink-0" />
              <p className="text-sm text-[#1E4D2B] leading-relaxed">{product.impact}</p>
            </div>
          </div>
        </div>

        {/* Artisan Story */}
        {artisan && (
          <div className="bg-white rounded-3xl border border-[#E8D5B0]/60 p-8 mb-12">
            <h2 className="font-display text-2xl font-bold text-[#2C1A0E] mb-6">कारीगर की कहानी — Artisan Story</h2>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <img src={artisan.avatar} alt={artisan.name} className="w-20 h-20 rounded-full object-cover shrink-0 border-2 border-[#E8D5B0]" />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h3 className="font-display text-xl font-bold text-[#2C1A0E]">{artisan.name}</h3>
                  <span className="text-xs bg-[#C0522B]/10 text-[#C0522B] px-2 py-0.5 rounded-full font-semibold">{artisan.craft}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#7B5C3A] mb-3">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {artisan.city}, {artisan.state}</span>
                  <span className="flex items-center gap-1"><Award size={12} /> {artisan.experience}</span>
                </div>
                <p className="text-[#5C3317] leading-relaxed mb-4 italic font-display">"{artisan.story}"</p>
                <Link to={`/artisans/${artisan.id}`}
                  className="inline-flex items-center gap-1 text-[#C0522B] font-semibold text-sm hover:gap-2 transition-all">
                  Full Profile देखें <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Reviews */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#2C1A0E] mb-6">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reviews.map(review => (
              <div key={review.id} className="bg-white rounded-2xl border border-[#E8D5B0]/60 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <img src={review.avatar} alt={review.user} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-[#2C1A0E] text-sm">{review.user}</p>
                    <p className="text-xs text-[#7B5C3A]">{review.date}</p>
                  </div>
                </div>
                <StarRating rating={review.rating} size={12} />
                <p className="text-sm text-[#5C3317] mt-2 leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-[#2C1A0E] mb-6">आपको यह भी पसंद आ सकता है</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
