import React from 'react';

const Loader = ({ 
  variant = 'spinner',
  size = 'medium', 
  color = 'green',
  overlay = false,
  text,
  className = ''
}) => {
  // Size variants with improved proportions
  const sizeClasses = {
    tiny: 'w-4 h-4',
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  // Enhanced color combinations
  const colorClasses = {
    green: 'border-green-100 border-t-green-500',
    blue: 'border-blue-100 border-t-blue-500',
    red: 'border-red-100 border-t-red-500',
    yellow: 'border-yellow-100 border-t-yellow-500',
    purple: 'border-purple-100 border-t-purple-500',
    gray: 'border-gray-100 border-t-gray-500'
  };

  const renderSpinner = () => (
    <div className={`
      border-[3px] rounded-full animate-spin
      ${sizeClasses[size]}
      ${colorClasses[color]}
      ${className}
    `} />
  );

  const renderDots = () => (
    <div className="flex space-x-2">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className={`
            rounded-full animate-[bounce_1s_ease-in-out_infinite]
            bg-${color}-500
            ${size === 'tiny' ? 'w-1.5 h-1.5' : 
              size === 'small' ? 'w-2 h-2' :
              size === 'medium' ? 'w-3 h-3' :
              size === 'large' ? 'w-4 h-4' : 'w-5 h-5'}
          `}
          style={{ animationDelay: `${i * 0.16}s` }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <div className="relative">
      <div className={`
        rounded-full
        ${sizeClasses[size]}
        bg-${color}-500/20
      `}>
        <div className={`
          absolute inset-0 rounded-full
          bg-${color}-500/40
          animate-[ping_1s_cubic-bezier(0,0,0.2,1)_infinite]
        `} />
      </div>
    </div>
  );

  const renderRings = () => (
    <div className="relative">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className={`
            absolute inset-0 rounded-full border-2
            border-${color}-500/60
            animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]
            ${sizeClasses[size]}
          `}
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
      <div className={`
        rounded-full
        ${sizeClasses[size]}
        bg-${color}-500/20
      `} />
    </div>
  );

  const renderProgress = () => (
    <div className={`
      relative w-full h-2 bg-${color}-100 
      rounded-full overflow-hidden
    `}>
      <div className={`
        absolute inset-y-0 w-1/3 bg-${color}-500
        rounded-full animate-[progress_1s_ease-in-out_infinite]
      `} />
    </div>
  );

  const variants = {
    spinner: renderSpinner,
    dots: renderDots,
    pulse: renderPulse,
    rings: renderRings,
    progress: renderProgress
  };

  const loader = (
    <div className={`
      flex flex-col items-center justify-center
      ${className}
    `}>
      {variants[variant]()}
      {text && (
        <p className={`
          mt-3 text-sm text-gray-600
          animate-[pulse_2s_ease-in-out_infinite]
        `}>
          {text}
        </p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {loader}
        </div>
      </div>
    );
  }

  return loader;
};

export default Loader;