import api from '../config/axios';

export const authService = {
  login: async (data) => {
    const response = await api.post('/auth/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  register: async (data) => {
    const response = await api.post('/auth/register', {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password
    });
    return response.data;
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    const userData = response.data;
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  },

  updateProfile: async (data) => {
    const response = await api.put('/auth/profile', data);
    // After successful update, get fresh profile data
    const updatedUser = await authService.getProfile();
    return updatedUser;
  },

  changePassword: async (currentPassword, newPassword) => {
    await api.put('/auth/password', { currentPassword, newPassword });
  }
};