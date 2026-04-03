import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, Users, ArrowRight, CheckCircle } from 'lucide-react';

// Workshop data — Sushanta Nayak (real artist from DB)
const WORKSHOPS = [
  {
    id: 1,
    status: 'upcoming',
    artist: {
      id: '69cec0ae134b9f4f1ef6a885',
      name: 'Sushanta Nayak',
      category: 'Bamboo & Cane / Coconut Shell Crafts',
      location: 'Cuttack, Odisha',
      profileImage: 'https://res.cloudinary.com/dyb9eyyqj/image/upload/v1775157424/karigar-hub/artists/lvzjx703sq7u3ju8r6ej.jpg',
      bio: 'I have been creating coconut shell crafts for many years as a hobby I truly enjoy after work. From key rings and pen stands to decorative pieces, each creation reflects my passion for art.',
    },
    title: 'Coconut Shell Craft — From Waste to Wonder',
    description:
      'Join Sushanta Nayak from Cuttack, Odisha, as he walks you through the art of transforming discarded coconut shells into beautiful handcrafted items. In this live session, you will learn how to make a decorative pen stand and a key ring from scratch — no prior experience needed.',
    date: 'July 20, 2025',
    time: '5:00 PM – 7:00 PM IST',
    duration: '2 hours',
    seats: 30,
    seatsLeft: 12,
    mode: 'Live Online (Zoom)',
    language: 'Odia / Hindi',
    level: 'Beginner',
    whatYouLearn: [
      'Cleaning & preparing coconut shells safely',
      'Basic carving and shaping techniques',
      'Making a pen stand & key ring',
      'Finishing with natural polish',
    ],
    kitIncluded: true,
    price: 0,
  },
];

const STATUS_STYLES = {
  upcoming: { label: 'Upcoming', cls: 'bg-green-100 text-green-700 border-green-200' },
  past:     { label: 'Past',     cls: 'bg-gray-100  text-gray-600  border-gray-200'  },
  live:     { label: '🔴 Live Now', cls: 'bg-red-100 text-red-600 border-red-200'   },
};

export default function Workshops() {
  return (
    <div className="min-h-screen bg-[#FDF6EC] pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-widest text-[#C0522B] uppercase mb-2">कला सीखो, कला जियो</p>
          <h1 className="font-display text-4xl font-bold text-[#2C1A0E] mb-3">Karigar Workshops</h1>
          <p className="text-[#7B5C3A] max-w-xl mx-auto leading-relaxed">
            Learn directly from India's master karigars. Live sessions, craft kits, and a community of 50,000+ craft lovers.
          </p>
        </div>

        {/* Workshop Cards */}
        <div className="space-y-8">
          {WORKSHOPS.map((w, i) => {
            const status = STATUS_STYLES[w.status] || STATUS_STYLES.upcoming;
            return (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl border border-[#E8D5B0]/60 shadow-sm overflow-hidden"
              >
                {/* Top accent */}
                <div className="h-1.5 bg-gradient-to-r from-[#C0522B] to-[#7B1C2E]" />

                <div className="p-6 sm:p-8">

                  {/* Status + title */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${status.cls}`}>
                      {status.label}
                    </span>
                    {w.price === 0 && (
                      <span className="text-xs font-bold px-3 py-1 rounded-full border bg-[#1E4D2B]/10 text-[#1E4D2B] border-[#1E4D2B]/20">
                        FREE
                      </span>
                    )}
                    <span className="text-xs font-semibold text-[#7B5C3A] bg-[#F5ECD8] px-3 py-1 rounded-full">
                      {w.level}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl font-bold text-[#2C1A0E] mb-2">{w.title}</h2>
                  <p className="text-[#5C3317] leading-relaxed mb-6">{w.description}</p>

                  {/* Artist card */}
                  <div className="flex items-center gap-4 bg-[#FDF6EC] border border-[#E8D5B0]/60 rounded-2xl p-4 mb-6">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#E8D5B0] shrink-0 bg-[#C0522B] flex items-center justify-center text-white font-bold text-lg">
                      {w.artist.profileImage
                        ? <img src={w.artist.profileImage} alt={w.artist.name} className="w-full h-full object-cover" onError={e => { e.target.style.display = 'none'; }} />
                        : w.artist.name[0]
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-[#2C1A0E]">{w.artist.name}</p>
                      <p className="text-xs text-[#C0522B] font-semibold">{w.artist.category}</p>
                      <div className="flex items-center gap-1 text-xs text-[#7B5C3A] mt-0.5">
                        <MapPin size={10} className="text-[#C0522B]" />
                        <span>{w.artist.location}</span>
                      </div>
                    </div>
                    <Link to={`/artisans/${w.artist.id}`}
                      className="text-xs font-semibold text-[#C0522B] hover:text-[#9A3E1E] transition-colors whitespace-nowrap flex items-center gap-1">
                      Profile <ArrowRight size={12} />
                    </Link>
                  </div>

                  {/* Session details grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {[
                      { icon: Calendar, label: 'Date',     value: w.date },
                      { icon: Clock,    label: 'Time',     value: w.time },
                      { icon: Users,    label: 'Seats Left', value: `${w.seatsLeft} / ${w.seats}` },
                      { icon: MapPin,   label: 'Mode',     value: w.mode },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="bg-[#F5ECD8] rounded-xl p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Icon size={12} className="text-[#C0522B]" />
                          <p className="text-[10px] font-bold text-[#7B5C3A] uppercase tracking-wide">{label}</p>
                        </div>
                        <p className="text-xs font-semibold text-[#2C1A0E] leading-tight">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* What you'll learn */}
                  <div className="mb-6">
                    <p className="text-sm font-bold text-[#2C1A0E] mb-3">What you'll learn</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {w.whatYouLearn.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-[#5C3317]">
                          <CheckCircle size={14} className="text-[#1E4D2B] mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Extra info */}
                  <div className="flex flex-wrap gap-3 mb-6 text-xs text-[#7B5C3A]">
                    <span className="bg-[#F5ECD8] px-3 py-1.5 rounded-full font-semibold">🗣 {w.language}</span>
                    <span className="bg-[#F5ECD8] px-3 py-1.5 rounded-full font-semibold">⏱ {w.duration}</span>
                    {w.kitIncluded && <span className="bg-[#F5ECD8] px-3 py-1.5 rounded-full font-semibold">📦 Craft kit included</span>}
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#C0522B] text-white rounded-full font-bold hover:bg-[#9A3E1E] transition-all shadow-md">
                      Join Now <ArrowRight size={16} />
                    </button>
                    <Link to={`/artisans/${w.artist.id}`}
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 border-2 border-[#C0522B] text-[#C0522B] rounded-full font-bold hover:bg-[#C0522B] hover:text-white transition-all">
                      Meet the Karigar
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Coming soon note */}
        <div className="mt-10 text-center bg-white border border-[#E8D5B0]/60 rounded-2xl p-6">
          <p className="text-2xl mb-2">🎨</p>
          <p className="font-display text-lg font-bold text-[#2C1A0E] mb-1">More workshops coming soon</p>
          <p className="text-sm text-[#7B5C3A]">We are onboarding more karigars for upcoming sessions. Stay tuned!</p>
        </div>
      </div>
    </div>
  );
}
