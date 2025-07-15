import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, ArrowUp } from 'lucide-react';
import Logo from '../assets/logo';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-slate-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <Logo className="mb-4" />
            <p className="text-gray-300 mb-4">
              Empowering farmers with premium agricultural solutions.
              We're committed to sustainable farming practices and
              helping you achieve exceptional harvests.
            </p>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center text-gray-300">
                <MapPin className="mr-2 text-green-500" size={18} />
                <span>123 Agriculture Street, Farm City, FC 12345</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="mr-2 text-green-500" size={18} />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="mr-2 text-green-500" size={18} />
                <span>support@agromart.com</span>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="flex space-x-4 mt-6">
              <Link to="#" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors">
                <Facebook size={16} />
              </Link>
              <Link to="#" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors">
                <Twitter size={16} />
              </Link>
              <Link to="#" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors">
                <Instagram size={16} />
              </Link>
              <Link to="#" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors">
                <Youtube size={16} />
              </Link>
            </div>
          </div>
          
          {/* Company Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-green-500">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-green-400 transition-colors">About Us</Link></li>
              <li><Link to="/our-story" className="text-gray-300 hover:text-green-400 transition-colors">Our Story</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-green-400 transition-colors">Careers</Link></li>
              <li><Link to="/press" className="text-gray-300 hover:text-green-400 transition-colors">Press</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-green-400 transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          {/* Products Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-green-500">Products</h3>
            <ul className="space-y-2">
              <li><Link to="/products/seeds" className="text-gray-300 hover:text-green-400 transition-colors">Seeds</Link></li>
              <li><Link to="/products/tools" className="text-gray-300 hover:text-green-400 transition-colors">Tools</Link></li>
              <li><Link to="/products/fertilizers" className="text-gray-300 hover:text-green-400 transition-colors">Fertilizers</Link></li>
              <li><Link to="/products/equipment" className="text-gray-300 hover:text-green-400 transition-colors">Equipment</Link></li>
              <li><Link to="/products/pesticides" className="text-gray-300 hover:text-green-400 transition-colors">Pesticides</Link></li>
            </ul>
          </div>
          
          {/* Support Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-green-500">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-300 hover:text-green-400 transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-green-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="text-gray-300 hover:text-green-400 transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="text-gray-300 hover:text-green-400 transition-colors">Returns</Link></li>
              <li><Link to="/track-order" className="text-gray-300 hover:text-green-400 transition-colors">Track Order</Link></li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-700 my-8" />
        
        {/* Newsletter */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-green-500 mb-4">Stay Connected</h3>
          <p className="text-gray-300 mb-4">Subscribe to our newsletter for the latest agricultural tips and exclusive offers</p>
          <div className="flex flex-col sm:flex-row justify-center gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address"
              className="px-4 py-2 rounded-md bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 flex-grow"
            />
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors">
              Subscribe
            </button>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm mt-8">
          <p>&copy; {new Date().getFullYear()} AgroMart. All rights reserved.</p>
        </div>
      </div>
      
      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;