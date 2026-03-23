'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';

export default function Requests() {
  const [formData, setFormData] = useState({
    name: '',
    requestType: '',
    requestDescription: '',
    urgency: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

  const requestTypes = [
    { value: 'room-decoration', label: 'Room Decoration' },
    { value: 'special-meals', label: 'Special Dietary Requirements' },
    { value: 'pickup-service', label: 'Airport Pickup/Drop-off' },
    { value: 'special-occasion', label: 'Special Occasion Arrangements' },
    { value: 'extra-amenities', label: 'Extra Amenities' },
    { value: 'maintenance', label: 'Maintenance Issues' },
    { value: 'other', label: 'Other Custom Request' },
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low - Can wait 24-48 hours' },
    { value: 'medium', label: 'Medium - Within 24 hours' },
    { value: 'high', label: 'High - Within 4-6 hours' },
    { value: 'urgent', label: 'Urgent - Immediate attention needed' },
  ];

  const exampleRequests = [
    {
      type: 'Room Decoration',
      description: 'Anniversary room setup with flowers and champagne',
    },
    {
      type: 'Special Meals',
      description: 'Vegan gluten-free dinner for two guests',
    },
    {
      type: 'Pickup Service',
      description: 'Airport pickup from Jomo Kenyatta International Airport',
    },
    {
      type: 'Special Occasion',
      description: 'Birthday party arrangement for 10 people in conference room',
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Customer Requests</h1>
            <p className="text-gray-600 mb-8">Let us know how we can make your stay exceptional</p>

            {isSubmitted ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                <strong>Request Submitted!</strong> We have received your request and our team will get back to you shortly to confirm the details.
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
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

              <div>
                <label htmlFor="requestType" className="block text-sm font-medium text-gray-700 mb-2">
                  Request Type *
                </label>
                <select
                  id="requestType"
                  name="requestType"
                  required
                  value={formData.requestType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="">Select request type</option>
                  {requestTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency Level *
                </label>
                <select
                  id="urgency"
                  name="urgency"
                  required
                  value={formData.urgency}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="">Select urgency</option>
                  {urgencyLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="requestDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  Request Details *
                </label>
                <textarea
                  id="requestDescription"
                  name="requestDescription"
                  required
                  rows={6}
                  value={formData.requestDescription}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Please describe your request in detail. Include any specific requirements, preferences, or timing needs..."
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Example Requests:</h3>
                <div className="space-y-3">
                  {exampleRequests.map((example, index) => (
                    <div key={index} className="bg-white p-3 rounded border border-blue-100">
                      <div className="font-medium text-gray-900 mb-1">{example.type}</div>
                      <div className="text-sm text-gray-600">{example.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Important Information:</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li><i className="fas fa-info-circle text-blue-500"></i> Some requests may require additional charges</li>
                  <li><i className="fas fa-info-circle text-blue-500"></i> We’ll confirm availability and pricing before proceeding</li>
                  <li><i className="fas fa-info-circle text-blue-500"></i> Urgent requests will be prioritized accordingly</li>
                  <li><i className="fas fa-info-circle text-blue-500"></i> Please provide at least 4 hours notice for special arrangements</li>
                </ul>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
