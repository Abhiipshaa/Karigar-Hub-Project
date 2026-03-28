import kashmirImage from '../assets/Kashmir.webp';
import odishaImage from '../assets/Odisha.jpeg';
import rajasthanImage from '../assets/Rajasthan.jpeg';
import westBengalImage from '../assets/WestBengal.jpg';
import gujaratImage from '../assets/Gujart.jpeg';
import uttarPradeshImage from '../assets/up.webp';
import biharImage from '../assets/Bihar.webp';
import assamImage from '../assets/assam.jpg';
import maharashtraImage from '../assets/Maharastra.webp';
import tamilNaduImage from '../assets/TamilNadu.jpg';
import keralaImage from '../assets/kerala.jpg';
import karnatakaImage from '../assets/Karnataka.jpg';
import andhraPradeshImage from '../assets/andhara.webp';
import telanganaImage from '../assets/Telengana.jpg';
import punjabImage from '../assets/punjab.jpg';
import madhyaPradeshImage from '../assets/madhya pradesh.jpeg';
import chhattisgarghImage from '../assets/chhatisgarh.jpeg';
import manipurImage from '../assets/manipur.jpeg';
import nagalandImage from '../assets/nagaland.jpg';
import meghalayaImage from '../assets/meghalaya.jpg';
import tripuraImage from '../assets/Tripura.jpg';
import mizoramImage from '../assets/mizoram.jpg';
import goaImage from '../assets/Goa.jpg';
import himachalImage from '../assets/himachal.jpeg';
import arunachalImage from '../assets/arunachal.jpeg';
import sikkimImage from '../assets/sikim.jpeg';
import uttarakhandImage from '../assets/UTTARKHAND.jpg';
import jharkhandImage from '../assets/Jharkhand.jpeg';

// Category images
import handloomImage from '../assets/handloom.jpeg';
import jewelleryImage from '../assets/jwellary.jpeg';
import potteryImage from '../assets/Pottery.jpeg';
import homeDecorImage from '../assets/Home decor.jpeg';
import paintingsImage from '../assets/Paintings.jpeg';
import festiveItemsImage from '../assets/festive items.jpeg';
import woodenCraftsImage from '../assets/Wooden Crafts.jpeg';
import giftsImage from '../assets/Gifts.jpeg';

// Product images
import sambalpuriSareeImage from '../assets/Sambalpuri saree.jpeg';
import vaseSetImage from '../assets/Vase set.jpeg';
import dokraArtImage from '../assets/Dokra Art.jpeg';
import pattachitraArtImage from '../assets/Pattachitra art.jpeg';
import chikankariKurtaImage from '../assets/Chikankari kurta.jpg';
import madhubaniPaintingImage from '../assets/Madhubani painting.jpeg';
import brassDiyaImage from '../assets/Brass diya.jpeg';
import dokraJhumkaImage from '../assets/dokra jhumka.webp';
import handblockBedsheetImage from '../assets/Handblock bedsheet.jpg';
import terracottaPlanterImage from '../assets/terracotta pot.jpg';

// ─── Categories ───────────────────────────────────────────────────────────────
export const categories = [
  { id: 1, name: 'Handloom', hindi: 'हैंडलूम',  count: 312, image: handloomImage },
  { id: 2, name: 'Jewellery', hindi: 'आभूषण',  count: 248, image: jewelleryImage },
  { id: 3, name: 'Pottery', hindi: 'मिट्टी के बर्तन',  count: 176, image: potteryImage },
  { id: 4, name: 'Home Decor', hindi: 'घर की सजावट',  count: 289, image: homeDecorImage },
  { id: 5, name: 'Paintings', hindi: 'चित्रकला', count: 143, image: paintingsImage },
  { id: 6, name: 'Festive Items', hindi: 'त्योहार',  count: 198, image: festiveItemsImage },
  { id: 7, name: 'Wooden Crafts', hindi: 'लकड़ी के शिल्प',  count: 134, image: woodenCraftsImage },
  { id: 8, name: 'Gifts', hindi: 'उपहार',  count: 221, image: giftsImage },
];

