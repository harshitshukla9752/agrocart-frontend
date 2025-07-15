import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <div className="mt-5">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Page Not Found</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-medium w-full sm:w-auto"
            >
              <ArrowLeft size={18} />
              Go to Homepage
            </Link>
            <Link
              to="/products"
              className="flex items-center justify-center bg-white border border-green-500 text-green-600 hover:bg-green-50 px-6 py-3 rounded-md font-medium w-full sm:w-auto"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;