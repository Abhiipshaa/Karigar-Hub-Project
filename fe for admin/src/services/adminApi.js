const API_BASE_URL = 'http://localhost:5000/api/admin';

// Helper function for API requests
const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('adminToken');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Auth Services
export const adminAuth = {
  login: (credentials) => 
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  
  logout: () => {
    localStorage.removeItem('adminToken');
    return Promise.resolve();
  },
  
  getProfile: () => apiRequest('/auth/profile'),
};

// User Management
export const userService = {
  getAll: () => apiRequest('/users'),
  getById: (id) => apiRequest(`/users/${id}`),
  update: (id, data) => apiRequest(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/users/${id}`, { method: 'DELETE' }),
  block: (id) => apiRequest(`/users/${id}/block`, { method: 'POST' }),
  unblock: (id) => apiRequest(`/users/${id}/unblock`, { method: 'POST' }),
};

// Karigar Management
export const karigarService = {
  getAll: () => apiRequest('/karigars'),
  getById: (id) => apiRequest(`/karigars/${id}`),
  approve: (id) => apiRequest(`/karigars/${id}/approve`, { method: 'POST' }),
  reject: (id) => apiRequest(`/karigars/${id}/reject`, { method: 'POST' }),
  update: (id, data) => apiRequest(`/karigars/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/karigars/${id}`, { method: 'DELETE' }),
};

// Product Management
export const productService = {
  getAll: () => apiRequest('/products'),
  getById: (id) => apiRequest(`/products/${id}`),
  create: (data) => apiRequest('/products', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/products/${id}`, { method: 'DELETE' }),
  approve: (id) => apiRequest(`/products/${id}/approve`, { method: 'POST' }),
  reject: (id) => apiRequest(`/products/${id}/reject`, { method: 'POST' }),
};

// Order Management
export const orderService = {
  getAll: () => apiRequest('/orders'),
  getById: (id) => apiRequest(`/orders/${id}`),
  updateStatus: (id, status) => apiRequest(`/orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }),
  getStats: () => apiRequest('/orders/stats'),
};

// Analytics & Dashboard
export const analyticsService = {
  getDashboard: () => apiRequest('/dashboard'),
  getUserStats: () => apiRequest('/analytics/users'),
  getProductStats: () => apiRequest('/analytics/products'),
  getOrderStats: () => apiRequest('/analytics/orders'),
  getRevenueStats: () => apiRequest('/analytics/revenue'),
};

// Activity Logs
export const activityService = {
  getAll: () => apiRequest('/activity'),
  getByUser: (userId) => apiRequest(`/activity/user/${userId}`),
  getByType: (type) => apiRequest(`/activity/type/${type}`),
};

// Settings
export const settingsService = {
  get: () => apiRequest('/settings'),
  update: (data) => apiRequest('/settings', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};