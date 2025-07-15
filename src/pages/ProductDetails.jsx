import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Truck, ShieldCheck, ArrowLeft, Heart, Share2, ShoppingCart, Minus, Plus } from 'lucide-react';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock product data (in a real app, this would be an API call)
        const mockProduct = {
          id: parseInt(id),
          name: 'Premium Organic Fertilizer - Plant Growth Booster',
          description: 'This premium organic fertilizer is specially formulated to enhance plant growth and health. It contains a balanced mix of essential nutrients that promote robust root development, vibrant foliage, and abundant flowering. Made from 100% natural ingredients, it\'s safe for all plants and environmentally friendly.',
          price: 29.99,
          originalPrice: 39.99,
          discount: 25,
          rating: 4.8,
          reviewCount: 124,
          stockStatus: 'In Stock',
          sku: 'FERT-1001',
          category: 'Fertilizers',
          brand: 'GrowWell',
          tags: ['Organic', 'Plant food', 'Growth enhancer', 'Eco-friendly'],
          images: [
            'https://images.pexels.com/photos/4505166/pexels-photo-4505166.jpeg',
            'https://images.pexels.com/photos/5503722/pexels-photo-5503722.jpeg',
            'https://images.pexels.com/photos/5417832/pexels-photo-5417832.jpeg',
            'https://images.pexels.com/photos/5417821/pexels-photo-5417821.jpeg'
          ],
          features: [
            'Rich in nitrogen, phosphorus, and potassium',
            'Promotes vigorous plant growth and high yields',
            'Improves soil structure and increases microbial activity',
            'Slow-release formula for long-lasting effects',
            'No synthetic chemicals or additives'
          ],
          specifications: [
            { name: 'Weight', value: '5kg' },
            { name: 'Dimensions', value: '30 x 20 x 10 cm' },
            { name: 'Composition', value: 'Compost, worm castings, bone meal, kelp meal' },
            { name: 'NPK Ratio', value: '4-6-4' },
            { name: 'Application', value: 'Indoor and outdoor plants' },
            { name: 'Usage', value: 'Mix 2-3 tablespoons per gallon of soil' }
          ],
          reviews: [
            {
              id: 1,
              user: 'Emily Parker',
              rating: 5,
              date: '2 months ago',
              comment: 'Absolutely amazing product! My tomato plants doubled their growth within weeks of application. Highly recommend for any serious gardener.'
            },
            {
              id: 2,
              user: 'Michael Wilson',
              rating: 4,
              date: '1 month ago',
              comment: 'Very good fertilizer. My garden has never looked better. The only reason for 4 stars is that the packaging could be improved.'
            },
            {
              id: 3,
              user: 'Sarah Thompson',
              rating: 5,
              date: '3 weeks ago',
              comment: 'This is the third time I\'ve purchased this fertilizer. It works wonders on my vegetable garden and indoor plants. Worth every penny!'
            }
          ]
        };
        
        setProduct(mockProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  // Handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  // Related products (mock data)
  const relatedProducts = [
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
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="large" />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you're looking for might have been removed or is temporarily unavailable.</p>
        <Link 
          to="/products" 
          className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
        >
          <ArrowLeft size={18} />
          Back to Products
        </Link>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center text-sm">
            <li>
              <Link to="/" className="text-gray-500 hover:text-green-600">Home</Link>
            </li>
            <li className="mx-2 text-gray-400">/</li>
            <li>
              <Link to="/products" className="text-gray-500 hover:text-green-600">Products</Link>
            </li>
            <li className="mx-2 text-gray-400">/</li>
            <li>
              <Link to={`/products/category/${product.category.toLowerCase()}`} className="text-gray-500 hover:text-green-600">{product.category}</Link>
            </li>
            <li className="mx-2 text-gray-400">/</li>
            <li className="text-gray-700 font-medium truncate">{product.name}</li>
          </ol>
        </nav>
        
        {/* Product Info Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div>
              <div className="mb-4 rounded-lg overflow-hidden">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name} 
                  className="w-full h-96 object-cover"
                />
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative rounded-md overflow-hidden w-20 h-20 flex-shrink-0 border-2 ${
                      selectedImage === index ? 'border-green-500' : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - view ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Details */}
            <div>
              <div className="mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={18} 
                        className={i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{product.rating} ({product.reviewCount} reviews)</span>
                </div>
                
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-bold text-gray-800">${product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-gray-500 line-through ml-2">${product.originalPrice}</span>
                      <span className="ml-2 bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-medium">
                        {product.discount}% OFF
                      </span>
                    </>
                  )}
                </div>
                
                <p className="text-gray-600 mb-6">{product.description.substring(0, 150)}...</p>
                
                {/* Stock Status */}
                <div className="flex items-center mb-6">
                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                    product.stockStatus === 'In Stock' ? 'bg-green-500' : 'bg-red-500'
                  }`}></span>
                  <span className={`text-sm font-medium ${
                    product.stockStatus === 'In Stock' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.stockStatus}
                  </span>
                </div>
              </div>
              
              {/* Quantity Selector */}
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center">
                  <button 
                    onClick={decreaseQuantity}
                    className="w-10 h-10 rounded-l-md bg-gray-100 flex items-center justify-center border border-gray-300"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-16 h-10 border-y border-gray-300 text-center"
                    min="1"
                  />
                  <button 
                    onClick={increaseQuantity}
                    className="w-10 h-10 rounded-r-md bg-gray-100 flex items-center justify-center border border-gray-300"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center gap-2">
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
                <button className="w-12 h-12 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100">
                  <Heart size={18} className="text-gray-600" />
                </button>
                <button className="w-12 h-12 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100">
                  <Share2 size={18} className="text-gray-600" />
                </button>
              </div>
              
              {/* Product Info */}
              <div className="space-y-3 border-t border-gray-200 pt-6">
                <div className="flex">
                  <span className="text-gray-600 w-24">SKU:</span>
                  <span className="text-gray-800">{product.sku}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-600 w-24">Category:</span>
                  <Link to={`/products/category/${product.category.toLowerCase()}`} className="text-green-600 hover:text-green-700">
                    {product.category}
                  </Link>
                </div>
                <div className="flex">
                  <span className="text-gray-600 w-24">Brand:</span>
                  <Link to={`/products/brand/${product.brand.toLowerCase()}`} className="text-green-600 hover:text-green-700">
                    {product.brand}
                  </Link>
                </div>
                <div className="flex flex-wrap">
                  <span className="text-gray-600 w-24">Tags:</span>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <Link 
                        key={index} 
                        to={`/products/tag/${tag.toLowerCase()}`} 
                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-1 rounded"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Shipping Info */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center text-gray-600">
                  <Truck size={18} className="mr-2" />
                  <span>Free shipping for orders over $100</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <ShieldCheck size={18} className="mr-2" />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              <button
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'description' 
                    ? 'border-b-2 border-green-500 text-green-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'specifications' 
                    ? 'border-b-2 border-green-500 text-green-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('specifications')}
              >
                Specifications
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'reviews' 
                    ? 'border-b-2 border-green-500 text-green-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({product.reviews.length})
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'description' && (
              <div>
                <p className="text-gray-700 mb-6">{product.description}</p>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Features</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Specifications</h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="divide-y divide-gray-200">
                      {product.specifications.map((spec, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-4 py-3 text-sm font-medium text-gray-700 w-1/3">{spec.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Customer Reviews</h3>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-medium text-sm">
                    Write a Review
                  </button>
                </div>
                
                {/* Reviews List */}
                <div className="space-y-6">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium text-gray-800">{review.user}</h4>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;