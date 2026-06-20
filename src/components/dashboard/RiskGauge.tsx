"use client";
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function RiskGauge({ score }: { score: number }) {
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score },
  ];
  
  // Color depends on score
  const getColor = (s: number) => {
    if (s < 40) return '#22D3EE';
    if (s < 75) return '#F59E0B';
    return '#F43F5E';
  };

  return (
    <div className="h-48 w-full relative flex items-end justify-center pb-6">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius="75%"
            outerRadius="100%"
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={getColor(score)} />
            <Cell fill="rgba(255,255,255,0.05)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute bottom-6 flex flex-col items-center">
        <span className="text-4xl font-bold text-white tracking-tighter">{score}%</span>
        <span className="text-[#A1A1AA] text-sm uppercase tracking-wider mt-1">Risk Score</span>
      </div>
    </div>
  );
}
