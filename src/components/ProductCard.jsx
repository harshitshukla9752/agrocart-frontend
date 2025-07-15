import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const { id, name, image, price, originalPrice, rating, category, badge } = product;
  const { addToCart, addToWishlist, isAuthenticated } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated()) {
      window.location.href = '/login';
      return;
    }

    try {
      setLoading(true);
      await addToCart(id, 1);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated()) {
      window.location.href = '/login';
      return;
    }

    try {
      setIsLiked(!isLiked);
      await addToWishlist(id);
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      setIsLiked(false);
    }
  };

  return (
    <div 
      className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        {/* Product Image */}
        <Link to={`/products/${id}`} className="block">
          <div className="relative h-48 bg-gray-100">
            <img 
              src={image} 
              alt={name} 
              className={`w-full h-full object-cover transition-transform duration-300 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
            />
            
            {/* Overlay */}
            <div className={`absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}></div>
          </div>
        </Link>
        
        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold text-white bg-red-500">
              {badge}
            </span>
          </div>
        )}
        
        {/* Quick Actions */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
          isHovered ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
        }`}>
          <button 
            onClick={handleAddToWishlist}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white bg-opacity-80 text-gray-600 hover:text-red-500'
            }`}
          >
            <Heart size={14} className={isLiked ? 'fill-current' : ''} />
          </button>
          
          <Link 
            to={`/products/${id}`}
            className="w-8 h-8 bg-white bg-opacity-80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-blue-500 transition-colors"
          >
            <Eye size={14} />
          </Link>
        </div>
        
        {/* Quick Add to Cart */}
        <div className={`absolute bottom-0 left-0 right-0 p-3 transition-all duration-300 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}>
          <button 
            onClick={handleAddToCart}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            <ShoppingCart size={14} />
            {loading ? 'Adding...' : 'Quick Add'}
          </button>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="p-4">
        {/* Category */}
        <div className="mb-2">
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
            {category}
          </span>
        </div>
        
        {/* Product Name */}
        <Link to={`/products/${id}`}>
          <h3 className="font-semibold text-gray-800 hover:text-green-600 transition-colors line-clamp-2 mb-2">
            {name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                className={i < Math.floor(rating) 
                  ? "text-yellow-400 fill-yellow-400" 
                  : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({rating})</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-800">
              ${price}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${originalPrice}
              </span>
            )}
          </div>
          
          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart}
            disabled={loading}
            className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors disabled:opacity-50"
          >
            <ShoppingCart size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;