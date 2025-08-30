import React from 'react';

const InterviewStats = ({ stats }) => {
  const { total = 0, pending = 0, selected = 0, rejected = 0 } = stats;

  const statCards = [
    {
      title: 'Total Registrations',
      value: total,
      icon: '👥',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Pending Review',
      value: pending,
      icon: '⏳',
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700'
    },
    {
      title: 'Selected for Interview',
      value: selected,
      icon: '✅',
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Rejected',
      value: rejected,
      icon: '❌',
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <div key={index} className={`${stat.bgColor} rounded-xl p-6 border border-gray-200`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${stat.textColor}`}>{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            </div>
            <div className={`${stat.color} rounded-lg p-3 text-white text-2xl`}>
              {stat.icon}
            </div>
          </div>
          
          {total > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className={stat.textColor}>
                  {((stat.value / total) * 100).toFixed(1)}% of total
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className={`${stat.color} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${(stat.value / total) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default InterviewStats;
