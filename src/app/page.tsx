"use client";
import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/appStore';
import MetricCard from '@/components/dashboard/MetricCard';
import RiskGauge from '@/components/dashboard/RiskGauge';
import RiskTrendChart from '@/components/dashboard/RiskTrendChart';
import SeverityBadge from '@/components/ui/SeverityBadge';
import StatusBadge from '@/components/ui/StatusBadge';

export default function DashboardPage() {
  const { incidents } = useAppStore();

  const openCount = incidents.filter(i => i.status !== 'Resolved').length;
  const highRiskCount = incidents.filter(i => i.severity === 'High' || i.severity === 'Critical').length;
  const resolvedToday = incidents.filter(i => i.status === 'Resolved').length; // Mock logic
  
  // Dynamic average risk score calculation
  const totalScore = incidents.reduce((acc, curr) => acc + curr.riskScore, 0);
  const avgScore = incidents.length ? Math.round(totalScore / incidents.length) : 0;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
          <p className="text-[#A1A1AA] text-sm">System-wide threat intelligence and active incident status.</p>
        </div>
        <Link href="/triage" className="primary-button px-5 py-2.5">
          <i className="bx bx-sparkles"></i>
          Analyze with AI
        </Link>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricCard title="Open Incidents" value={openCount} trend="+2%" trendUp={false} icon="bx-error-circle" color="warning" />
        <MetricCard title="High Risk" value={highRiskCount} trend="-12%" trendUp={true} icon="bx-target-lock" color="tertiary" />
        <MetricCard title="Resolved Today" value={resolvedToday} trend="+5%" trendUp={true} icon="bx-check-shield" color="success" />
        <MetricCard title="Avg. Response" value="38m" trend="-4m" trendUp={true} icon="bx-time-five" color="secondary" />
        <MetricCard title="Affected Services" value="12" trend="+1" trendUp={false} icon="bx-server" color="primary" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-white mb-4">Risk Trend Analysis</h3>
          <RiskTrendChart />
        </div>
        <div className="card p-6 flex flex-col items-center justify-center relative">
          <h3 className="text-lg font-bold text-white mb-2 absolute top-6 left-6">Current Posture</h3>
          <div className="w-full flex-1 mt-8">
            <RiskGauge score={avgScore} />
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-0 lg:col-span-2 overflow-hidden flex flex-col">
          <div className="p-5 border-b border-[#ffffff14] flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">Recent Incidents</h3>
            <Link href="/incidents" className="text-sm text-[#C871DA] hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#A1A1AA]">
              <thead className="bg-[#ffffff05] border-b border-[#ffffff14] text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Title</th>
                  <th className="px-5 py-3">Severity</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {incidents.slice(0, 5).map((inc) => (
                  <tr key={inc.id} className="border-b border-[#ffffff0a] hover:bg-[#ffffff05] transition-colors">
                    <td className="px-5 py-4 font-medium text-white">{inc.id}</td>
                    <td className="px-5 py-4">{inc.title}</td>
                    <td className="px-5 py-4"><SeverityBadge severity={inc.severity} /></td>
                    <td className="px-5 py-4"><StatusBadge status={inc.status} /></td>
                    <td className="px-5 py-4 text-right">
                      <Link href={`/incidents/${inc.id}`} className="p-2 rounded-md hover:bg-[#ffffff14] text-white transition-colors">
                        <i className="bx bx-chevron-right text-lg"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="card p-6">
          <h3 className="text-lg font-bold text-white mb-4">Alert Activity</h3>
          <div className="flex flex-col gap-4">
            {[
              { time: "2 min ago", text: "Multiple failed logins detected", type: "warning" },
              { time: "15 min ago", text: "High risk incident detected: Ransomware", type: "danger" },
              { time: "1 hr ago", text: "System patched successfully", type: "success" },
              { time: "2 hrs ago", text: "Public camera network offline", type: "warning" },
              { time: "4 hrs ago", text: "Payment API timeout spike", type: "info" }
            ].map((alert, i) => (
              <div key={i} className="flex gap-3">
                <div className="mt-1">
                  <div className={`w-2 h-2 rounded-full ${alert.type === 'danger' ? 'bg-[#F43F5E] shadow-[0_0_8px_#F43F5E]' : alert.type === 'warning' ? 'bg-[#F59E0B]' : alert.type === 'success' ? 'bg-[#22C55E]' : 'bg-[#22D3EE]'}`}></div>
                </div>
                <div>
                  <p className="text-sm text-white">{alert.text}</p>
                  <p className="text-xs text-[#71717A] mt-0.5">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
