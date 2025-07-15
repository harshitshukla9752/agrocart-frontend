import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Leaf } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Smart Agriculture',
    subtitle: 'Technology-Driven Farming Solutions',
    description: 'Embrace the future of farming with our innovative tools and smart farming technologies.',
    image: 'https://images.unsplash.com/photo-1586769852836-f2768af9d197?auto=format&fit=crop&w=1470&q=80',
    cta: { text: 'Discover Tech', link: '/products/tech' },
    videoCta: { text: 'View Demo', link: '#' },
  },
  {
    id: 2,
    title: 'Organic Farming',
    subtitle: 'Sustainable Growing Practices',
    description: 'Premium quality, environmentally friendly products for the health-conscious farmer.',
    image: 'https://images.unsplash.com/photo-1564518098553-4c4c3b4f8d89?auto=format&fit=crop&w=1470&q=80',
    cta: { text: 'Shop Organic', link: '/products/organic' },
  },
  {
    id: 3,
    title: 'Seasonal Sale',
    subtitle: 'Up to 40% Off on Select Items',
    description: 'Limited time offer on seeds, fertilizers, and essential farming equipment.',
    image: 'https://images.unsplash.com/photo-1518976024611-488adf0b23ec?auto=format&fit=crop&w=1470&q=80',
    cta: { text: 'Shop Now', link: '/products/sale' },
  }
];



const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div 
      className="relative h-[500px] md:h-[600px] overflow-hidden bg-gray-50"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="container mx-auto text-center text-white max-w-4xl">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 rounded-full mb-6">
                <Leaf className="text-white" size={20} />
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-3 text-white">
                {slide.title}
              </h1>

              <h2 className="text-lg md:text-xl font-medium mb-4 text-gray-100">
                {slide.subtitle}
              </h2>

              <p className="text-base mb-8 max-w-2xl mx-auto text-gray-200">
                {slide.description}
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors duration-200">
                  <span>{slide.cta.text}</span>
                  <ChevronRight size={18} />
                </button>

                {slide.videoCta && (
                  <button className="bg-white/20 border-2 border-white/50 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors duration-200">
                    <Play size={18} />
                    {slide.videoCta.text}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      <button 
        className="absolute top-1/2 left-4 z-20 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-gray-800 rounded-full flex items-center justify-center transition-colors duration-200"
        onClick={goToPrevSlide}
      >
        <ChevronLeft size={20} />
      </button>

      <button 
        className="absolute top-1/2 right-4 z-20 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-gray-800 rounded-full flex items-center justify-center transition-colors duration-200"
        onClick={goToNextSlide}
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-6 left-0 right-0 z-20">
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentSlide === index 
                  ? 'bg-white' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
