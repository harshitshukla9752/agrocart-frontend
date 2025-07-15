import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart, cartItemCount } = useAuth();
  const [loading, setLoading] = useState(false);

  // Defensive handling for subtotal
  const subtotal = cart.reduce(
    (total, item) => total + ((item?.product?.price || 0) * item.quantity), 0
  );
  const shippingCost = subtotal > 100 ? 0 : 9.99;
  const taxRate = 0.08;
  const taxAmount = subtotal * taxRate;
  const total = subtotal + shippingCost + taxAmount;

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      setLoading(true);
      await updateCartQuantity(productId, newQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      setLoading(true);
      await removeFromCart(productId);
    } catch (error) {
      console.error('Failed to remove item:', error);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={36} className="text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
            <Link to="/products" className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-medium inline-block">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Shopping Cart ({cartItemCount} {cartItemCount === 1 ? 'item' : 'items'})
          </h1>
          <Link to="/products" className="flex items-center text-green-600 hover:text-green-700">
            <ArrowLeft size={16} className="mr-2" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-200 text-sm font-medium text-gray-600">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <div key={item.productId} className="p-4 md:p-6">
                    <div className="md:grid md:grid-cols-12 md:gap-4 md:items-center">
                      <div className="md:col-span-6 flex items-center mb-4 md:mb-0">
                        <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                          <img
                            src={item?.product?.image || '/placeholder.png'}
                            alt={item?.product?.name || 'Product'}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <Link to={`/products/${item.productId}`} className="text-gray-800 font-medium hover:text-green-600 line-clamp-2">
                            {item?.product?.name || 'Unnamed Product'}
                          </Link>
                          <div className="text-sm text-gray-500 mt-1">In Stock</div>
                          <div className="md:hidden mt-2 flex justify-between">
                            <span className="text-gray-600">
                              ₹{(item?.product?.price || 0).toFixed(2)}
                            </span>
                            <span className="font-medium">
                              ₹{((item?.product?.price || 0) * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="hidden md:block md:col-span-2 text-center text-gray-800">
                        ₹{(item?.product?.price || 0).toFixed(2)}
                      </div>

                      <div className="md:col-span-2 md:text-center mt-4 md:mt-0">
                        <div className="flex items-center justify-start md:justify-center">
                          <button
                            onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                            disabled={item.quantity <= 1 || loading}
                            className="w-8 h-8 rounded-l-md bg-gray-100 flex items-center justify-center border border-gray-300 hover:bg-gray-200 disabled:opacity-50"
                          >
                            <Minus size={16} />
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value) || 1)}
                            className="w-12 h-8 border-y border-gray-300 text-center"
                            min="1"
                            disabled={loading}
                          />
                          <button
                            onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                            disabled={loading}
                            className="w-8 h-8 rounded-r-md bg-gray-100 flex items-center justify-center border border-gray-300 hover:bg-gray-200 disabled:opacity-50"
                          >
                            <Plus size={16} />
                          </button>
                          <button
                            onClick={() => handleRemoveItem(item.productId)}
                            disabled={loading}
                            className="ml-4 text-red-500 hover:text-red-600 md:hidden p-1"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>

                      <div className="hidden md:flex md:col-span-2 md:justify-end md:items-center">
                        <span className="font-medium text-gray-800 mr-4">
                          ₹{((item?.product?.price || 0) * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => handleRemoveItem(item.productId)}
                          disabled={loading}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800 font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-800 font-medium">
                    {shippingCost === 0 ? <span className="text-green-600">Free</span> : `₹${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-800 font-medium">₹{taxAmount.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {subtotal < 100 && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
                  <p className="text-sm text-blue-700">
                    Add <span className="font-medium">₹{(100 - subtotal).toFixed(2)}</span> more for free shipping!
                  </p>
                </div>
              )}

              <Link to="/checkout" className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-md font-medium mb-4 transition-colors">
                Proceed to Checkout
              </Link>

              <div className="text-center text-xs text-gray-500 flex items-center justify-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Cart;
