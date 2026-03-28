import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Package, Award } from 'lucide-react';

export default function ArtisanCard({ artisan }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-[#E8D5B0]/50"
    >
      {/* Cover */}
      <div className="relative h-36 overflow-hidden bg-[#F5ECD8]">
        <img
          src={artisan.coverImage}
          alt={artisan.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E0E06]/60 to-transparent" />
        <div className="absolute bottom-3 left-4">
          <span className="text-[10px] bg-[#C0522B] text-white px-2 py-0.5 rounded-full font-semibold tracking-wide">
            {artisan.state}
          </span>
        </div>
      </div>

      {/* Avatar + Info */}
      <div className="px-5 pb-5">
        <div className="-mt-8 mb-3">
          <img
            src={artisan.avatar}
            alt={artisan.name}
            className="w-16 h-16 rounded-full border-[3px] border-white object-cover shadow-md"
          />
        </div>
        <h3 className="font-display text-[#2C1A0E] font-bold text-base mb-0.5">{artisan.name}</h3>
        <p className="text-xs text-[#C0522B] font-semibold mb-1">{artisan.craft}</p>
        <div className="flex items-center gap-1 text-xs text-[#7B5C3A] mb-3">
          <MapPin size={10} />
          <span>{artisan.city}, {artisan.state}</span>
          <span className="mx-1">·</span>
          <Award size={10} />
          <span>{artisan.experience}</span>
        </div>
        <p className="text-xs text-[#5C3317] leading-relaxed line-clamp-2 mb-4">{artisan.bio}</p>
        <div className="flex items-center justify-between text-xs text-[#7B5C3A] mb-4">
          <div className="flex items-center gap-1">
            <Star size={11} className="fill-[#C9920A] text-[#C9920A]" />
            <span className="font-bold text-[#2C1A0E]">{artisan.rating}</span>
            <span>({artisan.reviews})</span>
          </div>
          <div className="flex items-center gap-1">
            <Package size={10} />
            <span>{artisan.products} products</span>
          </div>
        </div>
        <Link
          to={`/artisans/${artisan.id}`}
          className="block w-full text-center py-2.5 rounded-full border border-[#C0522B] text-[#C0522B] text-sm font-semibold hover:bg-[#C0522B] hover:text-white transition-all"
        >
          Profile देखें
        </Link>
      </div>
    </motion.div>
  );
}
