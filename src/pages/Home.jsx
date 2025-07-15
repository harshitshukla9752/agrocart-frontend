import React from 'react';
import HeroSlider from '../components/HeroSlider';
import FeaturedProducts from '../components/FeaturedProducts';
import { Leaf, Truck, ThumbsUp, ShieldCheck } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import TestimonialCard from '../components/TestimonialCard';
import { Link } from 'react-router-dom';

const Home = () => {
  // Mock data for featured products
  const featuredProducts = [
    {
      id: 1,
      name: 'Premium Organic Fertilizer - Plant Growth Booster',
      image: 'https://images.pexels.com/photos/4505166/pexels-photo-4505166.jpeg',
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.8,
      category: 'Fertilizers',
      badge: 'Sale'
    },
    {
      id: 2,
      name: 'High-Yield Tomato Seeds - Pack of 100',
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
      price: 12.99,
      rating: 4.5,
      category: 'Seeds'
    },
    {
      id: 3,
      name: 'Digital Soil Moisture Meter',
      image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg',
      price: 49.99,
      originalPrice: 59.99,
      rating: 4.7,
      category: 'Equipment',
      badge: 'New'
    },
    {
      id: 4,
      name: 'Professional Garden Tool Set - 10 Pieces',
      image: 'https://images.pexels.com/photos/2252410/pexels-photo-2252410.jpeg',
      price: 89.99,
      rating: 4.9,
      category: 'Tools'
    }
  ];
  
  // Mock data for popular categories
  const categories = [
    {
      id: 1,
      name: 'Seeds',
      image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg',
      productCount: 120
    },
    {
      id: 2,
      name: 'Fertilizers',
      image: 'https://images.pexels.com/photos/4207910/pexels-photo-4207910.jpeg',
      productCount: 85
    },
    {
      id: 3,
      name: 'Tools',
      image: 'https://images.pexels.com/photos/6231590/pexels-photo-6231590.jpeg',
      productCount: 74
    },
    {
      id: 4,
      name: 'Equipment',
      image: 'https://images.pexels.com/photos/5466280/pexels-photo-5466280.jpeg',
      productCount: 42
    }
  ];
  
  // Mock data for testimonials
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Organic Farmer',
      image: 'https://images.pexels.com/photos/3771839/pexels-photo-3771839.jpeg',
      content: 'The quality of seeds I purchased from AgroMart was exceptional. My crops yielded 30% more this season!',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'Farm Owner',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
      content: 'Their farming equipment is durable and reliable. The customer service team was also very helpful with my inquiries.',
      rating: 4
    },
    {
      id: 3,
      name: 'Emily Chen',
      role: 'Home Gardener',
      image: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
      content: 'I love the organic fertilizers. My garden has never looked better, and I appreciate the eco-friendly approach.',
      rating: 5
    }
  ];

  return (
    <div>
      {/* Hero Slider */}
      <HeroSlider />
      
      {/* Value Props */}
      <div className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center p-4">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <Leaf className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">100% Organic</h3>
                <p className="text-sm text-gray-600">Certified organic products</p>
              </div>
            </div>
            
            <div className="flex items-center p-4">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <Truck className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders over $100</p>
              </div>
            </div>
            
            <div className="flex items-center p-4">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <ThumbsUp className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Satisfaction</h3>
                <p className="text-sm text-gray-600">100% guarantee</p>
              </div>
            </div>
            
            <div className="flex items-center p-4">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <ShieldCheck className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Secure Payment</h3>
                <p className="text-sm text-gray-600">Protected checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Products */}
      <FeaturedProducts 
        title="Featured Products" 
        viewAllLink="/products" 
        products={featuredProducts} 
      />
      
      {/* Categories */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Browse our comprehensive range of agricultural products categorized for your convenience</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link 
              to="/categories" 
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium inline-block transition-colors"
            >
              View All Categories
            </Link>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Grow Your Farm?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">Join thousands of satisfied farmers who trust AgroMart for their agricultural needs</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/products" 
              className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-full font-medium"
            >
              Shop Now
            </Link>
            <Link 
              to="/contact" 
              className="bg-transparent border-2 border-white hover:bg-white hover:text-green-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Hear from farmers who have transformed their agriculture practices with our products</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Newsletter */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Stay Updated</h2>
              <p className="text-gray-600">Subscribe to our newsletter for farming tips, product updates, and special offers</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;