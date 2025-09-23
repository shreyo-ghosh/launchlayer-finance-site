import React from 'react';

const ServiceCard = ({
  title,
  description,
  icon = '📊',
  features = [],
  ctaText = 'Learn More',
  ctaLink = '#',
  highlighted = false,
}) => {
  return (
    <article
      className={`relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 focus-within:ring-2 focus-within:ring-blue-500`}
      role="article"
      aria-labelledby={`${title?.toLowerCase().replace(/\s+/g, '-') || 'service'}-title`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-gradient-to-r from-gold-400 to-amber-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
            Most Popular
          </span>
        </div>
      )}

      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
          <span aria-hidden="true">{icon}</span>
        </div>
      </div>

      {/* Content */}
      <div className="text-center space-y-4">
        <h3
          id={`${title?.toLowerCase().replace(/\s+/g, '-') || 'service'}-title`}
          className="text-2xl font-bold text-navy-900"
        >
          {title || 'Service Title'}
        </h3>

        <p className="text-gray-700 leading-relaxed">
          {description || 'Service description goes here with details about what this service offers.'}
        </p>

        {/* Features List */}
        {features && features.length > 0 && (
          <ul className="space-y-3 text-left" aria-label="Key features">
            {features.map((feature, index) => (
              <li className="flex items-start space-x-3" key={index}>
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-gray-800">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* CTA Button */}
        <div className="pt-6">
          <a
            href={ctaLink}
            className={`inline-flex w-full justify-center items-center gap-2 py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              highlighted
                ? 'bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-600 hover:to-amber-700 text-navy-900 shadow-lg'
                : 'bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white shadow-lg'
            }`}
            aria-label={`${ctaText} for ${title}`}
          >
            {ctaText}
          </a>
        </div>

        {/* Additional Info */}
        <p className="pt-4 text-sm text-gray-500">Free consultation available</p>
      </div>
    </article>
  );
};

export default ServiceCard;
