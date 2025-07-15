import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, CreditCard, Truck, Package, AlertCircle } from 'lucide-react';

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    
    // Payment Information
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    savePaymentInfo: false,
    
    // Order Options
    shippingMethod: 'standard',
    billingAddressSameAsShipping: true
  });
  
  // Mock cart items
  const cartItems = [
    {
      id: 1,
      name: 'Premium Organic Fertilizer',
      image: 'https://images.pexels.com/photos/4505166/pexels-photo-4505166.jpeg',
      price: 29.99,
      quantity: 2
    },
    {
      id: 2,
      name: 'Digital Soil Moisture Meter',
      image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg',
      price: 49.99,
      quantity: 1
    }
  ];
  
  // Calculate order summary
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = formData.shippingMethod === 'express' ? 14.99 : formData.shippingMethod === 'standard' ? 9.99 : 0;
  const taxRate = 0.08; // 8% tax
  const taxAmount = subtotal * taxRate;
  const total = subtotal + shippingCost + taxAmount;
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle radio button changes
  const handleRadioChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Go to next step
  const nextStep = (e) => {
    e.preventDefault();
    setActiveStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };
  
  // Go to previous step
  const prevStep = () => {
    setActiveStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };
  
  // Place order (mock function)
  const placeOrder = (e) => {
    e.preventDefault();
    // Here you would typically send the order data to your backend
    setActiveStep(4); // Go to confirmation step
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Checkout Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Checkout</h1>
          </div>
          
          {/* Checkout Progress */}
          <div className="mb-8 hidden md:block">
            <div className="flex items-center">
              {[
                { step: 1, label: 'Shipping' },
                { step: 2, label: 'Payment' },
                { step: 3, label: 'Review' },
                { step: 4, label: 'Confirmation' }
              ].map((item, index, array) => (
                <React.Fragment key={item.step}>
                  {/* Step Circle */}
                  <div className="relative">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activeStep >= item.step
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {activeStep > item.step ? (
                        <Check size={18} />
                      ) : (
                        <span>{item.step}</span>
                      )}
                    </div>
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                  
                  {/* Connecting Line */}
                  {index < array.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        activeStep > item.step ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    ></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                {/* Step 1: Shipping Information */}
                {activeStep === 1 && (
                  <form onSubmit={nextStep}>
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Shipping Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name*
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name*
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email*
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number*
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address*
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="col-span-2">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City*
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State*
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                          Zip Code*
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country*
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="MX">Mexico</option>
                        <option value="UK">United Kingdom</option>
                      </select>
                    </div>
                    
                    {/* Shipping Method */}
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-800 mb-3">Shipping Method</h3>
                      
                      <div className="space-y-3">
                        <div 
                          className={`border rounded-md p-4 cursor-pointer ${
                            formData.shippingMethod === 'standard' 
                              ? 'border-green-500 bg-green-50' 
                              : 'border-gray-200'
                          }`}
                          onClick={() => handleRadioChange('shippingMethod', 'standard')}
                        >
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="standardShipping"
                              name="shippingMethod"
                              checked={formData.shippingMethod === 'standard'}
                              onChange={() => handleRadioChange('shippingMethod', 'standard')}
                              className="h-4 w-4 text-green-600 focus:ring-green-500"
                            />
                            <label htmlFor="standardShipping" className="ml-3 flex flex-col cursor-pointer">
                              <span className="text-gray-800 font-medium">Standard Shipping</span>
                              <span className="text-sm text-gray-500">Delivery in 5-7 business days</span>
                            </label>
                            <span className="ml-auto font-medium">$9.99</span>
                          </div>
                        </div>
                        
                        <div 
                          className={`border rounded-md p-4 cursor-pointer ${
                            formData.shippingMethod === 'express' 
                              ? 'border-green-500 bg-green-50' 
                              : 'border-gray-200'
                          }`}
                          onClick={() => handleRadioChange('shippingMethod', 'express')}
                        >
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="expressShipping"
                              name="shippingMethod"
                              checked={formData.shippingMethod === 'express'}
                              onChange={() => handleRadioChange('shippingMethod', 'express')}
                              className="h-4 w-4 text-green-600 focus:ring-green-500"
                            />
                            <label htmlFor="expressShipping" className="ml-3 flex flex-col cursor-pointer">
                              <span className="text-gray-800 font-medium">Express Shipping</span>
                              <span className="text-sm text-gray-500">Delivery in 2-3 business days</span>
                            </label>
                            <span className="ml-auto font-medium">$14.99</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <Link to="/cart" className="flex items-center text-green-600 hover:text-green-700">
                        <ArrowLeft size={16} className="mr-2" />
                        Back to Cart
                      </Link>
                      <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </form>
                )}
                
                {/* Step 2: Payment Information */}
                {activeStep === 2 && (
                  <form onSubmit={nextStep}>
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Payment Information</h2>
                    
                    <div className="mb-6">
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card*
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number*
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pl-10"
                          required
                        />
                        <CreditCard className="absolute left-3 top-2.5 text-gray-400" size={18} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date*
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV*
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="savePaymentInfo"
                          name="savePaymentInfo"
                          checked={formData.savePaymentInfo}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 rounded"
                        />
                        <label htmlFor="savePaymentInfo" className="ml-2 text-sm text-gray-700">
                          Save this payment information for future purchases
                        </label>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="billingAddressSameAsShipping"
                          name="billingAddressSameAsShipping"
                          checked={formData.billingAddressSameAsShipping}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 rounded"
                        />
                        <label htmlFor="billingAddressSameAsShipping" className="ml-2 text-sm text-gray-700">
                          Billing address same as shipping address
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex items-center text-green-600 hover:text-green-700"
                      >
                        <ArrowLeft size={16} className="mr-2" />
                        Back to Shipping
                      </button>
                      <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium"
                      >
                        Review Order
                      </button>
                    </div>
                  </form>
                )}
                
                {/* Step 3: Order Review */}
                {activeStep === 3 && (
                  <form onSubmit={placeOrder}>
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Review Your Order</h2>
                    
                    <div className="space-y-6">
                      {/* Shipping Information */}
                      <div className="border border-gray-200 rounded-md p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-800">Shipping Information</h3>
                          <button
                            type="button"
                            onClick={() => setActiveStep(1)}
                            className="text-sm text-green-600 hover:text-green-700"
                          >
                            Edit
                          </button>
                        </div>
                        
                        <div className="text-sm text-gray-600">
                          <p>{formData.firstName} {formData.lastName}</p>
                          <p>{formData.address}</p>
                          <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                          <p>{formData.email}</p>
                          <p>{formData.phone}</p>
                        </div>
                      </div>
                      
                      {/* Payment Information */}
                      <div className="border border-gray-200 rounded-md p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-800">Payment Information</h3>
                          <button
                            type="button"
                            onClick={() => setActiveStep(2)}
                            className="text-sm text-green-600 hover:text-green-700"
                          >
                            Edit
                          </button>
                        </div>
                        
                        <div className="text-sm text-gray-600">
                          <p>{formData.cardName}</p>
                          <p>Card ending in {formData.cardNumber.slice(-4)}</p>
                          <p>Expires {formData.expiryDate}</p>
                        </div>
                      </div>
                      
                      {/* Shipping Method */}
                      <div className="border border-gray-200 rounded-md p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-800">Shipping Method</h3>
                          <button
                            type="button"
                            onClick={() => setActiveStep(1)}
                            className="text-sm text-green-600 hover:text-green-700"
                          >
                            Edit
                          </button>
                        </div>
                        
                        <div className="text-sm text-gray-600">
                          <p>
                            {formData.shippingMethod === 'standard' 
                              ? 'Standard Shipping (5-7 business days)' 
                              : 'Express Shipping (2-3 business days)'}
                          </p>
                        </div>
                      </div>
                      
                      {/* Order Items */}
                      <div className="border border-gray-200 rounded-md p-4">
                        <h3 className="font-medium text-gray-800 mb-4">Order Items</h3>
                        
                        <div className="space-y-4">
                          {cartItems.map(item => (
                            <div key={item.id} className="flex items-center">
                              <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="ml-4 flex-1">
                                <h4 className="text-sm font-medium text-gray-800">{item.name}</h4>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                              </div>
                              <div className="text-sm font-medium text-gray-800">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex items-center text-green-600 hover:text-green-700"
                      >
                        <ArrowLeft size={16} className="mr-2" />
                        Back to Payment
                      </button>
                      <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium"
                      >
                        Place Order
                      </button>
                    </div>
                  </form>
                )}
                
                {/* Step 4: Order Confirmation */}
                {activeStep === 4 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Check className="text-green-500" size={32} />
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You for Your Order!</h2>
                    <p className="text-gray-600 mb-6">
                      Your order has been placed successfully. We've sent a confirmation email to {formData.email}.
                    </p>
                    
                    <div className="bg-gray-50 rounded-md p-4 mb-6 inline-block">
                      <h3 className="font-medium text-gray-800 mb-1">Order Number</h3>
                      <p className="text-lg font-bold text-green-600">AGM-{Math.floor(Math.random() * 10000000)}</p>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="font-medium text-gray-800 mb-4">Order Status Updates</h3>
                      
                      <div className="max-w-md mx-auto">
                        <div className="relative">
                          <div className="absolute left-8 top-0 bottom-0 w-1 bg-green-500"></div>
                          
                          <div className="flex items-start mb-6 relative">
                            <div className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center mr-4">
                              <Package size={24} />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">Order Received</h4>
                              <p className="text-sm text-gray-500">We've received your order and are processing it.</p>
                              <p className="text-xs text-gray-400 mt-1">Just now</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start mb-6 relative">
                            <div className="bg-gray-200 text-gray-600 w-16 h-16 rounded-full flex items-center justify-center mr-4">
                              <Package size={24} />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">Order Processing</h4>
                              <p className="text-sm text-gray-500">We're preparing your items for shipment.</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start relative">
                            <div className="bg-gray-200 text-gray-600 w-16 h-16 rounded-full flex items-center justify-center mr-4">
                              <Truck size={24} />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">Order Shipped</h4>
                              <p className="text-sm text-gray-500">Your order is on its way to you!</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <Link 
                        to="/" 
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-medium"
                      >
                        Continue Shopping
                      </Link>
                      <Link 
                        to="/track-order" 
                        className="bg-white border border-green-500 text-green-600 hover:bg-green-50 px-6 py-3 rounded-md font-medium"
                      >
                        Track Order
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Order Summary */}
            {activeStep < 4 && (
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
                  
                  {/* Order Items */}
                  <div className="max-h-64 overflow-y-auto mb-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
                        <div className="w-12 h-12 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-3 flex-1">
                          <h4 className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</h4>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-sm font-medium text-gray-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Order Totals */}
                  <div className="space-y-2 text-sm mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-800 font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-gray-800 font-medium">${shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="text-gray-800 font-medium">${taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Order Security Notice */}
                  <div className="bg-gray-50 p-3 rounded-md text-xs text-gray-600 flex items-start">
                    <AlertCircle size={16} className="text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                    <p>
                      Your personal data will be used to process your order, support your experience, and for other purposes described in our privacy policy.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;