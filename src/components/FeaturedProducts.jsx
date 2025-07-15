import React from 'react';
import ProductCard from './ProductCard';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedProducts = ({ title, viewAllLink, products }) => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>
          <Link 
            to={viewAllLink} 
            className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1 group"
          >
            View All 
            <ChevronRight className="transition-transform group-hover:translate-x-1" size={18} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;