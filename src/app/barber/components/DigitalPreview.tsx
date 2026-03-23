'use client';

import { useState } from 'react';

export default function DigitalPreview() {
  const [selectedFace, setSelectedFace] = useState('oval');
  const [selectedStyle, setSelectedStyle] = useState('executive');
  const [selectedHairColor, setSelectedHairColor] = useState('black');

  const faceShapes = [
    { id: 'oval', name: 'Oval', icon: 'fa-circle' },
    { id: 'round', name: 'Round', icon: 'fa-circle' },
    { id: 'square', name: 'Square', icon: 'fa-square' },
    { id: 'heart', name: 'Heart', icon: 'fa-heart' },
  ];

  const hairStyles = [
    { id: 'executive', name: 'Executive Cut', description: 'Professional business style' },
    { id: 'fade', name: 'Modern Fade', description: 'Contemporary fade' },
    { id: 'textured', name: 'Textured Crop', description: 'Modern textured look' },
    { id: 'classic', name: 'Classic Cut', description: 'Timeless traditional' },
  ];

  const hairColors = [
    { id: 'black', name: 'Black', color: 'bg-black' },
    { id: 'brown', name: 'Brown', color: 'bg-amber-900' },
    { id: 'blonde', name: 'Blonde', color: 'bg-yellow-600' },
    { id: 'gray', name: 'Gray/Silver', color: 'bg-gray-400' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Digital Preview</h2>
      <p className="text-gray-600 mb-8">See how different styles look before you book</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview Area */}
        <div className="bg-gray-50 rounded-lg p-8">
          <div className="text-center mb-6">
            <div className="w-48 h-48 bg-gray-200 rounded-full mx-auto mb-4 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fas fa-user text-6xl text-gray-400"></i>
              </div>
              {/* Hair style overlay visualization */}
              <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 ${hairColors.find(c => c.id === selectedHairColor)?.color} rounded-t-full opacity-80`}></div>
            </div>
            <h3 className="font-semibold text-gray-900">Your Preview</h3>
            <p className="text-sm text-gray-600">
              {selectedFace} face • {hairStyles.find(s => s.id === selectedStyle)?.name}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {/* Face Shape Selection */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Face Shape</h3>
            <div className="grid grid-cols-2 gap-3">
              {faceShapes.map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => setSelectedFace(shape.id)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    selectedFace === shape.id
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <i className={`fas ${shape.icon} mb-2 block text-lg`}></i>
                  <span className="text-sm font-medium">{shape.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Hair Style Selection */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Hair Style</h3>
            <div className="space-y-2">
              {hairStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`w-full p-3 rounded-lg border-2 text-left transition-colors ${
                    selectedStyle === style.id
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">{style.name}</div>
                  <div className="text-sm text-gray-600">{style.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Hair Color Selection */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Hair Color</h3>
            <div className="grid grid-cols-2 gap-3">
              {hairColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedHairColor(color.id)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    selectedHairColor === color.id
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 ${color.color} rounded-full`}></div>
                    <span className="text-sm font-medium">{color.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors">
              Save Look
            </button>
            <button
              onClick={() => {
                document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Book This Look
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mt-8 bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">Preview Features:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
          <div><i className="fas fa-check text-green-500"></i> Real-time style visualization</div>
          <div><i className="fas fa-check text-green-500"></i> Multiple face shapes supported</div>
          <div><i className="fas fa-check text-green-500"></i> Color matching technology</div>
          <div><i className="fas fa-check text-green-500"></i> Save favorite looks</div>
        </div>
      </div>
    </div>
  );
}
