import React from 'react';
import { Leaf } from 'lucide-react';

const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Leaf className="text-green-500" size={24} />
      <span className="text-xl font-bold">AgroMart</span>
    </div>
  );
};

export default Logo;