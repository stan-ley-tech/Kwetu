import Image from 'next/image';

import { useState } from 'react';

interface Style {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  duration: string;
  image: string;
}

const styles: Style[] = [
  {
    id: 1,
    name: 'Classic Executive',
    category: 'Business',
    description: 'Professional cut perfect for corporate environments',
    price: '$35',
    duration: '30 mins',
    image: '/images/hero/Hero Auto.jpg'
  },
  {
    id: 2,
    name: 'Modern Fade',
    category: 'Trendy',
    description: 'Contemporary fade with precision lining',
    price: '$40',
    duration: '45 mins',
    image: '/images/hero/Hero barber.jpg'
  },
  {
    id: 3,
    name: 'Beard Sculpture',
    category: 'Beard',
    description: 'Artistic beard shaping and styling',
    price: '$30',
    duration: '25 mins',
    image: '/images/hero/Hero Auto.jpg'
  },
  {
    id: 4,
    name: 'Gentleman\'s Cut',
    category: 'Classic',
    description: 'Timeless traditional barber cut',
    price: '$25',
    duration: '30 mins',
    image: '/images/hero/Hero barber.jpg'
  },
  {
    id: 5,
    name: 'Textured Crop',
    category: 'Modern',
    description: 'Stylish textured short cut',
    price: '$35',
    duration: '35 mins',
    image: '/images/hero/Hero Auto.jpg'
  },
  {
    id: 6,
    name: 'Hot Towel Shave',
    category: 'Shave',
    description: 'Luxurious traditional hot towel shave',
    price: '$25',
    duration: '20 mins',
    image: '/images/hero/Hero barber.jpg'
  },
];

export default function StyleCatalog() {
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(null);

  const filteredStyles = styles;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Style Catalog</h2>
      <p className="text-gray-600 mb-8">Browse our signature styles and find your perfect look</p>

      {/* Styles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {filteredStyles.map((style) => (
          <div
            key={style.id}
            className="relative border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-80"
            onClick={() => setSelectedStyle(style)}
          >
            {/* Background Image */}
            <Image
              src={style.image}
              alt={style.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
            />
            
            {/* Overlay Content */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6">
              <div className="text-white">
                <span className="inline-block bg-yellow-500 text-yellow-900 text-xs px-3 py-1 rounded-full mb-2">
                  {style.category}
                </span>
                <h3 className="font-semibold text-lg mb-2">{style.name}</h3>
                <p className="text-sm mb-3">{style.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">{style.price}</span>
                  <span className="text-xs opacity-75">{style.duration}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Style Detail Modal */}
      {selectedStyle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedStyle.name}</h3>
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">
                    {selectedStyle.category}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedStyle(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <i className={`fas ${selectedStyle.image} text-5xl text-yellow-500`}></i>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 mb-4">{selectedStyle.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Price:</span>
                      <span className="font-bold text-gray-900">{selectedStyle.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Duration:</span>
                      <span className="text-gray-600">{selectedStyle.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedStyle(null)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedStyle(null);
                    // Scroll to booking form
                    document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded transition-colors"
                >
                  Book This Style
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
