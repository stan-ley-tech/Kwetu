'use client';

import { useState } from 'react';

interface HomeVisitPackage {
  id: string;
  name: string;
  price: string;
  duration: string;
  features: string[];
  icon: string;
  popular?: boolean;
}

const homeVisitPackages: HomeVisitPackage[] = [
  {
    id: 'essential',
    name: 'Essential Home Visit',
    price: '$120',
    duration: '45 mins',
    features: [
      'Professional haircut at your location',
      'Basic styling and finishing',
      'Travel within 10km radius',
      'Clean equipment and sanitization'
    ],
    icon: 'fa-home'
  },
  {
    id: 'premium',
    name: 'Premium Home Experience',
    price: '$180',
    duration: '60 mins',
    features: [
      'Luxury haircut service',
      'Hot towel treatment',
      'Beard trim or shave',
      'Premium styling products',
      'Travel within 15km radius',
      'Complimentary refreshments'
    ],
    icon: 'fa-crown',
    popular: true
  },
  {
    id: 'vip',
    name: 'VIP Concierge Service',
    price: '$250',
    duration: '90 mins',
    features: [
      'Complete grooming experience',
      'Haircut, shave, and facial',
      'Massage treatment',
      'Premium product samples',
      'Travel within 25km radius',
      'Priority scheduling',
      'Personal consultation'
    ],
    icon: 'fa-gem'
  }
];

export default function HomeVisitService() {
  const [selectedPackage, setSelectedPackage] = useState('');
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setBookingForm({
      ...bookingForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage) {
      alert('Please select a service package');
      return;
    }
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
          <i className="fas fa-car text-2xl text-yellow-600"></i>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Premium Home Visit Service</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Enjoy professional barber services in the comfort of your home. Our expert barbers bring the salon experience to your doorstep.
        </p>
      </div>

      {/* Service Packages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {homeVisitPackages.map((pkg) => (
          <div
            key={pkg.id}
            onClick={() => setSelectedPackage(pkg.id)}
            className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all ${
              selectedPackage === pkg.id
                ? 'border-yellow-500 bg-yellow-50 shadow-lg'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </span>
              </div>
            )}
            
            <div className="text-center mb-4">
              <i className={`fas ${pkg.icon} text-3xl text-yellow-500 mb-3`}></i>
              <h3 className="font-semibold text-gray-900 mb-2">{pkg.name}</h3>
              <div className="text-2xl font-bold text-gray-900 mb-1">{pkg.price}</div>
              <div className="text-sm text-gray-600">{pkg.duration}</div>
            </div>
            
            <ul className="space-y-2 text-sm">
              {pkg.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <i className="fas fa-check text-green-500 mt-0.5 mr-2"></i>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="space-y-6" id="home-visit-form">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={bookingForm.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={bookingForm.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="+254 123 456 789"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Address *
          </label>
          <input
            type="text"
            name="address"
            required
            value={bookingForm.address}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="123 Luxury Avenue, Nairobi, Kenya"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Date *
            </label>
            <input
              type="date"
              name="date"
              required
              value={bookingForm.date}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Time *
            </label>
            <select
              name="time"
              required
              value={bookingForm.time}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="">Select time</option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="16:00">4:00 PM</option>
              <option value="17:00">5:00 PM</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Requests
          </label>
          <textarea
            name="notes"
            rows={3}
            value={bookingForm.notes}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="Any specific requirements or preferences..."
          />
        </div>

        {isSubmitted && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <strong>Booking Requested!</strong> Our concierge team will contact you within 2 hours to confirm your home visit appointment.
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Schedule Home Visit
        </button>
      </form>

      {/* Service Information */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">Service Area</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div><i className="fas fa-map-marker-alt text-red-500"></i> Nairobi Metropolitan Area</div>
            <div><i className="fas fa-map-marker-alt text-red-500"></i> Westlands, Karen, Lavington</div>
            <div><i className="fas fa-map-marker-alt text-red-500"></i> Kilimani, Kileleshwa</div>
            <div><i className="fas fa-phone text-blue-500"></i> Additional locations available upon request</div>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">What&apos;s Included</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div><i className="fas fa-shield-alt text-green-500"></i> Fully sanitized equipment</div>
            <div><i className="fas fa-certificate text-blue-500"></i> Certified professional barbers</div>
            <div><i className="fas fa-star text-yellow-500"></i> Premium quality products</div>
            <div><i className="fas fa-clock text-purple-500"></i> Punctual service guarantee</div>
          </div>
        </div>
      </div>
    </div>
  );
}
