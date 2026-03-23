'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import ServicesCatalog from './components/ServicesCatalog';
import AutoDetailing from './components/MobileService';

export default function CarWash() {
  const [activeTab, setActiveTab] = useState('booking');

  const tabs = [
    { id: 'booking', name: 'Book Service', icon: 'fa-calendar-check' },
    { id: 'catalog', name: 'Services Catalog', icon: 'fa-book' },
    { id: 'mobile', name: 'Auto Detailing', icon: 'fa-truck' },
  ];

  const [formData, setFormData] = useState({
    name: '',
    carType: '',
    serviceType: '',
    date: '',
    time: '',
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

  const carTypes = [
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'truck', label: 'Truck' },
    { value: 'van', label: 'Van' },
    { value: 'luxury', label: 'Luxury Vehicle' },
    { value: 'other', label: 'Other' },
  ];

  const serviceTypes = [
    { value: 'basic', label: 'Basic Wash - $20', duration: '30 mins', features: ['Exterior wash', 'Window cleaning', 'Tire shine'] },
    { value: 'premium', label: 'Premium Wash - $35', duration: '45 mins', features: ['Exterior wash', 'Interior vacuum', 'Window cleaning', 'Tire shine', 'Dashboard polish'] },
    { value: 'full-detailing', label: 'Full Detailing - $80', duration: '2 hours', features: ['Complete exterior wash', 'Deep interior cleaning', 'Wax application', 'Leather treatment', 'Engine cleaning', 'Air freshener'] },
  ];

  const timeSlots = [
    '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM'
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Premium Car Wash Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional car care with advanced technology. Choose from in-shop services, comprehensive catalogs, or convenient mobile detailing.
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
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
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
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Book In-Shop Service</h2>
              <p className="text-gray-600 mb-8">Schedule professional car cleaning at our premium facility</p>

              {isSubmitted ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  <strong>Booking Confirmed!</strong> Your car wash appointment has been scheduled. We'll send you a reminder before your appointment.
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="carType" className="block text-sm font-medium text-gray-700 mb-2">
                    Car Type *
                  </label>
                  <select
                    id="carType"
                    name="carType"
                    required
                    value={formData.carType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select car type</option>
                    {carTypes.map((car) => (
                      <option key={car.value} value={car.value}>
                        {car.label}
                      </option>
                    ))}
                  </select>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select service</option>
                    {serviceTypes.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.label} ({service.duration})
                      </option>
                    ))}
                  </select>
                </div>

                {formData.serviceType && (
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Service Includes:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {serviceTypes.find(s => s.value === formData.serviceType)?.features.map((feature, index) => (
                        <li key={index}><i className="fas fa-check-circle text-green-500"></i> {feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Car Wash Hours:</h3>
                    <div className="text-sm text-gray-600">
                      <p>Monday - Saturday: 8:00 AM - 6:00 PM</p>
                      <p>Sunday: 9:00 AM - 4:00 PM</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Additional Info:</h3>
                    <div className="text-sm text-gray-600">
                      <p><i className="fas fa-check text-green-500"></i> Eco-friendly products</p>
                      <p><i className="fas fa-check text-green-500"></i> Free WiFi while you wait</p>
                      <p><i className="fas fa-check text-green-500"></i> Waiting area available</p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Book Car Wash Service
                </button>
              </form>
            </div>
          )}

          {activeTab === 'catalog' && <ServicesCatalog />}
          {activeTab === 'mobile' && <AutoDetailing />}

          {/* Premium Features */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Why Choose Our Car Wash Services?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-tint text-white text-2xl"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Eco-Friendly Technology</h4>
                <p className="text-gray-600">Water conservation systems and biodegradable cleaning products for sustainable car care</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-mobile-alt text-white text-2xl"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Advanced Technology</h4>
                <p className="text-gray-600">Modern equipment and techniques for superior car care results</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-truck text-white text-2xl"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Mobile Convenience</h4>
                <p className="text-gray-600">Professional detailing service at your location with full equipment and expertise</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
