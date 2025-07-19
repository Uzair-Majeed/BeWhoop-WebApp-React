import React from 'react';

const StatCard = ({ label, value }) => (
    <div className="bg-white p-6 rounded-xl shadow-md">
        <p className="text-gray-500">{label}</p>
        <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
    </div>
);

export default StatCard;
