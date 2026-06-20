"use client";
import React from 'react';
import RiskGauge from '@/components/dashboard/RiskGauge';
import MetricCard from '@/components/dashboard/MetricCard';

export default function AttackSurfacePage() {
  const assets = [
    { name: "payment-gateway-api", connector: "City Cloud", workload: "Smart Parking Service", score: 25, date: "May 20, 2026", permissions: ["bx-key", "bx-cloud"] },
    { name: "citizen-portal-db", connector: "GovCloud", workload: "Citizen Database", score: 55, date: "May 18, 2026", permissions: ["bx-data", "bx-lock"] },
    { name: "camera-network-edge", connector: "City Surveillance", workload: "Camera Nodes", score: 43, date: "May 21, 2026", permissions: ["bx-shield"] },
    { name: "admin-auth-service", connector: "Identity Provider", workload: "Admin Portal", score: 70, date: "May 21, 2026", permissions: ["bx-user-check", "bx-key"] },
    { name: "email-gateway", connector: "Mail Security", workload: "Email Gateway", score: 61, date: "May 15, 2026", permissions: ["bx-cloud", "bx-shield"] },
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <i className="bx bx-radar text-[#22D3EE]"></i>
          Your Attack Surface
        </h2>
        <p className="text-[#A1A1AA] text-sm mt-1">Identify vulnerabilities, connected workloads, and exposure risks.</p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Threats" value="125" trend="+15%" trendUp={false} icon="bx-bug" color="tertiary" />
        <MetricCard title="Payment API Risk" value="17%" trend="-2%" trendUp={true} icon="bx-credit-card" color="secondary" />
        <MetricCard title="Citizen Data Risk" value="46%" trend="+5%" trendUp={false} icon="bx-data" color="warning" />
        <MetricCard title="Service Outage Risk" value="29%" trend="-1%" trendUp={true} icon="bx-server" color="primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Table */}
        <div className="card p-0 lg:col-span-2 overflow-hidden flex flex-col">
          <div className="p-5 border-b border-[#ffffff14]">
            <h3 className="text-lg font-bold text-white">Attack Surface Overview</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#A1A1AA]">
              <thead className="bg-[#ffffff05] border-b border-[#ffffff14] text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Connector</th>
                  <th className="px-5 py-3">Workload</th>
                  <th className="px-5 py-3">Security Score</th>
                  <th className="px-5 py-3">Permissions</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset, i) => (
                  <tr key={i} className="border-b border-[#ffffff0a] hover:bg-[#ffffff05] transition-colors">
                    <td className="px-5 py-4 font-medium text-white">{asset.name}</td>
                    <td className="px-5 py-4">{asset.connector}</td>
                    <td className="px-5 py-4">{asset.workload}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${asset.score < 40 ? 'text-[#F43F5E]' : asset.score < 70 ? 'text-[#F59E0B]' : 'text-[#22C55E]'}`}>
                          {asset.score}%
                        </span>
                        <div className="flex-1 h-1.5 bg-[#ffffff14] rounded-full overflow-hidden w-16">
                          <div 
                            className={`h-full ${asset.score < 40 ? 'bg-[#F43F5E]' : asset.score < 70 ? 'bg-[#F59E0B]' : 'bg-[#22C55E]'}`} 
                            style={{ width: `${asset.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1">
                        {asset.permissions.map((icon, idx) => (
                          <div key={idx} className="w-6 h-6 rounded-full bg-[#ffffff14] flex items-center justify-center text-[#22D3EE]">
                            <i className={`bx ${icon}`}></i>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-1.5 rounded hover:bg-[#ffffff14] text-white transition-colors"><i className="bx bx-show"></i></button>
                        <button className="p-1.5 rounded hover:bg-[#ffffff14] text-[#22D3EE] transition-colors"><i className="bx bx-edit-alt"></i></button>
                        <button className="p-1.5 rounded hover:bg-[#F43F5E]/20 text-[#F43F5E] transition-colors"><i className="bx bx-archive-in"></i></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Gauge */}
        <div className="card p-6 flex flex-col items-center justify-center relative">
          <h3 className="text-lg font-bold text-white mb-2 absolute top-6 left-6">Global Exposure</h3>
          <div className="w-full flex-1 mt-8">
            <RiskGauge score={68} />
          </div>
          <p className="text-center text-sm text-[#A1A1AA] mt-4">
            Your global exposure score is calculated based on open vulnerabilities and workload criticality.
          </p>
        </div>
      </div>
    </div>
  );
}
