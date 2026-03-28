const BASE = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('kh_token');

const req = async (path, options = {}) => {
  const token = getToken();
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
};

// ── Auth ──────────────────────────────────────────────────────────────────────
// API integrated here
export const register = (body) => req('/auth/register', { method: 'POST', body: JSON.stringify(body) });
export const login    = (body) => req('/auth/login',    { method: 'POST', body: JSON.stringify(body) });
export const getMe    = ()     => req('/auth/me');

// ── Products ──────────────────────────────────────────────────────────────────
// API integrated here
export const getProducts   = (params = {}) => req('/products?' + new URLSearchParams(params));
export const getProduct    = (id)          => req(`/products/${id}`);
export const createProduct = (body)        => req('/products', { method: 'POST', body: JSON.stringify(body) });
export const updateProduct = (id, body)    => req(`/products/${id}`, { method: 'PUT', body: JSON.stringify(body) });
export const deleteProduct = (id)          => req(`/products/${id}`, { method: 'DELETE' });

// ── Artisans ──────────────────────────────────────────────────────────────────
// API integrated here
export const getArtisans = (params = {}) => req('/artisans?' + new URLSearchParams(params));
export const getArtisan  = (id)          => req(`/artisans/${id}`);

// ── Wishlist ───────────────────────────────────────────────────────────────────
export const toggleWishlist = (productId) => req(`/users/wishlist/${productId}`, { method: 'POST' });
export const getWishlist    = ()           => req('/users/profile');

// ── Orders ───────────────────────────────────────────────────────────────────
export const placeOrder   = (body)       => req('/orders',     { method: 'POST', body: JSON.stringify(body) });
export const getMyOrders  = ()           => req('/orders/my');
export const getOrder     = (id)         => req(`/orders/${id}`);
export const updateStatus = (id, status) => req(`/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
