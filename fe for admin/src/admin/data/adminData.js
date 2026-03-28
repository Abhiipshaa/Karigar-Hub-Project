// TODO: Replace all dummy data with backend API calls later

import sambalpuriSaree from '../../assets/Sambalpuri saree.jpeg';
import vaseSet from '../../assets/Vase set.jpeg';
import jewellery from '../../assets/jwellary.jpeg';
import pattachitra from '../../assets/Pattachitra art.jpeg';
import chikankari from '../../assets/Chikankari kurta.jpg';
import madhubani from '../../assets/Madhubani painting.jpeg';
import brassDiya from '../../assets/Brass diya.jpeg';
import terracottaPot from '../../assets/terracotta pot.jpg';

export const adminStats = {
  totalUsers: 1284,
  totalKarigars: 312,
  totalProducts: 2847,
  totalOrders: 8621,
  totalRevenue: 4280000,
};

export const adminUsers = [
  { id: 1, name: 'Ananya Sharma', email: 'ananya@gmail.com', location: 'Delhi', orders: 12, joined: 'Jan 2024', status: 'active', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&q=80' },
  { id: 2, name: 'Vikram Nair', email: 'vikram@gmail.com', location: 'Bengaluru', orders: 8, joined: 'Feb 2024', status: 'active', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=80' },
  { id: 3, name: 'Priya Menon', email: 'priya@gmail.com', location: 'Mumbai', orders: 21, joined: 'Mar 2024', status: 'active', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&q=80' },
  { id: 4, name: 'Rohit Gupta', email: 'rohit@gmail.com', location: 'Jaipur', orders: 5, joined: 'Apr 2024', status: 'blocked', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80' },
  { id: 5, name: 'Sneha Joshi', email: 'sneha@gmail.com', location: 'Pune', orders: 17, joined: 'May 2024', status: 'active', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=60&q=80' },
  { id: 6, name: 'Arjun Mehta', email: 'arjun@gmail.com', location: 'Hyderabad', orders: 3, joined: 'Jun 2024', status: 'active', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&q=80' },
];

export const adminKarigars = [
  { id: 1, name: 'Sunita Devi', state: 'Bihar', craft: 'Madhubani Painting', products: 43, earnings: 84600, status: 'approved', avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=60&q=80' },
  { id: 2, name: 'Ramesh Prajapati', state: 'Rajasthan', craft: 'Blue Pottery', products: 58, earnings: 112400, status: 'approved', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80' },
  { id: 3, name: 'Meera Mahato', state: 'West Bengal', craft: 'Dokra Metal Craft', products: 36, earnings: 67200, status: 'approved', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=60&q=80' },
  { id: 4, name: 'Pradeep Mohanty', state: 'Odisha', craft: 'Pattachitra Painting', products: 29, earnings: 54800, status: 'pending', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=80' },
  { id: 5, name: 'Fatima Begum', state: 'Uttar Pradesh', craft: 'Chikankari Embroidery', products: 51, earnings: 93100, status: 'pending', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&q=80' },
  { id: 6, name: 'Rajan Sharma', state: 'Kashmir', craft: 'Pashmina Weaving', products: 22, earnings: 41500, status: 'approved', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&q=80' },
];

export const adminProducts = [
  { id: 1, name: 'Handwoven Sambalpuri Saree',   artisan: 'Sunita Devi',      price: 3200, category: 'Handloom',     active: true,  image: sambalpuriSaree },
  { id: 2, name: 'Blue Pottery Vase Set',         artisan: 'Ramesh Prajapati', price: 1850, category: 'Pottery',      active: true,  image: vaseSet        },
  { id: 3, name: 'Dokra Tribal Necklace',         artisan: 'Meera Mahato',     price: 1200, category: 'Jewellery',   active: true,  image: jewellery      },
  { id: 4, name: 'Pattachitra Painting on Cloth', artisan: 'Pradeep Mohanty',  price: 2800, category: 'Paintings',   active: false, image: pattachitra    },
  { id: 5, name: 'Chikankari Kurta (White)',      artisan: 'Fatima Begum',     price: 1650, category: 'Handloom',    active: true,  image: chikankari     },
  { id: 6, name: 'Madhubani Wall Art (Large)',    artisan: 'Sunita Devi',      price: 3500, category: 'Paintings',   active: true,  image: madhubani      },
  { id: 7, name: 'Brass Diya Set',               artisan: 'Ramesh Prajapati', price: 890,  category: 'Festive Items',active: true,  image: brassDiya      },
  { id: 8, name: 'Terracotta Planter Set',        artisan: 'Ramesh Prajapati', price: 750,  category: 'Home Decor',  active: false, image: terracottaPot  },
];

export const adminOrders = [
  { id: '#KH-7821', buyer: 'Ananya Sharma', product: 'Madhubani Wall Art', amount: 3500, status: 'Shipped', date: 'Jun 12, 2025' },
  { id: '#KH-7820', buyer: 'Vikram Nair', product: 'Sambalpuri Saree', amount: 3200, status: 'Processing', date: 'Jun 11, 2025' },
  { id: '#KH-7819', buyer: 'Priya Menon', product: 'Madhubani Wall Art', amount: 3500, status: 'Delivered', date: 'Jun 10, 2025' },
  { id: '#KH-7818', buyer: 'Rohit Gupta', product: 'Chikankari Kurta', amount: 1650, status: 'Delivered', date: 'Jun 9, 2025' },
  { id: '#KH-7817', buyer: 'Sneha Joshi', product: 'Blue Pottery Vase Set', amount: 1850, status: 'Pending', date: 'Jun 8, 2025' },
  { id: '#KH-7816', buyer: 'Arjun Mehta', product: 'Dokra Tribal Necklace', amount: 1200, status: 'Shipped', date: 'Jun 7, 2025' },
  { id: '#KH-7815', buyer: 'Ananya Sharma', product: 'Brass Diya Set', amount: 890, status: 'Delivered', date: 'Jun 6, 2025' },
  { id: '#KH-7814', buyer: 'Priya Menon', product: 'Terracotta Planter Set', amount: 750, status: 'Cancelled', date: 'Jun 5, 2025' },
];

export const adminActivities = [
  { id: 1, type: 'order', icon: '🛒', message: 'Ananya Sharma placed an order for Madhubani Wall Art', time: '2 mins ago', color: 'bg-green-100 text-green-700' },
  { id: 2, type: 'karigar', icon: '🧑🎨', message: 'Fatima Begum added a new product: Chikankari Dupatta', time: '15 mins ago', color: 'bg-amber-100 text-amber-700' },
  { id: 3, type: 'user', icon: '👤', message: 'New user registered: Arjun Mehta from Hyderabad', time: '32 mins ago', color: 'bg-blue-100 text-blue-700' },
  { id: 4, type: 'order', icon: '📦', message: 'Order #KH-7820 status updated to Shipped', time: '1 hr ago', color: 'bg-green-100 text-green-700' },
  { id: 5, type: 'karigar', icon: '✅', message: 'Karigar Rajan Sharma was approved by admin', time: '2 hrs ago', color: 'bg-purple-100 text-purple-700' },
  { id: 6, type: 'user', icon: '👤', message: 'New user registered: Sneha Joshi from Pune', time: '3 hrs ago', color: 'bg-blue-100 text-blue-700' },
  { id: 7, type: 'order', icon: '🛒', message: 'Vikram Nair placed an order for Sambalpuri Saree', time: '4 hrs ago', color: 'bg-green-100 text-green-700' },
  { id: 8, type: 'karigar', icon: '🧑🎨', message: 'Pradeep Mohanty submitted profile for approval', time: '5 hrs ago', color: 'bg-amber-100 text-amber-700' },
  { id: 9, type: 'order', icon: '✅', message: 'Order #KH-7819 marked as Delivered', time: '6 hrs ago', color: 'bg-green-100 text-green-700' },
  { id: 10, type: 'user', icon: '🚫', message: 'User Rohit Gupta was blocked by admin', time: '8 hrs ago', color: 'bg-red-100 text-red-700' },
];

// ── Reviews & Ratings ─────────────────────────────────────────────────────────
// TODO: Replace with backend API later
export const adminReviews = [
  { id: 1, user: 'Ananya Sharma', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&q=80', product: 'Madhubani Wall Art (Large)', karigar: 'Sunita Devi', rating: 5, comment: 'Absolutely stunning piece! The craftsmanship is impeccable and it arrived beautifully packaged with a personal note from the artist. Highly recommend!', date: 'Jun 12, 2025', status: 'published', helpful: 24 },
  { id: 2, user: 'Vikram Nair', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=80', product: 'Handwoven Sambalpuri Saree', karigar: 'Sunita Devi', rating: 5, comment: 'Gifted this to my mother for her birthday. She was moved to tears. The quality is exceptional and knowing it was handwoven by a real artisan makes it priceless.', date: 'Jun 11, 2025', status: 'published', helpful: 18 },
  { id: 3, user: 'Priya Menon', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&q=80', product: 'Dokra Tribal Necklace', karigar: 'Meera Mahato', rating: 4, comment: 'Beautiful necklace, very unique design. Delivery was a bit slow but the product quality is worth the wait. Will order again.', date: 'Jun 10, 2025', status: 'published', helpful: 11 },
  { id: 4, user: 'Rohit Gupta', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80', product: 'Blue Pottery Vase Set', karigar: 'Ramesh Prajapati', rating: 2, comment: 'One of the vases arrived with a small crack. Packaging could be better. The design is nice but disappointed with the damage.', date: 'Jun 9, 2025', status: 'flagged', helpful: 3 },
  { id: 5, user: 'Sneha Joshi', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=60&q=80', product: 'Chikankari Kurta (White)', karigar: 'Fatima Begum', rating: 5, comment: 'The embroidery work is so delicate and intricate. You can feel the love and skill in every stitch. Perfect for festive occasions!', date: 'Jun 8, 2025', status: 'published', helpful: 31 },
  { id: 6, user: 'Arjun Mehta', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&q=80', product: 'Brass Diya Set', karigar: 'Ramesh Prajapati', rating: 4, comment: 'Great quality brass diyas. Perfect for Diwali. The engraving is very detailed. Slightly smaller than expected but overall very happy.', date: 'Jun 7, 2025', status: 'published', helpful: 9 },
  { id: 7, user: 'Kavya Reddy', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&q=80', product: 'Pattachitra Painting on Cloth', karigar: 'Pradeep Mohanty', rating: 1, comment: 'This is a scam. The product I received looks nothing like the photo. Completely different colours and much smaller size. Demanding a refund.', date: 'Jun 6, 2025', status: 'flagged', helpful: 0 },
  { id: 8, user: 'Ritu Singh', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=60&q=80', product: 'Terracotta Planter Set', karigar: 'Ramesh Prajapati', rating: 3, comment: 'Decent quality planters. The painting is nice but one of them had a small chip on the rim. Good value for money overall.', date: 'Jun 5, 2025', status: 'pending', helpful: 5 },
];

// ── Return Requests ───────────────────────────────────────────────────────────
// TODO: Replace with backend API later
export const adminReturns = [
  { id: 'RET-001', orderId: '#KH-7814', user: 'Priya Menon', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&q=80', product: 'Terracotta Planter Set', amount: 750, reason: 'Damaged on arrival', reasonDetail: 'The largest planter arrived with a crack running from the rim to the base. Clearly damaged during shipping. Requesting full refund.', date: 'Jun 6, 2025', status: 'pending', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&q=80' },
  { id: 'RET-002', orderId: '#KH-7809', user: 'Rohit Gupta', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80', product: 'Blue Pottery Vase Set', amount: 1850, reason: 'Wrong item received', reasonDetail: 'I ordered the cobalt blue set but received a green one. The product code on the box is different from what I ordered.', date: 'Jun 5, 2025', status: 'approved', image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=200&q=80' },
  { id: 'RET-003', orderId: '#KH-7801', user: 'Kavya Reddy', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&q=80', product: 'Pattachitra Painting on Cloth', amount: 2800, reason: 'Not as described', reasonDetail: 'The painting is significantly smaller than the dimensions listed (24x36 inches). What I received is barely 12x18 inches. Very misleading listing.', date: 'Jun 4, 2025', status: 'pending', image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=200&q=80' },
  { id: 'RET-004', orderId: '#KH-7795', user: 'Arjun Mehta', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&q=80', product: 'Dokra Tribal Necklace', amount: 1200, reason: 'Quality not as expected', reasonDetail: 'The finish on the necklace is very rough and the clasp broke within 2 days of use. Expected much better quality for this price.', date: 'Jun 3, 2025', status: 'rejected', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&q=80' },
  { id: 'RET-005', orderId: '#KH-7788', user: 'Sneha Joshi', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=60&q=80', product: 'Chikankari Kurta (White)', amount: 1650, reason: 'Size mismatch', reasonDetail: 'The kurta runs very small. I ordered XL but it fits like a medium. The size chart on the website is inaccurate. Need exchange or refund.', date: 'Jun 2, 2025', status: 'approved', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4e5b?w=200&q=80' },
  { id: 'RET-006', orderId: '#KH-7780', user: 'Vikram Nair', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=80', product: 'Brass Diya Set', amount: 890, reason: 'Changed mind', reasonDetail: 'I purchased this as a gift but the recipient already has a similar set. Would like to return as it is unused and in original packaging.', date: 'Jun 1, 2025', status: 'pending', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=200&q=80' },
];
