'use client';

import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  const heroImages = useMemo(() => [
    '/images/hero/Hero.jpg',
    '/images/hero/Hero 2.jpg',
    '/images/hero/Hero 3.jpg',
    '/images/hero/Hero 4.jpg',
    '/images/hero/Hero 5.jpg'
  ], []);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState(-1);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(1); // Start with Auto Detailing on mobile

  // Preload all images
  useEffect(() => {
    heroImages.forEach((src) => {
      const img = document.createElement('img');
      img.src = src;
    });
  }, [heroImages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousImageIndex(currentImageIndex);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
      
      // Clear previous image after transition
      setTimeout(() => {
        setPreviousImageIndex(-1);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, [heroImages.length, currentImageIndex]);

  const goToImage = (index: number) => {
    setPreviousImageIndex(currentImageIndex);
    setCurrentImageIndex(index);
    
    // Clear previous image after transition
    setTimeout(() => {
      setPreviousImageIndex(-1);
    }, 500);
  };
  const quickActions = [
    {
      title: 'Barber',
      description: 'Schedule grooming appointments',
      href: '/barber',
      icon: 'fa-cut',
      image: '/images/hero/Hero barber.jpg'
    },
    {
      title: 'Auto Detailing',
      description: 'Professional car cleaning services',
      href: '/car-wash',
      icon: 'fa-car',
      image: '/images/hero/Hero Auto.jpg'
    },
  ];

  const handleCardClick = (action: typeof quickActions[0]) => {
    // Navigate to the service page using Next.js router
    router.push(action.href);
  };

  // Swipe handlers for mobile
  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentServiceIndex((prev) => (prev - 1 + quickActions.length) % quickActions.length);
    } else {
      setCurrentServiceIndex((prev) => (prev + 1) % quickActions.length);
    }
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touchStartX = e.touches[0].clientX;
    const handleTouchEnd = (e: React.TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0) {
          handleSwipe('left'); // Swiped left, show previous
        } else {
          handleSwipe('right'); // Swiped right, show next
        }
      }
      
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchend', handleTouchEnd);
  };

  const upcomingEvents = [
    {
      title: 'Live Music Night',
      date: 'Dec 25, 2024',
      description: 'Enjoy an evening of live jazz performances',
    },
    {
      title: 'Food Festival',
      date: 'Dec 28, 2024',
      description: 'Taste cuisines from around the world',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Current Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("${heroImages[currentImageIndex]}")`,
            zIndex: 2
          }}
        />
        
        {/* Previous Image Layer (for transition) */}
        {previousImageIndex >= 0 && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url("${heroImages[previousImageIndex]}")`,
              zIndex: 1,
              opacity: 0,
              animation: 'fadeOut 0.5s ease-in-out'
            }}
          />
        )}
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60" style={{ zIndex: 3 }}></div>
        
        {/* Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentImageIndex === index 
                  ? 'bg-yellow-500 scale-110' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="font-elegant-heading text-5xl md:text-7xl mb-6 text-white">
            Welcome to Kwetu Place
          </h1>
          <p className="font-elegant-tagline text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white">
            Come experience the magic
          </p>
          <Link
            href="/reservations"
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition-colors"
          >
            Explore greatness
          </Link>
        </div>
      </section>
      
      <style jsx>{`
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>

      {/* Reservation Details Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-elegant-heading text-3xl md:text-4xl mb-4 text-gray-900">
              Kwetu Place
            </h2>
            <p className="font-elegant-subtitle text-lg text-gray-600 max-w-2xl mx-auto">
              Your premier destination for luxury accommodations, grooming, and automotive care in Nairobi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-gray-50 rounded-xl p-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-phone text-white"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Reservations</h3>
              <p className="text-gray-600 text-sm">+254 123 456 789</p>
              <p className="text-gray-500 text-xs mt-1">24/7 Available</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-map-marker-alt text-white"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600 text-sm">Ruiru, Nairobi</p>
              <p className="text-gray-500 text-xs mt-1">Kenya</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-clock text-white"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Hours</h3>
              <p className="text-gray-600 text-sm">Mon-Sun: 6AM - 11PM</p>
              <p className="text-gray-500 text-xs mt-1">Always Open</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-elegant-heading text-4xl text-center mb-12 text-gray-900">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {quickActions.map((action, index) => (
              <>
                {/* Show both cards on desktop, only current on mobile */}
                <div
                  key={action.title}
                  className={`relative border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-80 ${
                    index === currentServiceIndex ? 'block' : 'hidden md:block'
                  }`}
                  onClick={() => handleCardClick(action)}
                  onTouchStart={handleTouchStart}
                >
                  {/* Background Image */}
                  <Image
                    src={action.image}
                    alt={action.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                  />
                  
                  {/* Overlay Content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-6">
                    <div className="text-white text-center">
                      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className={`fas ${action.icon} text-white text-xl`}></i>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                      <p className="text-sm mb-3">{action.description}</p>
                      
                      {/* Discover Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(action);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full text-sm transition-colors"
                      >
                        Discover Service
                      </button>
                    </div>
                  </div>
                </div>

                {/* Swipe Indicators - Only on mobile */}
                {index === currentServiceIndex && (
                  <div className="md:hidden flex justify-center space-x-2 mt-4">
                    {quickActions.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentServiceIndex(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          i === currentServiceIndex ? 'bg-yellow-500' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Kwetu Place Apparel */}
      <section className="py-20 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-elegant-subtitle text-2xl font-bold text-gray-900 text-center mb-6">Explore Kwetu Place Apparel?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-gem text-white text-2xl"></i>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Premium Quality</h4>
              <p className="text-gray-600">Only the finest materials and craftsmanship for lasting comfort and style</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-star text-white text-2xl"></i>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Exclusive Designs</h4>
              <p className="text-gray-600">Unique apparel collection you won&apos;t find anywhere else</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shipping-fast text-white text-2xl"></i>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Fast Delivery</h4>
              <p className="text-gray-600">Quick and reliable delivery to your preferred location</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
