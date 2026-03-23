'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';

interface ApparelItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default function Apparel() {
  const [cart, setCart] = useState<ApparelItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const apparelItems: ApparelItem[] = [
    {
      id: 1,
      name: 'Kwetu Place Classic Polo',
      price: 4500,
      description: 'Premium cotton polo with embroidered Kwetu Place logo. Perfect for casual elegance.',
      image: 'fa-tshirt'
    },
    {
      id: 2,
      name: 'Executive Dress Shirt',
      price: 6500,
      description: 'Professional dress shirt with subtle branding. Ideal for business meetings and formal events.',
      image: 'fa-user-tie'
    },
    {
      id: 3,
      name: 'Luxury Hoodie',
      price: 5500,
      description: 'Premium hoodie with embroidered logo and soft interior lining. Ultimate comfort meets style.',
      image: 'fa-hood-cloak'
    },
    {
      id: 4,
      name: 'Performance Polo Shirt',
      price: 4800,
      description: 'Moisture-wicking polo with athletic fit. Perfect for active lifestyles and sports.',
      image: 'fa-running'
    },
    {
      id: 5,
      name: 'Kwetu Place Cap',
      price: 1800,
      description: 'Structured cap with embroidered logo. Adjustable strap for perfect fit.',
      image: 'fa-hat-cowboy'
    },
    {
      id: 6,
      name: 'Luxury Silk Scarf',
      price: 3200,
      description: 'Elegant silk scarf with subtle branding. Perfect for adding sophistication to any outfit.',
      image: 'fa-scarf'
    },
    {
      id: 7,
      name: 'Executive Leather Belt',
      price: 2800,
      description: 'Genuine leather belt with subtle logo buckle. Timeless accessory for professional attire.',
      image: 'fa-grip-lines'
    },
    {
      id: 8,
      name: 'Performance Shorts',
      price: 3500,
      description: 'Athletic shorts with moisture management. Perfect for workouts and casual wear.',
      image: 'fa-socks'
    },
    {
      id: 9,
      name: 'Executive Trousers',
      price: 7500,
      description: 'Premium dress trousers with perfect fit. Professional appearance meets all-day comfort.',
      image: 'fa-user-tie'
    },
    {
      id: 10,
      name: 'Kwetu Place Training Jacket',
      price: 8500,
      description: 'Lightweight training jacket with full branding. Perfect for layering in any weather.',
      image: 'fa-vest'
    },
    {
      id: 11,
      name: 'Luxury Windbreaker',
      price: 9500,
      description: 'Premium windbreaker with water resistance. Elegant protection against the elements.',
      image: 'fa-wind'
    },
    {
      id: 12,
      name: 'Kwetu Place Duffel Bag',
      price: 4200,
      description: 'Spacious duffel bag with logo embroidery. Perfect for gym or weekend travel.',
      image: 'fa-suitcase-rolling'
    }
  ];

  const filteredItems = apparelItems;

  const addToCart = (item: ApparelItem) => {
    setCart([...cart, item]);
    setCartOpen(true);
  };

  const removeFromCart = (itemId: number) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const getTotalItems = () => {
    return cart.length;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Kwetu Place Apparel</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our exclusive collection of premium apparel. Experience luxury and comfort with every piece.
            </p>
          </div>

          {/* Shopping Cart */}
          <div className="fixed top-20 right-4 z-40">
            <button
              onClick={() => setCartOpen(!cartOpen)}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
            >
              <i className="fas fa-shopping-bag"></i>
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {getTotalItems()}
              </span>
            </button>
            
            {cartOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-2xl border border-gray-200">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Shopping Cart</h3>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </div>
                  
                  {cart.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                  ) : (
                    <>
                      <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center justify-between py-2 border-b">
                            <div className="flex items-center space-x-3">
                              <i className={`fas ${item.image} text-gray-600`}></i>
                              <div>
                                <div className="font-medium text-gray-900">{item.name}</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-gray-900">KES {item.price.toLocaleString()}</span>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-bold text-gray-900">Total:</span>
                          <span className="text-xl font-bold text-yellow-600">KES {getTotalPrice().toLocaleString()}</span>
                        </div>
                        <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors">
                          Proceed to Checkout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                {/* Product Image */}
                <div className="h-48 bg-gray-100 flex items-center justify-center mb-4">
                  <i className={`fas ${item.image} text-6xl text-gray-400 group-hover:text-yellow-500 transition-colors`}></i>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                  
                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-xl font-bold text-gray-900">KES {item.price.toLocaleString()}</span>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          </div>
      </div>
    </Layout>
  );
}
