"use client";
import React from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  trend: string;
  trendUp?: boolean;
  icon: string;
  color: "primary" | "secondary" | "tertiary" | "success" | "warning";
}

export default function MetricCard({ title, value, trend, trendUp = true, icon, color }: MetricCardProps) {
  const colorMap = {
    primary: "text-[#C871DA]",
    secondary: "text-[#22D3EE]",
    tertiary: "text-[#F43F5E]",
    success: "text-[#22C55E]",
    warning: "text-[#F59E0B]",
  };

  const bgMap = {
    primary: "bg-[#C871DA]/10 border-[#C871DA]/20",
    secondary: "bg-[#22D3EE]/10 border-[#22D3EE]/20",
    tertiary: "bg-[#F43F5E]/10 border-[#F43F5E]/20",
    success: "bg-[#22C55E]/10 border-[#22C55E]/20",
    warning: "bg-[#F59E0B]/10 border-[#F59E0B]/20",
  };

  return (
    <div className="card p-5 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${bgMap[color]}`}>
          <i className={`bx ${icon} text-xl ${colorMap[color]}`}></i>
        </div>
        <div className={`text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1 ${trendUp ? "bg-[#22C55E]/10 text-[#22C55E]" : "bg-[#F43F5E]/10 text-[#F43F5E]"}`}>
          <i className={`bx ${trendUp ? 'bx-trending-up' : 'bx-trending-down'}`}></i>
          {trend}
        </div>
      </div>
      <div>
        <p className="text-[#A1A1AA] text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-white">{value}</h3>
      </div>
    </div>
  );
}
