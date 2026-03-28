import { Link } from 'react-router-dom';
import { Mail, MapPin, Share2, AtSign, Globe2 } from 'lucide-react';

const footerLinks = {
  'Shop': [
    { label: 'All Products', to: '/products' },
    { label: 'Handloom & Sarees', to: '/products?category=Handloom' },
    { label: 'Jewellery', to: '/products?category=Jewellery' },
    { label: 'Pottery & Decor', to: '/products?category=Pottery' },
    { label: 'Paintings', to: '/products?category=Paintings' },
    { label: 'Festive Items', to: '/products?category=Festive+Items' },
  ],
  'Karigars': [
    { label: 'Meet Artisans', to: '/artisans' },
    { label: 'Become a Karigar', to: '/register?type=artisan' },
    { label: 'Karigar Dashboard', to: '/dashboard' },
    { label: 'Success Stories', to: '/' },
  ],
  'Shop by State': [
    { label: 'Odisha', to: '/products' },
    { label: 'Rajasthan', to: '/products' },
    { label: 'West Bengal', to: '/products' },
    { label: 'Gujarat', to: '/products' },
    { label: 'Uttar Pradesh', to: '/products' },
    { label: 'Bihar', to: '/products' },
    { label: 'Assam', to: '/products' },
    { label: 'Kashmir', to: '/products' },
    { label: 'Maharashtra', to: '/products' },
    { label: 'Tamil Nadu', to: '/products' },
    { label: 'Kerala', to: '/products' },
    { label: 'Karnataka', to: '/products' },
    { label: 'Andhra Pradesh', to: '/products' },
    { label: 'Telangana', to: '/products' },
    { label: 'Madhya Pradesh', to: '/products' },
    { label: 'Punjab', to: '/products' },
    { label: 'Himachal Pradesh', to: '/products' },
    { label: 'Uttarakhand', to: '/products' },
    { label: 'Jharkhand', to: '/products' },
    { label: 'Chhattisgarh', to: '/products' },
    { label: 'Manipur', to: '/products' },
    { label: 'Nagaland', to: '/products' },
    { label: 'Meghalaya', to: '/products' },
    { label: 'Tripura', to: '/products' },
    { label: 'Mizoram', to: '/products' },
    { label: 'Arunachal Pradesh', to: '/products' },
    { label: 'Sikkim', to: '/products' },
    { label: 'Goa', to: '/products' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#1E0E06] text-[#E8D5B0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#C0522B] flex items-center justify-center text-white font-bold font-display">क</div>
              <div>
                <span className="font-display text-lg font-bold text-white block">Karigar Hub</span>
                <span className="text-[10px] tracking-widest text-[#C0522B]">BHARAT KA HUNAR</span>
              </div>
            </div>
            <p className="text-sm text-[#B8A080] leading-relaxed mb-5 max-w-xs">
              भारत के हुनर को घर घर तक। A premium marketplace celebrating India's living craft heritage — connecting skilled karigars with conscious buyers.
            </p>
            <div className="flex items-center gap-1.5 text-sm text-[#B8A080] mb-2">
              <MapPin size={13} className="text-[#C0522B]" />
              <span>Artisans from 28 Indian states</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-[#B8A080]">
              <Mail size={13} className="text-[#C0522B]" />
              <span>namaste@karigarhub.in</span>
            </div>
            <div className="flex gap-3 mt-5">
              {[Share2, AtSign, Globe2].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C0522B] transition-colors">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4 tracking-wide">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-[#B8A080] hover:text-[#C0522B] transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-white font-semibold mb-1">हमारे साथ जुड़ें — Join Our Community</p>
              <p className="text-sm text-[#B8A080]">Artisan stories, new arrivals, and festival collections in your inbox.</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input type="email" placeholder="aapka@email.com"
                className="flex-1 sm:w-60 px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-[#B8A080] text-sm focus:outline-none focus:border-[#C0522B]" />
              <button className="px-5 py-2.5 bg-[#C0522B] text-white rounded-full text-sm font-semibold hover:bg-[#9A3E1E] transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#B8A080]">
          <p>© 2025 Karigar Hub. Made with ❤️ for Bharat's Karigars.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#C0522B] transition-colors">Privacy Policy</a>
            <Link to="/terms" className="hover:text-[#C0522B] transition-colors">Terms &amp; Conditions</Link>
            <Link to="/refund-policy" className="hover:text-[#C0522B] transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