// ─── States ───────────────────────────────────────────────────────────────────
export const states = [
  { name: 'Odisha', craft: 'Pattachitra & Sambalpuri', image: odishaImage, products: 142 },
  { name: 'Rajasthan', craft: 'Blue Pottery & Block Print', image: rajasthanImage, products: 218 },
  { name: 'West Bengal', craft: 'Dokra & Kantha', image: westBengalImage, products: 167 },
  { name: 'Gujarat', craft: 'Bandhani & Patola', image: gujaratImage, products: 193 },
  { name: 'Uttar Pradesh', craft: 'Chikankari & Brass', image: uttarPradeshImage, products: 156 },
  { name: 'Bihar', craft: 'Madhubani & Sikki', image: biharImage, products: 98 },
  { name: 'Assam', craft: 'Muga Silk & Cane', image: assamImage, products: 87 },
  { name: 'Kashmir', craft: 'Pashmina & Papier-mâché', image: kashmirImage, products: 124 },
  { name: 'Maharashtra', craft: 'Paithani & Warli', image: maharashtraImage, products: 178 },
  { name: 'Tamil Nadu', craft: 'Kanjivaram & Tanjore', image: tamilNaduImage, products: 203 },
  { name: 'Kerala', craft: 'Kasavu & Aranmula Metal', image: keralaImage, products: 134 },
  { name: 'Karnataka', craft: 'Bidriware & Mysore Silk', image: karnatakaImage, products: 119 },
  { name: 'Andhra Pradesh', craft: 'Kalamkari & Kondapalli', image: andhraPradeshImage, products: 96 },
  { name: 'Telangana', craft: 'Pochampally Ikat & Nirmal', image: telanganaImage, products: 88 },
  { name: 'Madhya Pradesh', craft: 'Chanderi & Gond Art', image: madhyaPradeshImage, products: 112 },
  { name: 'Punjab', craft: 'Phulkari & Jutti', image: punjabImage, products: 104 },
  { name: 'Himachal Pradesh', craft: 'Kullu Shawl & Thangka', image: himachalImage, products: 76 },
  { name: 'Uttarakhand', craft: 'Aipan & Ringal Craft', image: uttarakhandImage, products: 65 },
  { name: 'Jharkhand', craft: 'Sohrai & Dokra', image: jharkhandImage, products: 72 },
  { name: 'Chhattisgarh', craft: 'Dhokra & Bell Metal', image: chhattisgarghImage, products: 58 },
  { name: 'Manipur', craft: 'Moirang Phee & Longpi', image: manipurImage, products: 49 },
  { name: 'Nagaland', craft: 'Naga Shawl & Wood Carving', image: nagalandImage, products: 43 },
  { name: 'Meghalaya', craft: 'Cane & Bamboo Craft', image: meghalayaImage, products: 38 },
  { name: 'Tripura', craft: 'Rignai Weave & Bamboo', image: tripuraImage, products: 34 },
  { name: 'Mizoram', craft: 'Puan Weave & Bamboo', image: mizoramImage, products: 29 },
  { name: 'Arunachal Pradesh', craft: 'Thangka & Woven Textiles', image: arunachalImage, products: 31 },
  { name: 'Sikkim', craft: 'Thangka Painting & Carpet', image: sikkimImage, products: 27 },
  { name: 'Goa', craft: 'Azulejo Tiles & Cashew Art', image: goaImage, products: 52 },
];

// ─── Festivals ────────────────────────────────────────────────────────────────
export const festivals = [
  { name: 'Diwali Gifting',  desc: 'Diyas, brass decor, festive hampers', color: 'from-amber-600 to-yellow-500' },
  { name: 'Rakhi Specials',  desc: 'Handmade rakhis & gift sets', color: 'from-rose-600 to-pink-500' },
  { name: 'Wedding Collection', desc: 'Bridal jewellery, sarees & decor', color: 'from-red-700 to-rose-600' },
  { name: 'Housewarming',  desc: 'Terracotta, brass & wooden gifts', color: 'from-green-700 to-emerald-600' },
  { name: 'Return Gifts',  desc: 'Handmade personalised gifts', color: 'from-purple-700 to-violet-600' },
];

