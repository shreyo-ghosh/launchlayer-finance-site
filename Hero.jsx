import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Master Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Financial Future
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                Expert guidance on personal finance, SIPs, and smart investing strategies 
                to help you build lasting wealth.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Start Learning
              </button>
              <button className="border-2 border-white hover:bg-white hover:text-blue-900 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300">
                Watch Demo
              </button>
            </div>
            
            {/* Social Proof */}
            <div className="flex items-center space-x-6 text-blue-200">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-yellow-400">10K+</span>
                <span>Students Guided</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-yellow-400">₹50L+</span>
                <span>Wealth Created</span>
              </div>
            </div>
          </div>
          
          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="./hero-finance.png" 
                alt="Financial success dashboard" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
