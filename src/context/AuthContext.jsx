import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { userService } from '../services/user.service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setCurrentUser(userData);
          
          // Try to fetch fresh user data
          try {
            const freshUserData = await authService.getProfile();
            setCurrentUser(freshUserData);
            
            // Load user-specific data
            const [cartData, wishlistData] = await Promise.all([
              userService.getCart(),
              userService.getWishlist()
            ]);
            setCart(cartData);
            setWishlist(wishlistData);
          } catch (err) {
            console.error('Error fetching fresh user data:', err);
            // If token is invalid, clear storage
            if (err.response?.status === 401) {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              setCurrentUser(null);
            }
          }
        } catch (err) {
          console.error('Error parsing stored user:', err);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const userData = await authService.login({ email, password });
      setCurrentUser(userData);
      
      // Load user-specific data after login
      const [cartData, wishlistData] = await Promise.all([
        userService.getCart(),
        userService.getWishlist()
      ]);
      setCart(cartData);
      setWishlist(wishlistData);
      
      // Navigate based on user role
      if (userData.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/');
      }
      
      return userData;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to login';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const register = async (firstName, lastName, email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      await authService.register({
        firstName,
        lastName,
        email,
        password
      });
      // After successful registration, redirect to login
      navigate('/login');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to register';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setCurrentUser(null);
      setCart([]);
      setWishlist([]);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  const updateProfile = async (data) => {
    setLoading(true);
    try {
      const updatedUser = await authService.updateProfile(data);
      setCurrentUser(updatedUser);
      return updatedUser;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update profile';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    try {
      await authService.changePassword(currentPassword, newPassword);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to change password';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Cart functions
  const addToCart = async (productId, quantity = 1) => {
    try {
      await userService.addToCart(productId, quantity);
      const updatedCart = await userService.getCart();
      setCart(updatedCart);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to add item to cart';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await userService.removeFromCart(productId);
      const updatedCart = await userService.getCart();
      setCart(updatedCart);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to remove item from cart';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateCartQuantity = async (productId, quantity) => {
    try {
      await userService.updateCartItem(productId, quantity);
      const updatedCart = await userService.getCart();
      setCart(updatedCart);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update cart';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Wishlist functions
  const addToWishlist = async (productId) => {
    try {
      await userService.addToWishlist(productId);
      const updatedWishlist = await userService.getWishlist();
      setWishlist(updatedWishlist);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to add to wishlist';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await userService.removeFromWishlist(productId);
      const updatedWishlist = await userService.getWishlist();
      setWishlist(updatedWishlist);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to remove from wishlist';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Utility functions
  const isAdmin = () => {
    return currentUser?.role === 'ADMIN';
  };

  const isAuthenticated = () => {
    return !!currentUser && !!localStorage.getItem('token');
  };

  const cartItemCount = cart.reduce((total, item) => total + (item.quantity || 0), 0);

  const value = {
    // State
    currentUser,
    loading,
    error,
    cart,
    wishlist,
    cartItemCount,
    
    // Auth functions
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    isAdmin,
    isAuthenticated,
    
    // Cart functions
    addToCart,
    removeFromCart,
    updateCartQuantity,
    
    // Wishlist functions
    addToWishlist,
    removeFromWishlist,
    
    // Utility
    setError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};