// ─── Artisans ─────────────────────────────────────────────────────────────────
export const artisans = [
  {
    id: 1,
    name: 'Sunita Devi',
    state: 'Bihar',
    city: 'Madhubani',
    craft: 'Madhubani Painting',
    experience: '22 years',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80',
    coverImage: paintingsImage,
    bio: 'I am a third-generation Madhubani artist from Mithila. My paintings tell stories of gods, nature, and village life using natural colours made from flowers and minerals.',
    story: 'My grandmother taught me to paint on mud walls during festivals. Today I paint on canvas and silk, keeping our 2,500-year-old tradition alive.',
    rating: 4.9, reviews: 287, products: 43, sales: 1620, joined: '2020',
    specialties: ['Madhubani', 'Mithila Art', 'Natural Colours', 'Silk Painting'],
    featured: true,
  },
  {
    id: 2,
    name: 'Ramesh Prajapati',
    state: 'Rajasthan',
    city: 'Jaipur',
    craft: 'Blue Pottery',
    experience: '18 years',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
    coverImage: potteryImage,
    bio: 'Blue pottery is not just my craft — it is my identity. Using quartz stone paste and Persian-inspired cobalt blue designs, I create pieces that carry 400 years of Jaipur heritage.',
    story: 'I learned from my father in our small workshop near Jaipur\'s old city. Every piece takes 3 days to make and no two are ever the same.',
    rating: 4.8, reviews: 341, products: 58, sales: 2140, joined: '2019',
    specialties: ['Blue Pottery', 'Quartz Paste', 'Cobalt Glaze', 'Vases & Tiles'],
    featured: true,
  },
  {
    id: 3,
    name: 'Meera Mahato',
    state: 'West Bengal',
    city: 'Bankura',
    craft: 'Dokra Metal Craft',
    experience: '15 years',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&q=80',
    coverImage: dokraArtImage,
    bio: 'Dokra is one of India\'s oldest metal casting traditions — over 4,000 years old. I use the lost-wax casting method to create tribal jewellery and figurines that carry the soul of Bengal.',
    story: 'As a woman in a craft dominated by men, I broke barriers to master Dokra. My pieces are now sold across India and exported to 12 countries.',
    rating: 4.9, reviews: 198, products: 36, sales: 980, joined: '2021',
    specialties: ['Dokra Jewellery', 'Lost-wax Casting', 'Tribal Figurines', 'Brass Art'],
    featured: true,
  },
  {
    id: 4,
    name: 'Pradeep Mohanty',
    state: 'Odisha',
    city: 'Puri',
    craft: 'Pattachitra Painting',
    experience: '25 years',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80',
    coverImage: pattachitraArtImage,
    bio: 'Pattachitra is the sacred scroll painting of Odisha, depicting stories of Lord Jagannath and Hindu mythology. I use natural colours made from conch shells, stones, and lamp black.',
    story: 'My family has been painting Pattachitra for 12 generations. Each painting takes weeks to complete and every brushstroke is a prayer.',
    rating: 5.0, reviews: 156, products: 29, sales: 743, joined: '2020',
    specialties: ['Pattachitra', 'Natural Pigments', 'Mythology', 'Cloth Painting'],
    featured: false,
  },
  {
    id: 5,
    name: 'Fatima Begum',
    state: 'Uttar Pradesh',
    city: 'Lucknow',
    craft: 'Chikankari Embroidery',
    experience: '20 years',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80',
    coverImage: chikankariKurtaImage,
    bio: 'Chikankari is the soul of Lucknow — delicate white thread embroidery on fine muslin. I lead a cooperative of 40 women artisans who embroider kurtas, sarees, and dupattas.',
    story: 'I started embroidering at age 8. Today my cooperative provides livelihood to 40 women in my mohalla. Chikankari is our identity and our strength.',
    rating: 4.7, reviews: 224, products: 51, sales: 1380, joined: '2020',
    specialties: ['Chikankari', 'Muslin', 'Kurtas', 'Sarees'],
    featured: false,
  },
];

