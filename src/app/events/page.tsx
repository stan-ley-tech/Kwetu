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

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState('All');
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
      title: 'Romantic Dinner Under the Stars',
      date: '2025-01-14',
      time: '7:30 PM',
      description: 'Special Valentine\'s preview dinner with live acoustic music and specially curated menu for couples.',
      price: '',
      image: 'fa-heart',
      category: 'Romantic',
      location: 'Sky Garden',
      organizer: 'Kwetu Romance Club',
      dressCode: 'Semi-Formal'
    },
    {
      id: 7,
      title: 'Art Exhibition Opening',
      date: '2025-01-18',
      time: '6:00 PM',
      description: 'Featuring works from local and international artists. Wine reception and guided tours available.',
      price: '',
      image: 'fa-palette',
      category: 'Arts & Culture',
      location: 'Art Gallery',
      organizer: 'Kwetu Arts Committee',
      dressCode: 'Cocktail Attire'
    },
    {
      id: 8,
      title: 'Wellness Workshop',
      date: '2025-01-22',
      time: '10:00 AM',
      description: 'Learn about mindfulness, yoga, and healthy living from certified wellness coaches.',
      price: '',
      image: 'fa-spa',
      category: 'Wellness',
      location: 'Wellness Center',
      organizer: 'Kwetu Health Club',
      dressCode: 'Athleisure'
    }
  ];

  const categories = ['All', 'Music', 'Food & Drink', 'Celebration', 'Networking', 'Romantic', 'Arts & Culture', 'Wellness'];
  
  const filteredEvents = selectedCategory === 'All' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) >= new Date();
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

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-yellow-500 text-gray-900'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {sortedEvents.map((event) => (
              <div 
                key={event.id} 
                className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
                  !isUpcoming(event.date) ? 'opacity-75' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-4xl text-center text-yellow-500">
                      {renderEventImage(event.image)}
                    </div>
                    {!isUpcoming(event.date) && (
                      <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full">
                        PAST
                      </span>
                    )}
                    {isUpcoming(event.date) && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        UPCOMING
                      </span>
                    )}
                  </div>
                  
                  <div className="mb-2">
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      {event.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  
                  <div className="text-gray-600 text-sm mb-3 space-y-1">
                    <p><i className="far fa-calendar"></i> {formatDate(event.date)}</p>
                    <p><i className="far fa-clock"></i> {event.time}</p>
                    <p><i className="fas fa-map-marker-alt"></i> {event.location}</p>
                    <p><i className="fas fa-user-tie"></i> {event.organizer}</p>
                    {event.dressCode && (
                      <p><i className="fas fa-tshirt"></i> {event.dressCode}</p>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded transition-colors text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Event Detail Modal */}
          {selectedEvent && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h2>
                      <div className="flex items-center space-x-3">
                        <span className="inline-block bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">
                          {selectedEvent.category}
                        </span>
                        <span className="inline-block bg-green-500 text-white text-sm px-3 py-1 rounded-full">
                          {isUpcoming(selectedEvent.date) ? 'UPCOMING' : 'PAST'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className={`fas ${selectedEvent.image} text-4xl text-yellow-500`}></i>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Event Information</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span className="font-medium">Date:</span>
                          <span>{formatDate(selectedEvent.date)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Time:</span>
                          <span>{selectedEvent.time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Location:</span>
                          <span>{selectedEvent.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Organizer:</span>
                          <span>{selectedEvent.organizer}</span>
                        </div>
                        {selectedEvent.dressCode && (
                          <div className="flex justify-between">
                            <span className="font-medium">Dress Code:</span>
                            <span>{selectedEvent.dressCode}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="font-medium">Entry:</span>
                          <span className="font-bold text-green-600">Open to All</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">About This Event</h3>
                    <p className="text-gray-600">{selectedEvent.description}</p>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Event Information</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div><i className="fas fa-info-circle text-blue-500"></i> Join us for memorable experiences</div>
                      <div><i className="fas fa-users text-green-500"></i> Open to members and guests</div>
                      <div><i className="fas fa-camera text-purple-500"></i> Photography welcome</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition-colors"
                    >
                      Close
                    </button>
                    {isUpcoming(selectedEvent.date) && (
                      <button
                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded transition-colors"
                      >
                        Add to Calendar
                      </button>
                    )}
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
