import React from 'react';

export default function LoadingSpinner({ size = 'md', color = 'accent', text = 'Loading...' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    accent: 'border-accent',
    blue: 'border-blue-500',
    navy: 'border-navy',
    gray: 'border-gray-400'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`${sizeClasses[size]} ${colorClasses[color]} border-2 border-t-transparent rounded-full animate-spin`}></div>
      {text && (
        <p className="mt-2 text-sm text-gray-600 font-medium">{text}</p>
      )}
    </div>
  );
}

export function PulseLoader({ size = 'md', color = 'purple' }) {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  const colorClasses = {
    purple: 'bg-purple-600',
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    white: 'bg-white'
  };

  return (
    <div className="flex space-x-1">
      <div className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-pulse`} style={{animationDelay: '0ms'}}></div>
      <div className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-pulse`} style={{animationDelay: '150ms'}}></div>
      <div className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-pulse`} style={{animationDelay: '300ms'}}></div>
    </div>
  );
}

export function SkeletonLoader({ className = '', lines = 1 }) {
  return (
    <div className={`animate-shimmer ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div 
          key={index}
          className="h-4 bg-gray-200 rounded mb-2"
          style={{animationDelay: `${index * 0.1}s`}}
        />
      ))}
    </div>
  );
} 