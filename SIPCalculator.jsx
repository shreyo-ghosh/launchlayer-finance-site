import React, { useState, useEffect } from 'react';

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);
  const [results, setResults] = useState({
    totalInvestment: 0,
    expectedAmount: 0,
    wealthGain: 0
  });

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 12 / 100;
    const totalMonths = investmentPeriod * 12;
    const totalInvestment = monthlyInvestment * totalMonths;
    
    // SIP formula: M * [((1 + r)^n - 1) / r] * (1 + r)
    const expectedAmount = monthlyInvestment * 
      (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));
    
    const wealthGain = expectedAmount - totalInvestment;
    
    setResults({
      totalInvestment,
      expectedAmount,
      wealthGain
    });
  };

  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, expectedReturn, investmentPeriod]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-3xl shadow-2xl max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          📈 SIP Calculator
        </h2>
        <p className="text-gray-600">
          Calculate your SIP returns and plan your financial future
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Investment Details</h3>
            
            {/* Monthly Investment */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Monthly Investment Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="number"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="100"
                  step="500"
                />
              </div>
              <input
                type="range"
                min="500"
                max="100000"
                step="500"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                className="w-full mt-2 accent-blue-500"
              />
            </div>
            
            {/* Expected Return */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Expected Annual Return
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full pl-4 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  max="30"
                  step="0.5"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="0.5"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="w-full mt-2 accent-blue-500"
              />
            </div>
            
            {/* Investment Period */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Investment Period
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={investmentPeriod}
                  onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  max="40"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">Years</span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                value={investmentPeriod}
                onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                className="w-full mt-2 accent-blue-500"
              />
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Investment Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                <span className="text-gray-700 font-medium">Total Investment</span>
                <span className="text-xl font-bold text-blue-600">
                  {formatCurrency(results.totalInvestment)}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                <span className="text-gray-700 font-medium">Expected Amount</span>
                <span className="text-xl font-bold text-green-600">
                  {formatCurrency(results.expectedAmount)}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-xl">
                <span className="text-gray-700 font-medium">Wealth Gain</span>
                <span className="text-xl font-bold text-yellow-600">
                  {formatCurrency(results.wealthGain)}
                </span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Monthly SIP of {formatCurrency(monthlyInvestment)} for {investmentPeriod} years 
                  at {expectedReturn}% annual return
                </p>
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Start SIP Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SIPCalculator;
