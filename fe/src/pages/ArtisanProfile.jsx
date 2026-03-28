import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Package, ShoppingBag, Share2, Calendar, Award, Users } from 'lucide-react';
import { artisans, products } from '../data/sampleData';
import ProductCard from '../components/ProductCard';
import { StarRating } from '../components/UI';

export default function ArtisanProfile() {
  const { id } = useParams();
  const artisan = artisans.find(a => a.id === Number(id)) || artisans[0];
  const artisanProducts = products.filter(p => p.artisanId === artisan.id);

  return (
    <div className="min-h-screen bg-[#FDF6EC] pt-20 pb-16">
      {/* Cover */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={artisan.coverImage} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E0E06]/75 to-transparent" />
        <div className="absolute bottom-6 left-6">
          <span className="bg-[#C0522B] text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-wide">
            🇮🇳 {artisan.state}
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="relative -mt-16 mb-8">
          <div className="bg-white rounded-3xl border border-[#E8D5B0]/60 p-6 md:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <img src={artisan.avatar} alt={artisan.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg shrink-0" />
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h1 className="font-display text-3xl md:text-4xl font-bold text-[#2C1A0E] mb-1">{artisan.name}</h1>
                    <p className="text-[#C0522B] font-bold mb-2">{artisan.craft}</p>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-[#7B5C3A] mb-3">
                      <span className="flex items-center gap-1"><MapPin size={13} /> {artisan.city}, {artisan.state}</span>
                      <span className="flex items-center gap-1"><Award size={13} /> {artisan.experience} experience</span>
                      <span className="flex items-center gap-1"><Calendar size={13} /> Since {artisan.joined}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {artisan.specialties.map(s => (
                        <span key={s} className="text-xs bg-[#E8D5B0]/60 text-[#5C3317] px-3 py-1 rounded-full">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <a href="#" className="w-10 h-10 rounded-full bg-[#F5ECD8] flex items-center justify-center text-[#5C3317] hover:bg-[#C0522B] hover:text-white transition-colors">
                      <Share2 size={15} />
                    </a>
                    <Link to="/products"
                      className="flex items-center gap-2 bg-[#C0522B] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#9A3E1E] transition-all">
                      <ShoppingBag size={14} /> Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#E8D5B0]/60">
              {[
                { label: 'Rating', value: artisan.rating, icon: '⭐' },
                { label: 'Reviews', value: artisan.reviews, icon: '💬' },
                { label: 'Products', value: artisan.products, icon: '🎨' },
                { label: 'Happy Buyers', value: artisan.sales.toLocaleString('en-IN'), icon: '🛍️' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-xl mb-0.5">{stat.icon}</p>
                  <p className="font-display text-xl font-bold text-[#2C1A0E]">{stat.value}</p>
                  <p className="text-xs text-[#7B5C3A]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Story + Social Proof */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-white rounded-3xl border border-[#E8D5B0]/60 p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold text-[#2C1A0E] mb-2">मेरी कहानी — My Story</h2>
            <p className="text-[#5C3317] leading-relaxed mb-5">{artisan.bio}</p>
            <blockquote className="border-l-4 border-[#C0522B] pl-4 font-display italic text-[#7B5C3A] text-lg">
              "{artisan.story}"
            </blockquote>
            <div className="mt-6 p-4 bg-[#F5ECD8]/60 rounded-2xl border border-[#E8D5B0]/60">
              <h4 className="font-semibold text-[#2C1A0E] text-sm mb-2">🏛️ Craft Heritage</h4>
              <p className="text-sm text-[#5C3317] leading-relaxed">
                {artisan.craft} is a traditional Indian art form from {artisan.state}. This craft has been practiced for generations and is recognized as part of India's intangible cultural heritage.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#C0522B] to-[#7B1C2E] rounded-3xl p-6 text-white">
            <h3 className="font-display text-xl font-bold mb-4">Social Proof</h3>
            <div className="space-y-4">
              <div className="bg-white/15 rounded-2xl p-4">
                <StarRating rating={artisan.rating} />
                <p className="text-2xl font-bold mt-1">{artisan.rating}/5.0</p>
                <p className="text-white/75 text-sm">Based on {artisan.reviews} reviews</p>
              </div>
              <div className="bg-white/15 rounded-2xl p-4">
                <p className="text-3xl font-bold">{artisan.sales.toLocaleString('en-IN')}</p>
                <p className="text-white/75 text-sm">Happy customers across India</p>
              </div>
              <div className="bg-white/15 rounded-2xl p-4">
                <p className="text-lg font-bold">✅ Verified Karigar</p>
                <p className="text-white/75 text-sm">Member since {artisan.joined}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div>
          <h2 className="font-display text-2xl font-bold text-[#2C1A0E] mb-6">
            {artisan.name.split(' ')[0]} जी का संग्रह — Collection
          </h2>
          {artisanProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {artisanProducts.map((product, i) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-[#7B5C3A] text-center py-12">No products listed yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
