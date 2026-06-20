import React from 'react';
import { Severity } from '@/data/mockData';

export default function SeverityBadge({ severity }: { severity: Severity | string }) {
  const colorMap: Record<string, string> = {
    Low: "bg-[#22D3EE]/15 text-[#22D3EE] border-[#22D3EE]/30",
    Medium: "bg-[#C871DA]/15 text-[#C871DA] border-[#C871DA]/30",
    High: "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30",
    Critical: "danger-badge", // Using the custom class from globals.css
  };

  const className = colorMap[severity] || "bg-gray-500/15 text-gray-400 border-gray-500/30";

  return (
    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${className}`}>
      {severity}
    </span>
  );
}
