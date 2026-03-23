'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import StyleCatalog from './components/StyleCatalog';
import HomeVisitService from './components/HomeVisitService';

export default function Barber() {
  const [activeTab, setActiveTab] = useState('booking');

  const tabs = [
    { id: 'booking', name: 'Book Appointment', icon: 'fa-calendar-check' },
    { id: 'catalog', name: 'Style Catalog', icon: 'fa-book' },
    { id: 'home-visit', name: 'Home Visit', icon: 'fa-car' },
  ];

  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    serviceType: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const serviceTypes = [
    { value: 'haircut', label: 'Haircut - Ksh 25', duration: '30 mins' },
    { value: 'shave', label: 'Traditional Shave - Ksh 20', duration: '20 mins' },
    { value: 'full-grooming', label: 'Full Grooming - Ksh 45', duration: '60 mins' },
    { value: 'beard-trim', label: 'Beard Trim - Ksh 15', duration: '15 mins' },
    { value: 'haircut-shave', label: 'Haircut & Shave - Ksh 40', duration: '45 mins' },
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Premium Barber Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience luxury grooming with our expert barbers. Choose from in-salon appointments, style catalogs, or premium home visits.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-yellow-500 text-gray-900'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                <i className={`fas ${tab.icon}`}></i>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'booking' && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Book Salon Appointment</h2>
              <p className="text-gray-600 mb-8">Schedule your grooming appointment at our premium barber shop</p>

              {isSubmitted ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  <strong>Appointment Booked!</strong> Your barber appointment has been scheduled. We'll send you a confirmation reminder.
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-6" id="booking-form">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Time *
                    </label>
                    <select
                      id="time"
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Type *
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    required
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="">Select service</option>
                    {serviceTypes.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.label} ({service.duration})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Services Include:</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><i className="fas fa-check text-green-500"></i> Professional consultation</p>
                    <p><i className="fas fa-check text-green-500"></i> Hot towel treatment</p>
                    <p><i className="fas fa-check text-green-500"></i> Premium grooming products</p>
                    <p><i className="fas fa-check text-green-500"></i> Complementary beverages</p>
                    <p><i className="fas fa-check text-green-500"></i> Relaxing atmosphere</p>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Barber Shop Hours:</h3>
                  <div className="text-sm text-gray-600">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 5:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Book Appointment
                </button>
              </form>
            </div>
          )}

          {activeTab === 'catalog' && <StyleCatalog />}
          {activeTab === 'home-visit' && <HomeVisitService />}

          {/* Premium Features */}
          <div className="mt-12 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Why Choose Our Barber Services?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-award text-white text-2xl"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Expert Barbers</h4>
                <p className="text-gray-600">Certified professionals with years of experience in modern and classic styles</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-mobile-alt text-white text-2xl"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Modern Techniques</h4>
                <p className="text-gray-600">Latest grooming methods and premium products for exceptional results</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-home text-white text-2xl"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Premium Home Service</h4>
                <p className="text-gray-600">Luxury barber experience delivered to your doorstep with full sanitization</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
