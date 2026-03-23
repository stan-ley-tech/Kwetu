'use client';

import { useState } from 'react';

interface Service {
  id: number;
  name: string;
  category: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  icon: string;
  popular?: boolean;
}

const services: Service[] = [
  {
    id: 1,
    name: 'Express Wash',
    category: 'Basic',
    price: '$20',
    duration: '30 mins',
    description: 'Quick exterior wash for busy schedules',
    features: [
      'Exterior foam wash',
      'Rinse and dry',
      'Window cleaning',
      'Tire shine'
    ],
    icon: 'fa-bolt'
  },
  {
    id: 2,
    name: 'Premium Detail',
    category: 'Standard',
    price: '$35',
    duration: '45 mins',
    description: 'Complete interior and exterior cleaning',
    features: [
      'Full exterior wash',
      'Interior vacuum',
      'Dashboard polish',
      'Window cleaning',
      'Tire shine',
      'Air freshener'
    ],
    icon: 'fa-star',
    popular: true
  },
  {
    id: 3,
    name: 'Executive Detail',
    category: 'Premium',
    price: '$60',
    duration: '90 mins',
    description: 'Professional detailing for luxury vehicles',
    features: [
      'Advanced exterior wash',
      'Deep interior cleaning',
      'Leather conditioning',
      'Engine bay cleaning',
      'Paint protection',
      'Premium wax application'
    ],
    icon: 'fa-crown'
  },
  {
    id: 4,
    name: 'Ultimate Spa',
    category: 'Luxury',
    price: '$120',
    duration: '3 hours',
    description: 'Complete vehicle rejuvenation treatment',
    features: [
      'Paint correction',
      'Ceramic coating',
      'Full interior restoration',
      'Engine detailing',
      'Headlight restoration',
      'Odor elimination',
      'Paint sealant protection'
    ],
    icon: 'fa-gem'
  },
  {
    id: 5,
    name: 'Eco Green Wash',
    category: 'Eco-Friendly',
    price: '$45',
    duration: '60 mins',
    description: 'Environmentally conscious cleaning',
    features: [
      'Biodegradable products',
      'Water conservation techniques',
      'Non-toxic interior cleaners',
      'Eco-friendly wax',
      'Green certification'
    ],
    icon: 'fa-leaf'
  },
  {
    id: 6,
    name: 'Quick Detail Plus',
    category: 'Express',
    price: '$50',
    duration: '60 mins',
    description: 'Balanced service for regular maintenance',
    features: [
      'Express exterior wash',
      'Quick interior clean',
      'Basic wax application',
      'Window treatment',
      'Tire dressing'
    ],
    icon: 'fa-clock'
  }
];

export default function ServicesCatalog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const categories = ['All', 'Basic', 'Standard', 'Premium', 'Luxury', 'Eco-Friendly', 'Express'];
  
  const filteredServices = selectedCategory === 'All' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Services Catalog</h2>
      <p className="text-gray-600 mb-8">Explore our comprehensive range of professional car care services</p>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-yellow-500 text-gray-900'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedService(service)}
          >
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`fas ${service.icon} text-2xl text-yellow-500`}></i>
              </div>
              {service.popular && (
                <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full mb-2">
                  POPULAR
                </span>
              )}
              <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full mb-2">
                {service.category}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{service.description}</p>
            <div className="space-y-2 mb-4">
              {service.features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-center text-xs text-gray-600">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  {feature}
                </div>
              ))}
              {service.features.length > 3 && (
                <div className="text-xs text-gray-500">+{service.features.length - 3} more features</div>
              )}
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-gray-900">{service.price}</span>
              <span className="text-gray-500">{service.duration}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedService.name}</h3>
                  <div className="flex items-center space-x-3">
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">
                      {selectedService.category}
                    </span>
                    {selectedService.popular && (
                      <span className="inline-block bg-red-500 text-white text-sm px-3 py-1 rounded-full">
                        MOST POPULAR
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className={`fas ${selectedService.icon} text-4xl text-yellow-500`}></i>
                  </div>
                  <p className="text-gray-600 mb-4">{selectedService.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Price:</span>
                      <span className="font-bold text-gray-900">{selectedService.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Duration:</span>
                      <span className="text-gray-600">{selectedService.duration}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Complete Feature List:</h4>
                  <ul className="space-y-2">
                    {selectedService.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fas fa-check text-green-500 mt-0.5 mr-2"></i>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedService(null)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedService(null);
                    document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded transition-colors"
                >
                  Book This Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
