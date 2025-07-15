import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const CategoryDetails = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock category data
        const mockCategory = {
          id: parseInt(id),
          name: 'Seeds',
          description: 'High-quality seeds for various crops and plants',
          image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg'
        };

        // Mock products data
        const mockProducts = [
          {
            id: 1,
            name: 'Premium Tomato Seeds',
            image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
            price: 12.99,
            rating: 4.5,
            category: 'Seeds'
          },
          {
            id: 2,
            name: 'Organic Cucumber Seeds',
            image: 'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg',
            price: 9.99,
            rating: 4.3,
            category: 'Seeds'
          },
          // Add more mock products as needed
        ];

        setCategory(mockCategory);
        setProducts(mockProducts);
      } catch (error) {
        console.error('Error fetching category details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="large" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Category not found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="relative h-64 rounded-lg overflow-hidden mb-6">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h1 className="text-4xl font-bold text-white">{category.name}</h1>
            </div>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto text-center">
            {category.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;