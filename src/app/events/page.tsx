'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import Image from 'next/image';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  price: string;
  image: string;
  category: string;
  location: string;
  organizer: string;
  dressCode?: string;
}

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const events: Event[] = [
    {
      id: 1,
      title: 'Live Jazz Night',
      date: '2024-12-25',
      time: '7:00 PM',
      description: 'Enjoy an evening of smooth jazz performances by local and international artists. Includes complimentary welcome drink.',
      price: '',
      image: '/images/events/Events 1.jpeg',
      category: 'Music',
      location: 'Main Lounge',
      organizer: 'Kwetu Entertainment',
      dressCode: 'Smart Casual'
    },
    {
      id: 2,
      title: 'International Food Festival',
      date: '2024-12-28',
      time: '12:00 PM',
      description: 'Taste cuisines from around the world with live cooking demonstrations and food tastings from renowned chefs.',
      price: '',
      image: '/images/events/Events 2.jpeg',
      category: 'Food & Drink',
      location: 'Rooftop Terrace',
      organizer: 'Kwetu Culinary Team',
      dressCode: 'Casual'
    },
    {
      id: 3,
      title: 'New Year Eve Gala',
      date: '2024-12-31',
      time: '9:00 PM',
      description: 'Ring in the new year with style! Live DJ, premium open bar, gourmet dinner, and midnight champagne toast.',
      price: '',
      image: 'fa-champagne-glasses',
      category: 'Celebration',
      location: 'Grand Ballroom',
      organizer: 'Kwetu Events Team',
      dressCode: 'Formal Attire'
    },
    {
      id: 4,
      title: 'Wine Tasting Evening',
      date: '2025-01-05',
      time: '6:00 PM',
      description: 'Explore premium wines from our curated collection with expert sommeliers and cheese pairings.',
      price: '',
      image: 'fa-wine-glass',
      category: 'Food & Drink',
      location: 'Wine Cellar',
      organizer: 'Kwetu Sommelier Club',
      dressCode: 'Business Casual'
    },
    {
      id: 5,
      title: 'Business Networking Mixer',
      date: '2025-01-10',
      time: '5:30 PM',
      description: 'Connect with local business leaders and entrepreneurs in a relaxed atmosphere with refreshments.',
      price: '',
      image: 'fa-briefcase',
      category: 'Networking',
      location: 'Conference Room A',
      organizer: 'Kwetu Business Club',
      dressCode: 'Business Professional'
    },
    {
      id: 6,
      title: 'Romantic Dinner Under Stars',
      date: '2025-01-14',
      time: '7:30 PM',
      description: 'Special Valentine\'s preview dinner with live acoustic music and specially curated menu for couples.',
      price: '',
      image: 'fa-heart',
      category: 'Romantic',
      location: 'Sky Garden',
      organizer: 'Kwetu Romance Club',
      dressCode: 'Semi-Formal'
    }
  ];

  const filteredEvents = events;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const sortedEvents = filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const renderEventImage = (image: string) => {
    if (image.startsWith('/images/')) {
      return (
        <Image 
          src={image} 
          alt="Event" 
          width={300}
          height={128}
          className="w-full h-32 object-cover rounded-lg"
        />
      );
    }
    return <i className={`fas ${image}`}></i>;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover exclusive events at Kwetu Place. Join us for memorable experiences and community gatherings.
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
            {sortedEvents.map((event) => (
              <div 
                key={event.id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                {/* Image - 100% of card height */}
                <div className="h-56 relative bg-cover bg-center bg-no-repeat" 
                     style={{ backgroundImage: `url('/images/events/Events ${event.id === 1 ? '1' : event.id === 2 ? '2' : '1'}.jpeg')` }}>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Event Detail Modal */}
          {selectedEvent && (
            <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all">
                {/* Modal Header with Image Background */}
                <div className="relative h-64 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-t-2xl">
                  <div className="absolute inset-0 bg-black bg-opacity-20 rounded-t-2xl"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-6xl mb-2 drop-shadow-lg">
                        {renderEventImage(selectedEvent.image)}
                      </div>
                      <h2 className="text-3xl font-bold drop-shadow-lg">{selectedEvent.title}</h2>
                    </div>
                  </div>
                  
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 rounded-full w-10 h-10 flex items-center justify-center transition-all"
                  >
                    <i className="fas fa-times text-xl"></i>
                  </button>
                </div>
                
                {/* Event Details */}
                <div className="p-8">
                  {/* Quick Info Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
                      {selectedEvent.category}
                    </span>
                    <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      AVAILABLE
                    </span>
                  </div>
                  
                  {/* Event Information Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <i className="far fa-calendar text-white"></i>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Date</p>
                          <p className="text-gray-600">{formatDate(selectedEvent.date)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <i className="far fa-clock text-white"></i>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Time</p>
                          <p className="text-gray-600">{selectedEvent.time}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <i className="fas fa-map-marker-alt text-white"></i>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Location</p>
                          <p className="text-gray-600">{selectedEvent.location}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <i className="fas fa-user-tie text-white"></i>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Organizer</p>
                          <p className="text-gray-600">{selectedEvent.organizer}</p>
                        </div>
                      </div>
                      
                      {selectedEvent.dressCode && (
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <i className="fas fa-tshirt text-white"></i>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Dress Code</p>
                            <p className="text-gray-600">{selectedEvent.dressCode}</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <i className="fas fa-ticket-alt text-white"></i>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Entry</p>
                          <p className="text-gray-600">Open to All</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">About This Event</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedEvent.description}</p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-xl transition-colors"
                    >
                      Close
                    </button>
                    <button
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-xl transition-colors"
                    >
                      Reserve Spot
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Events Information */}
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">About Our Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-gift text-white text-2xl"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Free Entry</h4>
                <p className="text-gray-600">All events are complimentary for our members and their guests as part of our premium experience</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-users text-white text-2xl"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Community Focused</h4>
                <p className="text-gray-600">Connect with like-minded individuals in an elegant and welcoming atmosphere</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-star text-white text-2xl"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Premium Quality</h4>
                <p className="text-gray-600">Curated events featuring top performers, chefs, and speakers in their fields</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
