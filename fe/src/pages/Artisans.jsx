import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getArtisans } from '../services/api';
import { artisans as sampleArtisans } from '../data/sampleData';
import ArtisanCard from '../components/ArtisanCard';
import { SectionHeader } from '../components/UI';

export default function Artisans() {
  // API integrated here
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getArtisans()
      .then(data => {
        // API integrated here — fallback to sampleData if DB is empty
        const list = Array.isArray(data) && data.length > 0 ? data : sampleArtisans;
        setArtisans(list);
      })
      .catch(() => setArtisans(sampleArtisans))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#FDF6EC] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="The Makers" hindi="हमारे कारीगर"
          title="Meet India's Master Karigars"
          subtitle="Verified craftspeople from across India, each with a unique story and extraordinary skill passed down through generations." />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#E8D5B0]/50 overflow-hidden animate-pulse">
                <div className="h-40 bg-[#E8D5B0]" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-[#E8D5B0] rounded w-1/2" />
                  <div className="h-3 bg-[#E8D5B0] rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">⚠️</p>
            <p className="text-[#7B5C3A]">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {artisans.map((artisan, i) => (
              <motion.div key={artisan._id || artisan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <ArtisanCard artisan={{ ...artisan, id: artisan._id || artisan.id, state: artisan.address?.state || artisan.state, city: artisan.address?.city || artisan.city, craft: artisan.category || artisan.craft }} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
