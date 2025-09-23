import React from 'react';

const ServiceCard = ({ title, description, icon, features, ctaText, ctaLink, highlighted = false }) => {
  return (
    <div className={`relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
      highlighted ? 'ring-4 ring-yellow-400 ring-opacity-50' : ''
    }`}>
      {highlighted && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
            Most Popular
          </span>
        </div>
      )}
      
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
          {icon || '📊'}
        </div>
      </div>
      
      {/* Content */}
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-gray-800">
          {title || 'Service Title'}
        </h3>
        
        <p className="text-gray-600 leading-relaxed">
          {description || 'Service description goes here with details about what this service offers.'}
        </p>
        
        {/* Features List */}
        {features && features.length > 0 && (
          <ul className="space-y-3 text-left">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        )}
        
        {/* CTA Button */}
        <div className="pt-6">
          <button className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
            highlighted 
              ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg'
              : 'bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white shadow-lg'
          }`}>
            {ctaText || 'Learn More'}
          </button>
        </div>
        
        {/* Additional Info */}
        <div className="pt-4 text-sm text-gray-500">
          <p>Free consultation available</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
