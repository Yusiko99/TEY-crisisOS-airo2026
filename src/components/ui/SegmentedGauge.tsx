"use client";
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface SegmentedGaugeProps {
  value: number; // 0 to 100
  label?: string;
  valuePrefix?: string;
  valueSuffix?: string;
  segments?: number;
}

export default function SegmentedGauge({
  value,
  label,
  valuePrefix = '',
  valueSuffix = '%',
  segments = 12
}: SegmentedGaugeProps) {
  // Ensure value is between 0 and 100
  const normalizedValue = Math.min(100, Math.max(0, value));
  
  // Create an array of data points for Recharts. Each segment has equal weight (1).
  const data = Array.from({ length: segments }).map((_, i) => ({ value: 1, index: i }));
  
  // Determine how many segments should be lit up
  // e.g., if value is 50, and we have 12 segments, activeSegments = 6
  const activeSegments = Math.round((normalizedValue / 100) * segments);

  // Gradient of colors from left to right
  // We'll interpolate colors or use a predefined palette.
  const getSegmentColor = (index: number, isActive: boolean) => {
    if (!isActive) return '#1e1b4b'; // Dark background for inactive segments (e.g. indigo-950)
    
    // A beautiful gradient from Green -> Yellow -> Orange -> Red -> Purple
    const colors = [
      '#4ade80', '#22c55e', '#10b981', // Greens
      '#fcd34d', '#f59e0b', '#d97706', // Yellow/Ambers
      '#ea580c', '#ef4444', '#e11d48', // Orange/Reds
      '#d946ef', '#a855f7', '#7e22ce', // Pinks/Purples
    ];
    
    // Map index to the closest color in our array
    const colorIndex = Math.floor((index / segments) * colors.length);
    return colors[Math.min(colorIndex, colors.length - 1)];
  };

  return (
    <div className="@container w-full aspect-[2/1] relative overflow-hidden">
      {/* We use a square container to make Recharts radius calculation match the full width perfectly */}
      <div className="absolute w-full aspect-square top-0 left-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius="70%"
              outerRadius="95%"
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              cornerRadius={4}
            >
              {data.map((entry, index) => {
                const isActive = index < activeSegments;
                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={getSegmentColor(index, isActive)} 
                  />
                );
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Text overlay - positioned at the bottom of the wrapper */}
      <div className="absolute bottom-0 w-full flex flex-col items-center justify-end pb-0.5">
        <span className="font-bold text-white tracking-tighter leading-none" style={{ fontSize: 'clamp(0.6rem, 5cqw, 1.5rem)' }}>
          {valuePrefix}{value}{valueSuffix}
        </span>
        {label && (
          <span className="text-[#A1A1AA] uppercase tracking-wider mt-0.5" style={{ fontSize: 'clamp(0.3rem, 5cqw, 0.875rem)' }}>
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
