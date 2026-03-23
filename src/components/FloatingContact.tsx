'use client';

import { useState } from 'react';

export default function FloatingContact() {
  const [showContact, setShowContact] = useState(false);

  const toggleContact = () => {
    setShowContact(!showContact);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Contact Button */}
      <button
        onClick={toggleContact}
        className="w-14 h-14 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Toggle contact details"
      >
        <i className="fas fa-user text-xl"></i>
      </button>

      {/* Contact Details Popup */}
      {showContact && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-2xl p-4 w-64 border border-gray-200 animate-fade-in">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-900">Contact Us</h3>
            <button
              onClick={() => setShowContact(false)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close contact details"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <i className="fas fa-map-marker-alt text-red-500 mr-2 w-4"></i>
              <span>123 Luxury Avenue, Nairobi, Kenya</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-phone text-blue-500 mr-2 w-4"></i>
              <span>+254 123 456 789</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-envelope text-green-500 mr-2 w-4"></i>
              <span>info@kwetuplace.com</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
