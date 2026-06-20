"use client";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '08:00', high: 2, medium: 5, low: 8 },
  { time: '09:00', high: 4, medium: 6, low: 10 },
  { time: '10:00', high: 8, medium: 9, low: 12 },
  { time: '11:00', high: 7, medium: 7, low: 15 },
  { time: '12:00', high: 3, medium: 5, low: 9 },
  { time: '13:00', high: 2, medium: 4, low: 6 },
];

export default function RiskTrendChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="time" stroke="#71717A" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#71717A" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0A0A0A', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
            itemStyle={{ color: '#F8FAFC' }}
          />
          <Line type="monotone" dataKey="high" stroke="#F43F5E" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="medium" stroke="#C871DA" strokeWidth={3} dot={false} />
          <Line type="monotone" dataKey="low" stroke="#22D3EE" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
