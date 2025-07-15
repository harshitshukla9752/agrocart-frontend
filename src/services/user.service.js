import api from '../config/axios';

export const userService = {
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },

  getUserId: () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.id;
  },

  // ✅ Updated Cart Endpoints
  getCart: async () => {
    const userId = userService.getUserId();
    const response = await api.get('/user/cart', {
      headers: { userId }
    });
    return response.data;
  },

  addToCart: async (productId, quantity) => {
    const userId = userService.getUserId();
    const response = await api.post('/user/cart', { productId, quantity }, {
      headers: { userId }
    });
    return response.data;
  },

  updateCartItem: async (productId, quantity) => {
    const userId = userService.getUserId();
    const response = await api.put(`/user/cart/${productId}?quantity=${quantity}`, null, {
      headers: { userId }
    });
    return response.data;
  },

  removeFromCart: async (productId) => {
    const userId = userService.getUserId();
    await api.delete(`/user/cart/${productId}`, {
      headers: { userId }
    });
  },

  placeOrder: async (orderData) => {
    const response = await api.post('/user/orders', orderData);
    return response.data;
  },

  getUserOrders: async () => {
    const response = await api.get('/user/orders');
    return response.data;
  },

  getOrderDetails: async (orderId) => {
    const response = await api.get(`/user/orders/${orderId}`);
    return response.data;
  },

  cancelOrder: async (orderId) => {
    await api.delete(`/user/orders/${orderId}`);
  },

  getWishlist: async () => {
    const response = await api.get('/user/wishlist');
    return response.data;
  },

  addToWishlist: async (productId) => {
    const response = await api.post('/user/wishlist', { productId });
    return response.data;
  },

  removeFromWishlist: async (productId) => {
    await api.delete(`/user/wishlist/${productId}`);
  },

  searchProducts: async (query) => {
    const response = await api.get(`/user/products/search?q=${query}`);
    return response.data;
  },

  getProductsByCategory: async (category) => {
    const response = await api.get(`/user/products/category/${category}`);
    return response.data;
  }
};
