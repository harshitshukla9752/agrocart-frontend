import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { Filter, X, ChevronDown } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    sortBy: 'featured'
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Mock categories
  const categories = [
    { id: 'seeds', name: 'Seeds' },
    { id: 'tools', name: 'Tools' },
    { id: 'fertilizers', name: 'Fertilizers' },
    { id: 'pesticides', name: 'Pesticides' },
    { id: 'equipment', name: 'Equipment' }
  ];
  
  // Mock price ranges
  const priceRanges = [
    { id: 'under-25', name: 'Under $25' },
    { id: '25-50', name: '$25 to $50' },
    { id: '50-100', name: '$50 to $100' },
    { id: 'over-100', name: 'Over $100' }
  ];
  
  // Mock sort options
  const sortOptions = [
    { id: 'featured', name: 'Featured' },
    { id: 'newest', name: 'Newest' },
    { id: 'price-low-high', name: 'Price: Low to High' },
    { id: 'price-high-low', name: 'Price: High to Low' },
    { id: 'best-rated', name: 'Best Rated' }
  ];
  
  // Fetch products (mock data)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulate API call
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock products data
        const mockProducts = [
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
          },
          {
            id: 5,
            name: 'Eco-Friendly Pesticide Spray - 1 Liter',
            image: 'https://images.pexels.com/photos/2649403/pexels-photo-2649403.jpeg',
            price: 19.99,
            rating: 4.2,
            category: 'Pesticides'
          },
          {
            id: 6,
            name: 'Greenhouse Growing Kit - Complete Setup',
            image: 'https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg',
            price: 199.99,
            originalPrice: 249.99,
            rating: 4.6,
            category: 'Equipment',
            badge: 'Sale'
          },
          {
            id: 7,
            name: 'Premium Potting Soil - 20kg Bag',
            image: 'https://images.pexels.com/photos/5749946/pexels-photo-5749946.jpeg',
            price: 24.99,
            rating: 4.4,
            category: 'Fertilizers'
          },
          {
            id: 8,
            name: 'Heirloom Vegetable Seeds Collection - 15 Varieties',
            image: 'https://images.pexels.com/photos/7728082/pexels-photo-7728082.jpeg',
            price: 34.99,
            rating: 4.8,
            category: 'Seeds'
          }
        ];
        
        setProducts(mockProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  // Apply filters and sorting
  const filteredProducts = products.filter(product => {
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    
    if (filters.priceRange) {
      switch (filters.priceRange) {
        case 'under-25':
          if (product.price >= 25) return false;
          break;
        case '25-50':
          if (product.price < 25 || product.price > 50) return false;
          break;
        case '50-100':
          if (product.price < 50 || product.price > 100) return false;
          break;
        case 'over-100':
          if (product.price <= 100) return false;
          break;
        default:
          break;
      }
    }
    
    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      case 'best-rated':
        return b.rating - a.rating;
      case 'newest':
        // In a real app, this would compare dates
        return b.id - a.id;
      default:
        return 0;
    }
  });
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      sortBy: 'featured'
    });
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
          <p className="text-gray-600 mt-2">Browse our selection of premium agricultural products</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden lg:block w-64 bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
              <button 
                onClick={resetFilters} 
                className="text-sm text-green-600 hover:text-green-700"
              >
                Reset All
              </button>
            </div>
            
            {/* Categories */}
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-800 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category.id} className="flex items-center">
                    <input 
                      type="radio" 
                      id={`category-${category.id}`}
                      name="category"
                      checked={filters.category === category.name}
                      onChange={() => handleFilterChange('category', category.name)}
                      className="w-4 h-4 text-green-600 focus:ring-green-500"
                    />
                    <label 
                      htmlFor={`category-${category.id}`} 
                      className="ml-2 text-gray-700"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Range */}
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-800 mb-3">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map(range => (
                  <div key={range.id} className="flex items-center">
                    <input 
                      type="radio" 
                      id={`price-${range.id}`}
                      name="priceRange"
                      checked={filters.priceRange === range.id}
                      onChange={() => handleFilterChange('priceRange', range.id)}
                      className="w-4 h-4 text-green-600 focus:ring-green-500"
                    />
                    <label 
                      htmlFor={`price-${range.id}`} 
                      className="ml-2 text-gray-700"
                    >
                      {range.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and Filter Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-white px-4 py-2 rounded border border-gray-300 text-gray-700"
              >
                <Filter size={18} />
                Filters
              </button>
              
              <div className="flex items-center ml-auto">
                <label htmlFor="sortBy" className="text-gray-700 mr-2">Sort by:</label>
                <div className="relative">
                  <select
                    id="sortBy"
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="appearance-none bg-white border border-gray-300 py-2 pl-4 pr-10 rounded"
                  >
                    {sortOptions.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>
            
            {/* Products */}
            {loading ? (
              <Loader />
            ) : (
              <>
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">No products match your filters.</p>
                    <button 
                      onClick={resetFilters}
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setMobileFiltersOpen(false)}></div>
          
          <div className="absolute inset-y-0 left-0 max-w-full flex">
            <div className="relative w-full max-w-xs">
              <div className="h-full bg-white shadow-xl flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <X size={20} />
                  </button>
                </div>
                
                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4">
                  {/* Categories */}
                  <div className="mb-6">
                    <h3 className="text-md font-medium text-gray-800 mb-3">Categories</h3>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <div key={category.id} className="flex items-center">
                          <input 
                            type="radio" 
                            id={`mobile-category-${category.id}`}
                            name="mobileCategory"
                            checked={filters.category === category.name}
                            onChange={() => handleFilterChange('category', category.name)}
                            className="w-4 h-4 text-green-600 focus:ring-green-500"
                          />
                          <label 
                            htmlFor={`mobile-category-${category.id}`} 
                            className="ml-2 text-gray-700"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range */}
                  <div className="mb-6">
                    <h3 className="text-md font-medium text-gray-800 mb-3">Price Range</h3>
                    <div className="space-y-2">
                      {priceRanges.map(range => (
                        <div key={range.id} className="flex items-center">
                          <input 
                            type="radio" 
                            id={`mobile-price-${range.id}`}
                            name="mobilePriceRange"
                            checked={filters.priceRange === range.id}
                            onChange={() => handleFilterChange('priceRange', range.id)}
                            className="w-4 h-4 text-green-600 focus:ring-green-500"
                          />
                          <label 
                            htmlFor={`mobile-price-${range.id}`} 
                            className="ml-2 text-gray-700"
                          >
                            {range.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Footer */}
                <div className="border-t p-4 flex justify-between">
                  <button
                    onClick={resetFilters}
                    className="text-gray-600"
                  >
                    Reset All
                  </button>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;