import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const { id, name, image, productCount } = category;
  
  return (
    <Link to={`/categories/${id}`} className="group">
      <div className="relative overflow-hidden rounded-lg shadow-md h-64">
        {/* Image */}
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-80"></div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-xl font-semibold mb-1">{name}</h3>
          <p className="text-sm text-gray-200">{productCount} Products</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;