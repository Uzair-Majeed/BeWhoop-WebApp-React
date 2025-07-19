import React from 'react';

const AnalyticsChart = () => (
  <div className="bg-white p-4 rounded-xl shadow-md h-80 flex flex-col border-2 border-gray-300">
    <div className="flex-grow">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 500 250"
        preserveAspectRatio="none"
        style={{ backgroundColor: 'white', borderRadius: '0.75rem' }}
      >
        {/* Y-axis values */}
        <text x="10" y="30" fill="#6b7280" fontSize="10">100</text>
        <text x="10" y="75" fill="#6b7280" fontSize="10">75</text>
        <text x="10" y="120" fill="#6b7280" fontSize="10">50</text>
        <text x="10" y="165" fill="#6b7280" fontSize="10">25</text>
        <text x="10" y="210" fill="#6b7280" fontSize="10">0</text>

        {/* X-axis values */}
        <text x="60" y="240" fill="#6b7280" fontSize="10">2015</text>
        <text x="120" y="240" fill="#6b7280" fontSize="10">2016</text>
        <text x="180" y="240" fill="#6b7280" fontSize="10">2017</text>
        <text x="240" y="240" fill="#6b7280" fontSize="10">2018</text>
        <text x="300" y="240" fill="#6b7280" fontSize="10">2019</text>
        <text x="360" y="240" fill="#6b7280" fontSize="10">2020</text>
        <text x="420" y="240" fill="#6b7280" fontSize="10">2021</text>

        <path
          d="M60,180 C90,100 120,120 160,150 S220,200 260,160 S320,50 360,80 S420,150 460,120"
          fill="none"
          stroke="#f87171"
          strokeWidth="2"
        />
      </svg>
    </div>
  </div>
);


export default AnalyticsChart;
