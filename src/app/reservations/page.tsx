'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';

interface CartItem {
  id: string;
  type: string;
  name: string;
  date: string;
  price: number;
  quantity: number;
}

export default function Reservations() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guests: '',
    specialRequests: '',
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const eventTypes = [
    { 
      value: 'wedding', 
      label: 'Wedding Reception', 
      basePrice: 5000,
      description: 'Complete wedding venue setup with catering'
    },
    { 
      value: 'corporate', 
      label: 'Corporate Event', 
      basePrice: 3000,
      description: 'Business meetings, conferences, product launches'
    },
    { 
      value: 'birthday', 
      label: 'Birthday Party', 
      basePrice: 1500,
      description: 'Birthday celebrations with decorations and catering'
    },
    { 
      value: 'anniversary', 
      label: 'Anniversary Celebration', 
      basePrice: 2000,
      description: 'Romantic anniversary dinners and celebrations'
    },
    { 
      value: 'graduation', 
      label: 'Graduation Party', 
      basePrice: 1800,
      description: 'Graduation celebrations and ceremonies'
    },
    { 
      value: 'private-dinner', 
      label: 'Private Dinner', 
      basePrice: 1200,
      description: 'Intimate private dining experiences'
    },
  ];

  const addOns = [
    { id: 'catering', name: 'Premium Catering', price: 50 },
    { id: 'decoration', name: 'Event Decoration', price: 800 },
    { id: 'photography', name: 'Professional Photography', price: 500 },
    { id: 'music', name: 'Live Music/DJ', price: 600 },
    { id: 'transport', name: 'Airport Transfer', price: 100 },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddToCart = () => {
    if (!formData.eventType || !formData.eventDate || !formData.guests) {
      alert('Please fill in all required fields');
      return;
    }

    const selectedEvent = eventTypes.find(e => e.value === formData.eventType);
    if (!selectedEvent) return;

    const basePrice = selectedEvent.basePrice;
    const guestCount = parseInt(formData.guests);
    const totalPrice = basePrice + (guestCount * 100); // Ksh 100 per guest additional

    const cartItem: CartItem = {
      id: Date.now().toString(),
      type: 'event',
      name: selectedEvent.label,
      date: formData.eventDate,
      price: totalPrice,
      quantity: guestCount,
    };

    setCart([...cart, cartItem]);
    setShowCheckout(true);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
    if (cart.length <= 1) {
      setShowCheckout(false);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Please fill in your contact information');
      return;
    }
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setCart([]);
      setShowCheckout(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        guests: '',
        specialRequests: '',
      });
    }, 5000);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Event Reservations</h1>
            <p className="text-gray-600 mb-8">Book your special event at Kwetu Place</p>

            {isSubmitted ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                <strong>Booking Confirmed!</strong> Your event reservation has been confirmed. We will contact you within 24 hours to finalize details.
              </div>
            ) : null}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Event Selection Form */}
              <div className={showCheckout ? "lg:col-span-2" : "lg:col-span-3"}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-2">
                        Event Type *
                      </label>
                      <select
                        id="eventType"
                        name="eventType"
                        required
                        value={formData.eventType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                      >
                        <option value="">Select event type</option>
                        {eventTypes.map((event) => (
                          <option key={event.value} value={event.value}>
                            {event.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Guests *
                      </label>
                      <select
                        id="guests"
                        name="guests"
                        required
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                      >
                        <option value="">Select guests</option>
                        <option value="10">10-20 Guests</option>
                        <option value="30">20-30 Guests</option>
                        <option value="50">30-50 Guests</option>
                        <option value="100">50-100 Guests</option>
                        <option value="150+">100+ Guests</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      required
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                    />
                  </div>

                  {formData.eventType && (
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">Event Details</h3>
                      <p className="text-gray-600">
                        {eventTypes.find(e => e.value === formData.eventType)?.description}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Base price includes venue setup and basic amenities. Additional charges may apply based on guest count and customizations.
                      </p>
                    </div>
                  )}

                  <div>
                    <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requests
                    </label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      rows={4}
                      value={formData.specialRequests}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                      placeholder="Tell us about any special requirements, dietary restrictions, or custom arrangements you need..."
                    />
                  </div>

                  {!showCheckout && (
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                      Add to Cart & Continue to Checkout
                    </button>
                  )}
                </div>
              </div>

              {/* Checkout Sidebar */}
              {showCheckout && (
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
                    
                    {cart.map((item) => (
                      <div key={item.id} className="mb-4 pb-4 border-b border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">
                              {new Date(item.date).toLocaleDateString()} • {item.quantity} guests
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="font-bold text-gray-900">${item.price.toLocaleString()}</p>
                      </div>
                    ))}

                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-semibold">Ksh {getTotalPrice().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Service Fee (10%)</span>
                        <span className="font-semibold">Ksh {(getTotalPrice() * 0.1).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total</span>
                        <span>Ksh {(getTotalPrice() * 1.1).toLocaleString()}</span>
                      </div>
                    </div>

                    <form onSubmit={handleCheckout} className="space-y-4">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                          placeholder="+254 123 456 789"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                      >
                        Complete Reservation
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowCheckout(false)}
                        className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors"
                      >
                        Back to Booking
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Information */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">What's Included:</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li><i className="fas fa-check text-green-500"></i> Premium event venue setup</li>
                  <li><i className="fas fa-check text-green-500"></i> Basic lighting and sound system</li>
                  <li><i className="fas fa-check text-green-500"></i> Event coordinator assistance</li>
                  <li><i className="fas fa-check text-green-500"></i> Standard decorations</li>
                  <li><i className="fas fa-check text-green-500"></i> Parking facilities</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Payment Terms:</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li><i className="fas fa-credit-card text-blue-500"></i> 30% deposit required to confirm</li>
                  <li><i className="fas fa-credit-card text-blue-500"></i> Balance due 7 days before event</li>
                  <li><i className="fas fa-times-circle text-orange-500"></i> Free cancellation up to 14 days prior</li>
                  <li><i className="fas fa-credit-card text-blue-500"></i> Multiple payment methods accepted</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
