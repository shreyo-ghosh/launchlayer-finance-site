import React, { useState, useEffect } from 'react';

const MarketSnapshot = () => {
  const [marketData, setMarketData] = useState({
    nifty: { value: '19,674.25', change: '+127.35', percentage: '+0.65%', positive: true },
    sensex: { value: '65,953.48', change: '+452.74', percentage: '+0.69%', positive: true },
    bankNifty: { value: '43,821.15', change: '-89.25', percentage: '-0.20%', positive: false },
    goldPrice: { value: '62,450', change: '+285', percentage: '+0.46%', positive: true },
    usdInr: { value: '83.24', change: '+0.15', percentage: '+0.18%', positive: true },
    crudePrices: { value: '94.25', change: '-1.35', percentage: '-1.41%', positive: false }
  });

  const marketItems = [
    { key: 'nifty', name: 'NIFTY 50', icon: '📈' },
    { key: 'sensex', name: 'SENSEX', icon: '📊' },
    { key: 'bankNifty', name: 'BANK NIFTY', icon: '🏦' },
    { key: 'goldPrice', name: 'GOLD (₹/10g)', icon: '🥇' },
    { key: 'usdInr', name: 'USD/INR', icon: '💵' },
    { key: 'crudePrices', name: 'CRUDE OIL', icon: '🛢️' }
  ];

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // Add slight random variations to simulate live market
      const updateData = { ...marketData };
      Object.keys(updateData).forEach(key => {
        const variation = (Math.random() - 0.5) * 2; // Random between -1 and 1
        const currentValue = parseFloat(updateData[key].value.replace(/,/g, ''));
        const newValue = currentValue + variation;
        updateData[key] = {
          ...updateData[key],
          value: newValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })
        };
      });
      setMarketData(updateData);
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center text-white text-2xl">
            📊
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Market Snapshot</h2>
            <p className="text-sm text-gray-500">Live market data • Updated now</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600 font-medium">Live</span>
        </div>
      </div>

      {/* Market Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {marketItems.map((item) => {
          const data = marketData[item.key];
          return (
            <div
              key={item.key}
              className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-medium text-gray-600">{item.name}</span>
                </div>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                  data.positive 
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  <span>{data.positive ? '↗' : '↘'}</span>
                  <span>{data.percentage}</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-xl font-bold text-gray-800">
                  {data.value}
                </div>
                <div className={`text-sm font-medium ${
                  data.positive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {data.positive ? '+' : ''}{data.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Market Insights */}
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">💡 Market Insight</h3>
          <p className="text-gray-600 text-sm">
            Markets showing positive momentum with IT and Banking sectors leading gains. 
            Consider SIP investments during market volatility for better long-term returns.
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">⚠️ Investment Tip</h3>
          <p className="text-gray-600 text-sm">
            Diversify your portfolio across different asset classes. Gold and international 
            exposure can help hedge against domestic market volatility.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500">
          Data is delayed by 15 minutes • For educational purposes only • 
          <button className="text-blue-600 hover:text-blue-700 font-medium ml-1">
            Get Live Premium Data
          </button>
        </p>
      </div>
    </div>
  );
};

export default MarketSnapshot;
