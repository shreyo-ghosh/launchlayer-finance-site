import React, { useState } from 'react';
import SIPCalculator from '../SIPCalculator';

const Field = ({ label, type = 'number', value, onChange, min, max, step, suffix, prefix, placeholder, error }) => (
  <div className="space-y-2">
    {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
    <div className="relative">
      {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 select-none">{prefix}</span>}
      <input type={type} value={value} onChange={onChange} min={min} max={max} step={step} placeholder={placeholder}
        className={`w-full ${prefix ? 'pl-8' : 'pl-4'} ${suffix ? 'pr-10' : 'pr-4'} py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300`} />
      {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 select-none">{suffix}</span>}
    </div>
    {error && <p className="text-xs text-red-600">{error}</p>}
  </div>
);

const Card = ({ title, children, footer }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg">
    {title && <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>}
    <div className="space-y-4">{children}</div>
    {footer && <div className="mt-6 pt-6 border-t border-gray-200">{footer}</div>}
  </div>
);

const ResultItem = ({ label, value, color = 'blue' }) => (
  <div className={`flex justify-between items-center p-4 rounded-xl bg-gray-50`}>
    <span className="text-gray-700 font-medium">{label}</span>
    <span className={`text-xl font-bold text-gray-900`}>{value}</span>
  </div>
);

const formatINR = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0);

const LumpsumCalculator = () => {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const amount = principal * Math.pow(1 + rate / 100, years);
  const gain = amount - principal;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card title="Investment Details">
        <Field label="Investment Amount" value={principal} onChange={(e)=>setPrincipal(Number(e.target.value))} min={1000} step={1000} prefix="₹" />
        <Field label="Expected Annual Return" value={rate} onChange={(e)=>setRate(Number(e.target.value))} min={1} max={100} step={0.5} suffix="%" />
        <Field label="Investment Period (Years)" value={years} onChange={(e)=>setYears(Number(e.target.value))} min={1} max={60} step={1} suffix="yrs" />
      </Card>
      <Card title="Projection" footer={<p className="text-sm text-gray-600 text-center">Lumpsum of {formatINR(principal)} for {years} years at {rate}%</p>}>
        <ResultItem label="Total Value" value={formatINR(amount)} />
        <ResultItem label="Invested" value={formatINR(principal)} />
        <ResultItem label="Wealth Gain" value={formatINR(gain)} />
      </Card>
    </div>
  );
};

const RetirementPlanner = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [monthlyNeed, setMonthlyNeed] = useState(50000);
  const [inflation, setInflation] = useState(6);

  const yearsToRetire = Math.max(0, retireAge - currentAge);
  const inflatedNeed = monthlyNeed * Math.pow(1 + inflation / 100, yearsToRetire);
  const corpusNeeded = inflatedNeed * 12 * 25;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card title="Assumptions">
        <Field label="Current Age" value={currentAge} onChange={(e)=>setCurrentAge(Number(e.target.value))} min={18} max={60} />
        <Field label="Retirement Age" value={retireAge} onChange={(e)=>setRetireAge(Number(e.target.value))} min={40} max={75} />
        <Field label="Monthly Expense Today" value={monthlyNeed} onChange={(e)=>setMonthlyNeed(Number(e.target.value))} min={5000} step={1000} prefix="₹" />
        <Field label="Inflation (p.a.)" value={inflation} onChange={(e)=>setInflation(Number(e.target.value))} min={1} max={12} step={0.5} suffix="%" />
      </Card>
      <Card title="Projected Corpus">
        <ResultItem label="Years to Retire" value={`${yearsToRetire} yrs`} />
        <ResultItem label="Monthly Need at Retirement" value={formatINR(inflatedNeed)} />
        <ResultItem label="Estimated Corpus Needed" value={formatINR(corpusNeeded)} />
      </Card>
    </div>
  );
};

const EMICalculator = () => {
  const [principal, setPrincipal] = useState(1000000);
  const [rate, setRate] = useState(9);
  const [years, setYears] = useState(20);

  const n = years * 12;
  const r = rate / 12 / 100;
  const emi = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const total = emi * n;
  const interest = total - principal;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card title="Loan Details">
        <Field label="Loan Amount" value={principal} onChange={(e)=>setPrincipal(Number(e.target.value))} min={50000} step={10000} prefix="₹" />
        <Field label="Interest Rate (p.a.)" value={rate} onChange={(e)=>setRate(Number(e.target.value))} min={1} max={24} step={0.1} suffix="%" />
        <Field label="Tenure (Years)" value={years} onChange={(e)=>setYears(Number(e.target.value))} min={1} max={40} step={1} suffix="yrs" />
      </Card>
      <Card title="Repayment Summary">
        <ResultItem label="Monthly EMI" value={formatINR(emi)} />
        <ResultItem label="Total Interest" value={formatINR(interest)} />
        <ResultItem label="Total Payment" value={formatINR(total)} />
      </Card>
    </div>
  );
};

const RiskProfilerQuiz = () => {
  const [age, setAge] = useState('30-40');
  const [horizon, setHorizon] = useState('5-10');
  const [tolerance, setTolerance] = useState('medium');

  const score = (age === '20-30' ? 3 : age === '30-40' ? 2 : 1)
    + (horizon === '10+' ? 3 : horizon === '5-10' ? 2 : 1)
    + (tolerance === 'high' ? 3 : tolerance === 'medium' ? 2 : 1);

  const band = score >= 8 ? 'Aggressive' : score >= 6 ? 'Moderate' : 'Conservative';

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card title="Answer a few quick questions">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age band</label>
          <select className="w-full border rounded-xl p-3" value={age} onChange={(e)=>setAge(e.target.value)}>
            <option value="20-30">20-30</option>
            <option value="30-40">30-40</option>
            <option value="40+">40+</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Investment horizon (years)</label>
          <select className="w-full border rounded-xl p-3" value={horizon} onChange={(e)=>setHorizon(e.target.value)}>
            <option value="0-5">0-5</option>
            <option value="5-10">5-10</option>
            <option value="10+">10+</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Risk tolerance</label>
          <select className="w-full border rounded-xl p-3" value={tolerance} onChange={(e)=>setTolerance(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </Card>
      <Card title="Your Risk Profile">
        <ResultItem label="Score" value={score} />
        <ResultItem label="Category" value={band} />
        <p className="text-sm text-gray-600">Use this as a starting point for asset allocation. Not investment advice.</p>
      </Card>
    </div>
  );
};

const tabs = [
  { key: 'sip', label: 'SIP', component: <SIPCalculator /> },
  { key: 'lumpsum', label: 'Lumpsum', component: <LumpsumCalculator /> },
  { key: 'emi', label: 'EMI', component: <EMICalculator /> },
  { key: 'retire', label: 'Retirement', component: <RetirementPlanner /> },
  { key: 'risk', label: 'Risk Profiler', component: <RiskProfilerQuiz /> },
];

const AllCalculators = () => {
  const [active, setActive] = useState('sip');
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 md:p-10 rounded-3xl shadow-2xl max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Financial Calculators</h2>
        <p className="text-gray-600">Plan SIPs, loans, retirement and more with clean, responsive tools.</p>
      </div>
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActive(t.key)}
            className={`px-4 py-2 rounded-full border transition-all duration-200 shadow-sm hover:shadow md:px-5 md:py-2.5 ${active === t.key ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-6">
        {tabs.find(t => t.key === active)?.component}
      </div>
    </div>
  );
};

export default AllCalculators;
