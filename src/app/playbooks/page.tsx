import React from 'react';
import SeverityBadge from '@/components/ui/SeverityBadge';

export default function PlaybooksPage() {
  const playbooks = [
    { title: "Payment Service Outage Response", severity: ["High", "Critical"], time: "45 min", steps: 6, services: "Smart Parking" },
    { title: "Citizen Data Leak Suspicion", severity: ["Critical"], time: "120 min", steps: 12, services: "Citizen Portal" },
    { title: "Public Camera Network Offline", severity: ["Medium", "High"], time: "30 min", steps: 5, services: "Surveillance" },
    { title: "Ransomware Suspicion", severity: ["Critical"], time: "180 min", steps: 15, services: "All Systems" },
    { title: "Phishing Campaign Detected", severity: ["Low", "Medium"], time: "60 min", steps: 8, services: "Email Gateway" },
    { title: "Suspicious Admin Login", severity: ["High"], time: "20 min", steps: 4, services: "Admin Portal" },
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <i className="bx bx-git-branch text-[#C871DA]"></i>
          Playbook Library
        </h2>
        <p className="text-[#A1A1AA] text-sm mt-1">Pre-approved response workflows for security incidents.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playbooks.map((pb, i) => (
          <div key={i} className="card p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#ffffff0a] flex items-center justify-center border border-[#ffffff14]">
                  <i className="bx bx-git-branch text-xl text-[#C871DA]"></i>
                </div>
                <div className="flex gap-1">
                  {pb.severity.map(sev => <SeverityBadge key={sev} severity={sev} />)}
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 leading-tight">{pb.title}</h3>
              <div className="flex flex-col gap-2 mt-4 text-sm text-[#A1A1AA]">
                <div className="flex justify-between border-b border-[#ffffff0a] pb-2">
                  <span><i className="bx bx-time"></i> Est. Time</span>
                  <span className="text-white">{pb.time}</span>
                </div>
                <div className="flex justify-between border-b border-[#ffffff0a] pb-2">
                  <span><i className="bx bx-list-ol"></i> Steps</span>
                  <span className="text-white">{pb.steps}</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span><i className="bx bx-server"></i> Services</span>
                  <span className="text-white">{pb.services}</span>
                </div>
              </div>
            </div>
            <button className="w-full py-2.5 mt-4 rounded-lg border border-[#C871DA]/30 text-[#C871DA] hover:bg-[#C871DA]/10 transition-colors font-medium text-sm">
              Open Playbook
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
