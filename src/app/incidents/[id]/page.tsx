"use client";
import React from 'react';
import { useAppStore } from '@/store/appStore';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import SeverityBadge from '@/components/ui/SeverityBadge';
import StatusBadge from '@/components/ui/StatusBadge';
import RiskGauge from '@/components/dashboard/RiskGauge';

export default function IncidentDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { incidents, updateIncidentStatus } = useAppStore();
  const incident = incidents.find(i => i.id === id);

  if (!incident) {
    return <div className="text-white">Incident not found.</div>;
  }

  const steps = [
    { name: "Detected", icon: "bx-radar" },
    { name: "Triage", icon: "bx-brain" },
    { name: "Containment", icon: "bx-lock" },
    { name: "Eradication", icon: "bx-shield-x" },
    { name: "Recovery", icon: "bx-refresh" },
    { name: "Resolved", icon: "bx-check-circle" },
  ];

  const currentStepIndex = steps.findIndex(s => s.name === incident.status);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="card p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-white">{incident.title}</h2>
            <SeverityBadge severity={incident.severity} />
            <StatusBadge status={incident.status} />
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#A1A1AA]">
            <span><strong>ID:</strong> {incident.id}</span>
            <span><strong>Detected:</strong> {new Date(incident.detectedAt).toLocaleString()}</span>
            <span><strong>Reported by:</strong> {incident.reportedBy}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24">
            <RiskGauge score={incident.riskScore} />
          </div>
          <div className="flex flex-col gap-2">
            <select 
              value={incident.status}
              onChange={(e) => updateIncidentStatus(incident.id, e.target.value as any)}
              className="bg-[#ffffff0a] border border-[#ffffff14] text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#C871DA]"
            >
              {steps.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
            </select>
            <button className="primary-button py-2 px-4 text-sm"><i className="bx bx-file"></i> Generate Report</button>
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="flex gap-4 border-b border-[#ffffff14] pb-2">
        {['Overview', 'Timeline', 'Tasks', 'Evidence', 'Communications'].map((tab, i) => (
          <Link key={tab} href={tab === 'Tasks' || tab === 'Timeline' ? '/timeline' : tab === 'Evidence' ? '/evidence' : '#'} 
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${i === 0 ? 'bg-[#ffffff0a] text-white' : 'text-[#A1A1AA] hover:text-white'}`}>
            {tab}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Summary */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-white mb-4">Incident Summary</h3>
            <p className="text-[#A1A1AA] leading-relaxed">{incident.description}</p>
            <div className="mt-4 p-4 bg-[#F43F5E]/5 border border-[#F43F5E]/20 rounded-lg">
              <h4 className="text-sm font-bold text-[#F43F5E] mb-1">Impact</h4>
              <p className="text-sm text-white">{incident.impact}</p>
            </div>
          </div>

          {/* Status Tracker */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-white mb-6">Response Lifecycle</h3>
            <div className="flex justify-between items-center relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[#ffffff0a] -z-10"></div>
              {steps.map((step, idx) => {
                const isCompleted = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                return (
                  <div key={step.name} className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-[#0A0A0A] ${isCompleted ? 'bg-[#22C55E] text-black' : isCurrent ? 'bg-[#C871DA] text-white shadow-[0_0_15px_#C871DA]' : 'bg-[#1a1a1a] text-[#71717A]'}`}>
                      <i className={`bx ${step.icon} text-xl`}></i>
                    </div>
                    <span className={`text-xs font-medium ${isCurrent ? 'text-[#C871DA]' : isCompleted ? 'text-[#A1A1AA]' : 'text-[#71717A]'}`}>
                      {step.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Playbook Steps preview */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-white mb-4">Recommended Playbook Actions</h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-3 p-3 rounded-lg bg-[#ffffff05] border border-[#ffffff0a]">
                <input type="checkbox" className="w-5 h-5 rounded border-[#71717A] bg-transparent text-[#C871DA] focus:ring-0 focus:ring-offset-0" />
                <span className="text-sm text-white">Validate the scope and impact of payment failure</span>
              </li>
              <li className="flex items-center gap-3 p-3 rounded-lg bg-[#ffffff05] border border-[#ffffff0a]">
                <input type="checkbox" className="w-5 h-5 rounded border-[#71717A] bg-transparent text-[#C871DA]" />
                <span className="text-sm text-white">Isolate affected gateway instances</span>
              </li>
              <li className="flex items-center justify-center p-2">
                <Link href="/playbooks" className="text-[#22D3EE] text-sm hover:underline">View full playbook &rarr;</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Col */}
        <div className="flex flex-col gap-6">
          <div className="card p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Assigned Team</h3>
              <button className="text-[#C871DA] text-sm hover:underline">Manage</button>
            </div>
            <div className="flex flex-col gap-4">
              {incident.assignedTo.map((member, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#ffffff05] border border-[#ffffff0a]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#C871DA] flex items-center justify-center text-black font-bold">
                      {member.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{member}</p>
                      <p className="text-xs text-[#A1A1AA]">Responder</p>
                    </div>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-[#ffffff0a] text-[#A1A1AA] hover:text-white flex items-center justify-center">
                    <i className="bx bx-message-square-dots"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
