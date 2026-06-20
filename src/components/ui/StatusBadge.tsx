import React from 'react';
import { IncidentStatus } from '@/data/mockData';

export default function StatusBadge({ status }: { status: IncidentStatus | string }) {
  const colorMap: Record<string, string> = {
    Detected: "bg-white/10 text-white border-white/20",
    Triage: "bg-[#22D3EE]/15 text-[#22D3EE] border-[#22D3EE]/30",
    Containment: "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30",
    Eradication: "bg-[#F43F5E]/15 text-[#F43F5E] border-[#F43F5E]/30",
    Recovery: "bg-[#C871DA]/15 text-[#C871DA] border-[#C871DA]/30",
    Resolved: "bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30",
  };

  const className = colorMap[status] || "bg-gray-500/15 text-gray-400 border-gray-500/30";

  return (
    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${className}`}>
      {status}
    </span>
  );
}
