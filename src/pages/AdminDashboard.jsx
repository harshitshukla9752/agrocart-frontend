import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Package, 
  ShoppingBag, 
  DollarSign, 
  BarChart2, 
  Settings, 
  LogOut, 
  Search, 
  Plus, 
  Edit, 
  Trash2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Loader from '../components/Loader';

const AdminDashboard = () => {
  const { currentUser, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  
  // Redirect if not logged in or not admin
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else if (!isAdmin()) {
      navigate('/');
    } else {
      // Fetch dashboard data
      fetchDashboardData();
    }
  }, [currentUser, isAdmin, navigate]);
  
  // Mock fetch dashboard data
  const fetchDashboardData = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock products data
      const mockProducts = [
        {
          id: 1,
          name: 'Premium Organic Fertilizer - Plant Growth Booster',
          image: 'https://images.pexels.com/photos/4505166/pexels-photo-4505166.jpeg',
          price: 29.99,
          category: 'Fertilizers',
          stock: 45,
          status: 'Active'
        },
        {
          id: 2,
          name: 'High-Yield Tomato Seeds - Pack of 100',
          image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
          price: 12.99,
          category: 'Seeds',
          stock: 120,
          status: 'Active'
        },
        {
          id: 3,
          name: 'Digital Soil Moisture Meter',
          image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg',
          price: 49.99,
          category: 'Equipment',
          stock: 18,
          status: 'Active'
        },
        {
          id: 4,
          name: 'Professional Garden Tool Set - 10 Pieces',
          image: 'https://images.pexels.com/photos/2252410/pexels-photo-2252410.jpeg',
          price: 89.99,
          category: 'Tools',
          stock: 23,
          status: 'Active'
        },
        {
          id: 5,
          name: 'Eco-Friendly Pesticide Spray - 1 Liter',
          image: 'https://images.pexels.com/photos/2649403/pexels-photo-2649403.jpeg',
          price: 19.99,
          category: 'Pesticides',
          stock: 0,
          status: 'Out of Stock'
        }
      ];
      
      // Mock orders data
      const mockOrders = [
        {
          id: 'ORD-10042',
          date: '2025-05-28',
          customer: 'Sarah Johnson',
          total: 79.98,
          status: 'Delivered',
          items: 3
        },
        {
          id: 'ORD-10041',
          date: '2025-05-27',
          customer: 'Michael Rodriguez',
          total: 149.97,
          status: 'Shipped',
          items: 2
        },
        {
          id: 'ORD-10040',
          date: '2025-05-26',
          customer: 'Emily Chen',
          total: 34.99,
          status: 'Processing',
          items: 1
        },
        {
          id: 'ORD-10039',
          date: '2025-05-25',
          customer: 'James Wilson',
          total: 124.95,
          status: 'Delivered',
          items: 4
        },
        {
          id: 'ORD-10038',
          date: '2025-05-24',
          customer: 'Olivia Martinez',
          total: 56.99,
          status: 'Canceled',
          items: 2
        }
      ];
      
      setProducts(mockProducts);
      setOrders(mockOrders);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Stats cards data
  const statsCards = [
    {
      title: 'Total Revenue',
      value: '$8,549.00',
      change: '+12.5%',
      positive: true,
      icon: <DollarSign className="text-white" size={20} />,
      bgColor: 'bg-green-500'
    },
    {
      title: 'Orders',
      value: '152',
      change: '+8.2%',
      positive: true,
      icon: <ShoppingBag className="text-white\" size={20} />,
      bgColor: 'bg-blue-500'
    },
    {
      title: 'Products',
      value: '84',
      change: '+4.1%',
      positive: true,
      icon: <Package className="text-white" size={20} />,
      bgColor: 'bg-purple-500'
    },
    {
      title: 'Customers',
      value: '321',
      change: '+24.6%',
      positive: true,
      icon: <Users className="text-white\" size={20} />,
      bgColor: 'bg-orange-500'
    }
  ];
  
  // Sidebar navigation items
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart2 size={20} /> },
    { id: 'products', label: 'Products', icon: <Package size={20} /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingBag size={20} /> },
    { id: 'customers', label: 'Customers', icon: <Users size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> }
  ];
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="large" />
      </div>
    );
  }
  
  // Order status style
  const getOrderStatusStyle = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-lg font-bold text-gray-800">Admin Dashboard</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-4 space-y-1">
            {sidebarItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full px-4 py-3 text-sm rounded-md ${
                  activeTab === item.id 
                    ? 'bg-green-50 text-green-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between p-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="md:hidden text-gray-600 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Page Title - Mobile */}
            <h1 className="md:hidden text-lg font-bold text-gray-800">
              {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
            </h1>
            
            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-gray-100 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>
            
            {/* User Menu */}
            <div className="flex items-center">
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <span className="hidden md:block text-sm font-medium text-gray-700 mr-2">
                    {currentUser?.name || 'Admin User'}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                    {(currentUser?.name || 'A')[0].toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Mobile Sidebar */}
        {showSidebar && (
          <div className="md:hidden fixed inset-0 z-40 flex">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setShowSidebar(false)}
            ></div>
            
            {/* Sidebar */}
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h1 className="text-lg font-bold text-gray-800">Admin Dashboard</h1>
                <button 
                  onClick={() => setShowSidebar(false)}
                  className="text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto py-4">
                <nav className="px-4 space-y-1">
                  {sidebarItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setShowSidebar(false);
                      }}
                      className={`flex items-center w-full px-4 py-3 text-sm rounded-md ${
                        activeTab === item.id 
                          ? 'bg-green-50 text-green-600' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                >
                  <LogOut size={20} className="mr-3" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          {activeTab === 'dashboard' && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-600">Welcome back, {currentUser?.name || 'Admin'}!</p>
              </div>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {statsCards.map((card, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className={`${card.bgColor} rounded-full p-3 mr-4`}>
                        {card.icon}
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{card.title}</p>
                        <h3 className="text-2xl font-bold text-gray-800">{card.value}</h3>
                      </div>
                    </div>
                    <div className={`mt-2 text-sm ${card.positive ? 'text-green-600' : 'text-red-600'}`}>
                      {card.change} from last month
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Recent Orders */}
              <div className="bg-white rounded-lg shadow-sm mb-8">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-800">Recent Orders</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {order.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {order.customer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            ${order.total.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getOrderStatusStyle(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-green-600 hover:text-green-900">
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 border-t border-gray-200">
                  <button 
                    onClick={() => setActiveTab('orders')}
                    className="text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    View all orders
                  </button>
                </div>
              </div>
              
              {/* Low Stock Products */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-800">Low Stock Products</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stock
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.filter(p => p.stock < 25).map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0 rounded-md bg-gray-100 overflow-hidden">
                                <img 
                                  src={product.image} 
                                  alt={product.name} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-800 max-w-xs truncate">
                                  {product.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {product.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            ${product.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {product.stock}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              product.stock === 0 
                                ? 'bg-red-100 text-red-800' 
                                : product.stock < 10 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : 'bg-green-100 text-green-800'
                            }`}>
                              {product.stock === 0 ? 'Out of Stock' : product.stock < 10 ? 'Low Stock' : 'In Stock'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-green-600 hover:text-green-900">
                              Restock
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 border-t border-gray-200">
                  <button 
                    onClick={() => setActiveTab('products')}
                    className="text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    View all products
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'products' && (
            <div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Products</h1>
                  <p className="text-gray-600">Manage your products inventory</p>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium flex items-center">
                    <Plus size={18} className="mr-2" />
                    Add Product
                  </button>
                </div>
              </div>
              
              {/* Filters and Search */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full bg-gray-100 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <select className="bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option value="">All Categories</option>
                      <option value="Seeds">Seeds</option>
                      <option value="Tools">Tools</option>
                      <option value="Fertilizers">Fertilizers</option>
                      <option value="Pesticides">Pesticides</option>
                      <option value="Equipment">Equipment</option>
                    </select>
                    
                    <select className="bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option value="">All Statuses</option>
                      <option value="active">Active</option>
                      <option value="out-of-stock">Out of Stock</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Products Table */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stock
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0 rounded-md bg-gray-100 overflow-hidden">
                                <img 
                                  src={product.image} 
                                  alt={product.name} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-800 max-w-xs truncate">
                                  {product.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  ID: PROD-{product.id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {product.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            ${product.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {product.stock}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              product.stock === 0 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {product.stock === 0 ? 'Out of Stock' : 'Active'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end items-center space-x-2">
                              <button className="text-gray-600 hover:text-gray-900 p-1">
                                <Edit size={16} />
                              </button>
                              <button className="text-red-600 hover:text-red-900 p-1">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing 1 to {products.length} of {products.length} products
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600">
                      1
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
                <p className="text-gray-600">Manage customer orders</p>
              </div>
              
              {/* Filters */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Search orders by ID or customer..."
                      className="w-full bg-gray-100 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <select className="bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option value="">All Statuses</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="canceled">Canceled</option>
                    </select>
                    
                    <select className="bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option value="">Last 30 days</option>
                      <option value="week">Last 7 days</option>
                      <option value="month">Last 30 days</option>
                      <option value="year">Last year</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Orders Table */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Items
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {order.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {order.customer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {order.items}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            ${order.total.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getOrderStatusStyle(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end items-center space-x-2">
                              <button className="text-gray-600 hover:text-gray-900 p-1">
                                View
                              </button>
                              <button className="text-gray-600 hover:text-gray-900 p-1">
                                <ChevronDown size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing 1 to {orders.length} of {orders.length} orders
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600">
                      1
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Other tabs would go here */}
          {(activeTab === 'customers' || activeTab === 'settings') && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-800 mb-2">{activeTab === 'customers' ? 'Customers' : 'Settings'}</h3>
                <p className="text-gray-600">This section is under development.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;