// ─── Products ─────────────────────────────────────────────────────────────────
export const products = [
  {
    id: 1,
    name: 'Handwoven Sambalpuri Saree',
    artisan: 'Sunita Devi',
    artisanId: 1,
    state: 'Odisha',
    category: 'Handloom',
    price: 3200,
    originalPrice: 4000,
    rating: 4.9,
    reviews: 124,
    image: sambalpuriSareeImage,
    images: [
      sambalpuriSareeImage,
      sambalpuriSareeImage,
      sambalpuriSareeImage,
    ],
    description: 'Authentic handwoven Sambalpuri saree from Odisha with traditional ikat patterns. Made on a pit loom using pure cotton yarn. Each saree takes 7–10 days to weave.',
    customizable: true,
    inStock: true,
    tags: ['handloom', 'ikat', 'cotton', 'odisha'],
    impact: 'आपकी खरीद ओडिशा के एक बुनकर परिवार को सहारा देती है। Your purchase supports a handloom weaver family in Odisha.',
    featured: true,
  },
  {
    id: 2,
    name: 'Blue Pottery Vase Set',
    artisan: 'Ramesh Prajapati',
    artisanId: 2,
    state: 'Rajasthan',
    category: 'Pottery',
    price: 1850,
    originalPrice: null,
    rating: 4.8,
    reviews: 89,
    image: vaseSetImage,
    images: [
      vaseSetImage,
      vaseSetImage,
    ],
    description: 'Set of 2 hand-painted Blue Pottery vases from Jaipur. Made with quartz stone paste and decorated with traditional Persian-inspired floral motifs in cobalt blue.',
    customizable: false,
    inStock: true,
    tags: ['blue pottery', 'jaipur', 'quartz', 'vase'],
    impact: 'Supports a 4th-generation Blue Pottery family in Jaipur\'s old city.',
    featured: true,
  },
  {
    id: 3,
    name: 'Dokra Tribal Necklace',
    artisan: 'Meera Mahato',
    artisanId: 3,
    state: 'West Bengal',
    category: 'Jewellery',
    price: 1200,
    originalPrice: 1500,
    rating: 4.9,
    reviews: 67,
    image: dokraArtImage,
    images: [
      dokraArtImage,
      dokraArtImage,
    ],
    description: 'Handcrafted Dokra necklace using the ancient lost-wax casting technique. Features tribal motifs of peacocks and elephants. Each piece is unique — no two are identical.',
    customizable: true,
    inStock: true,
    tags: ['dokra', 'tribal', 'brass', 'necklace'],
    impact: 'Empowers women Dokra artisans in Bankura, West Bengal.',
    featured: true,
  },
  {
    id: 4,
    name: 'Pattachitra Painting on Cloth',
    artisan: 'Pradeep Mohanty',
    artisanId: 4,
    state: 'Odisha',
    category: 'Paintings',
    price: 2800,
    originalPrice: null,
    rating: 5.0,
    reviews: 43,
    image: pattachitraArtImage,
    images: [
      pattachitraArtImage,
      pattachitraArtImage,
    ],
    description: 'Original Pattachitra painting on treated cloth depicting the Dashavatara (10 avatars of Vishnu). Made with natural colours from conch shells, stones, and lamp black. Signed by the artist.',
    customizable: false,
    inStock: true,
    tags: ['pattachitra', 'natural colours', 'mythology', 'odisha'],
    impact: 'Preserves a 12-generation Pattachitra tradition in Puri, Odisha.',
    featured: true,
  },
  {
    id: 5,
    name: 'Chikankari Kurta (White)',
    artisan: 'Fatima Begum',
    artisanId: 5,
    state: 'Uttar Pradesh',
    category: 'Handloom',
    price: 1650,
    originalPrice: 2000,
    rating: 4.7,
    reviews: 112,
    image: chikankariKurtaImage,
    images: [chikankariKurtaImage],
    description: 'Hand-embroidered Chikankari kurta on fine white muslin. Features delicate shadow work and phanda stitches. Embroidered by skilled women artisans in Lucknow.',
    customizable: true,
    inStock: true,
    tags: ['chikankari', 'lucknow', 'muslin', 'kurta'],
    impact: 'Supports 40 women embroiderers in Lucknow\'s Chikankari cooperative.',
    featured: false,
  },
  {
    id: 6,
    name: 'Madhubani Wall Art (Large)',
    artisan: 'Sunita Devi',
    artisanId: 1,
    state: 'Bihar',
    category: 'Paintings',
    price: 3500,
    originalPrice: null,
    rating: 4.9,
    reviews: 58,
    image: madhubaniPaintingImage,
    images: [madhubaniPaintingImage],
    description: 'Large Madhubani painting (24"×36") on handmade paper depicting the Ardhanarishvara — the divine union of Shiva and Parvati. Made with natural mineral colours.',
    customizable: true,
    inStock: true,
    tags: ['madhubani', 'mithila', 'natural colours', 'wall art'],
    impact: 'Supports a Madhubani artist family in Mithila, Bihar.',
    featured: false,
  },
  {
    id: 7,
    name: 'Brass Diya Set (Diwali Special)',
    artisan: 'Ramesh Prajapati',
    artisanId: 2,
    state: 'Rajasthan',
    category: 'Festive Items',
    price: 890,
    originalPrice: 1100,
    rating: 4.8,
    reviews: 203,
    image: brassDiyaImage,
    images: [brassDiyaImage],
    description: 'Set of 5 hand-engraved brass diyas with intricate floral patterns. Perfect for Diwali, puja, and home decor. Each diya is hand-finished and polished.',
    customizable: true,
    inStock: true,
    tags: ['brass', 'diya', 'diwali', 'festive'],
    impact: 'Supports brass artisan families in Moradabad, UP.',
    featured: false,
  },
  {
    id: 8,
    name: 'Handmade Dokra Jhumkas',
    artisan: 'Meera Mahato',
    artisanId: 3,
    state: 'West Bengal',
    category: 'Jewellery',
    price: 680,
    originalPrice: null,
    rating: 4.7,
    reviews: 145,
    image: dokraJhumkaImage,
    images: [dokraJhumkaImage],
    description: 'Traditional Dokra jhumka earrings with peacock motifs. Cast using the 4,000-year-old lost-wax technique. Lightweight and perfect for ethnic wear.',
    customizable: true,
    inStock: true,
    tags: ['dokra', 'jhumka', 'earrings', 'tribal'],
    impact: 'Empowers women Dokra artisans in Bankura.',
    featured: false,
  },
  {
    id: 9,
    name: 'Block Print Cotton Bedsheet',
    artisan: 'Ramesh Prajapati',
    artisanId: 2,
    state: 'Rajasthan',
    category: 'Home Decor',
    price: 1450,
    originalPrice: 1800,
    rating: 4.6,
    reviews: 78,
    image: handblockBedsheetImage,
    images: [handblockBedsheetImage],
    description: 'Hand block-printed double bedsheet in 100% cotton with traditional Sanganeri floral motifs. Printed using hand-carved wooden blocks and natural vegetable dyes.',
    customizable: false,
    inStock: true,
    tags: ['block print', 'sanganeri', 'cotton', 'bedsheet'],
    impact: 'Supports block print artisans in Sanganer, Rajasthan.',
    featured: false,
  },
  {
    id: 10,
    name: 'Terracotta Planter Set',
    artisan: 'Ramesh Prajapati',
    artisanId: 2,
    state: 'Rajasthan',
    category: 'Home Decor',
    price: 750,
    originalPrice: null,
    rating: 4.5,
    reviews: 92,
    image: terracottaPlanterImage,
    images: [terracottaPlanterImage],
    description: 'Set of 3 hand-painted terracotta planters with traditional Rajasthani motifs. Eco-friendly, unglazed, and perfect for succulents and small plants.',
    customizable: true,
    inStock: false,
    tags: ['terracotta', 'planter', 'eco-friendly', 'rajasthan'],
    impact: 'Supports terracotta potters in rural Rajasthan.',
    featured: false,
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const testimonials = [
  {
    id: 1,
    name: 'Ananya Sharma',
    city: 'Delhi',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
    text: 'I ordered a Madhubani painting for my living room and it arrived beautifully packed with a handwritten note from Sunita ji. You can feel the soul in every brushstroke. Karigar Hub is truly special.',
    product: 'Madhubani Wall Art',
    rating: 5,
  },
  {
    id: 2,
    name: 'Vikram Nair',
    city: 'Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    text: 'Gifted my mother a Sambalpuri saree for her birthday. She was moved to tears. The quality is exceptional and knowing it was handwoven by a real artisan makes it priceless.',
    product: 'Sambalpuri Saree',
    rating: 5,
  },
  {
    id: 3,
    name: 'Priya Menon',
    city: 'Mumbai',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80',
    text: 'The Dokra jhumkas I bought are absolutely stunning. So many compliments! I love that I can read the artisan\'s story and know exactly who made my jewellery.',
    product: 'Dokra Jhumkas',
    rating: 5,
  },
];

// ─── Stats ────────────────────────────────────────────────────────────────────
export const stats = [
  { label: 'Karigars Supported', value: 3200, suffix: '+' },
  { label: 'Products Sold', value: 62000, suffix: '+' },
  { label: 'States Covered', value: 28, suffix: '' },
  { label: 'Families Impacted', value: 11000, suffix: '+' },
];

// ─── How It Works ─────────────────────────────────────────────────────────────
export const howItWorks = [
  { step: '01', title: 'Discover', subtitle: 'Khojo', description: 'Browse thousands of authentic handmade products from verified Indian artisans across 28 states.', icon: '🔍' },
  { step: '02', title: 'Choose', subtitle: 'Chuniye', description: 'Read artisan stories, request customisations, and pick products that carry real cultural meaning.', icon: '🤝' },
  { step: '03', title: 'Purchase', subtitle: 'Kharido', description: 'Secure checkout with UPI, card, or COD. 80% of every sale goes directly to the artisan.', icon: '🛒' },
  { step: '04', title: 'Impact', subtitle: 'Badlaav', description: 'Your purchase funds craft education, fair wages, and preserves India\'s living heritage.', icon: '✨' },
];

// ─── Reviews ──────────────────────────────────────────────────────────────────
export const reviews = [
  { id: 1, user: 'Ritu S.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&q=80', rating: 5, date: 'March 2025', text: 'Absolutely stunning piece. The craftsmanship is impeccable and it arrived beautifully packaged with a personal note.' },
  { id: 2, user: 'Arjun M.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=80', rating: 5, date: 'February 2025', text: 'Gifted this to my wife and she loved it. You can feel the love and skill in every detail. Will definitely order again.' },
  { id: 3, user: 'Kavya R.', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&q=80', rating: 4, date: 'January 2025', text: 'Beautiful quality. Delivery took a bit longer but the product was worth every rupee. Highly recommend.' },
];

// ─── Dashboard ────────────────────────────────────────────────────────────────
export const dashboardStats = {
  earnings: { total: 84600, thisMonth: 18200, growth: 22 },
  products: { total: 43, active: 38, pending: 5 },
  orders: { total: 287, pending: 11, completed: 271 },
  views: { total: 24300, thisMonth: 4180 },
};

export const recentOrders = [
  { id: '#KH-7821', customer: 'Ananya Sharma', product: 'Madhubani Wall Art (Large)', amount: 3500, status: 'Shipped', date: 'Jun 12, 2025' },
  { id: '#KH-7820', customer: 'Vikram Nair', product: 'Handwoven Sambalpuri Saree', amount: 3200, status: 'Processing', date: 'Jun 11, 2025' },
  { id: '#KH-7819', customer: 'Priya Menon', product: 'Madhubani Wall Art (Large)', amount: 3500, status: 'Delivered', date: 'Jun 10, 2025' },
  { id: '#KH-7818', customer: 'Rohit Gupta', product: 'Chikankari Kurta', amount: 1650, status: 'Delivered', date: 'Jun 9, 2025' },
  { id: '#KH-7817', customer: 'Sneha Joshi', product: 'Madhubani Wall Art (Large)', amount: 3500, status: 'Cancelled', date: 'Jun 8, 2025' },
];
