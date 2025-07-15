import React from 'react';
import CategoryCard from '../components/CategoryCard';

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: 'Seeds',
      image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg',
      productCount: 120,
      description: 'High-quality seeds for various crops and plants'
    },
    {
      id: 2,
      name: 'Fertilizers',
      image: 'https://images.pexels.com/photos/4207910/pexels-photo-4207910.jpeg',
      productCount: 85,
      description: 'Organic and chemical fertilizers for optimal growth'
    },
    {
      id: 3,
      name: 'Tools',
      image: 'https://images.pexels.com/photos/6231590/pexels-photo-6231590.jpeg',
      productCount: 74,
      description: 'Professional farming and gardening tools'
    },
    {
      id: 4,
      name: 'Equipment',
      image: 'https://images.pexels.com/photos/5466280/pexels-photo-5466280.jpeg',
      productCount: 42,
      description: 'Modern farming equipment and machinery'
    },
    {
      id: 5,
      name: 'Pesticides',
      image: 'https://images.pexels.com/photos/2649403/pexels-photo-2649403.jpeg',
      productCount: 56,
      description: 'Safe and effective pest control solutions'
    },
    {
      id: 6,
      name: 'Irrigation',
      image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg',
      productCount: 38,
      description: 'Modern irrigation systems and accessories'
    }
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Product Categories</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive range of agricultural products organized by categories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;