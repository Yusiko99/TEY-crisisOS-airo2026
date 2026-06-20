"use client";
import React from 'react';
import { useAppStore } from '@/store/appStore';
import { useRouter } from 'next/navigation';
import SeverityBadge from '@/components/ui/SeverityBadge';

export default function SimulationsPage() {
  const { addIncident } = useAppStore();
  const router = useRouter();

  const scenarios = [
    { title: "Smart Parking Payment Attack", difficulty: "High", duration: "45-60 min", service: "Smart Parking System", desc: "Simulate a sophisticated API abuse on the payment gateway." },
    { title: "Citizen Data Leak Suspicion", difficulty: "Critical", duration: "30-45 min", service: "Citizen Portal", desc: "Simulate an unauthorized data export from the citizen database." },
    { title: "Public Camera Network Offline", difficulty: "Medium", duration: "30-40 min", service: "Public Camera Network", desc: "Simulate edge node disconnections." },
    { title: "Ransomware Suspicion", difficulty: "High", duration: "60-90 min", service: "Finance System", desc: "Simulate file encryption behavior on finance shares." },
    { title: "Suspicious Admin Login", difficulty: "Medium", duration: "20-30 min", service: "Internal Admin Portal", desc: "Simulate login from anomalous IP location." },
  ];

  const startScenario = (scenario: any) => {
    const newIncident = {
      id: `SIM-${Math.floor(Math.random() * 1000)}`,
      title: `[SIMULATION] ${scenario.title}`,
      description: scenario.desc,
      type: "Simulation",
      severity: scenario.difficulty,
      riskScore: scenario.difficulty === "Critical" ? 95 : scenario.difficulty === "High" ? 85 : 55,
      affectedService: scenario.service,
      status: "Detected" as const,
      reportedBy: "Simulation Engine",
      detectedAt: new Date().toISOString(),
      assignedTo: [],
      playbookId: "PB-SIM",
      impact: "Simulated impact for training purposes."
    };
    
    addIncident(newIncident);
    alert(`Simulation started: ${scenario.title}`);
    router.push(`/incidents/${newIncident.id}`);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <i className="bx bx-test-tube text-[#22C55E]"></i>
          Simulation Center
        </h2>
        <p className="text-[#A1A1AA] text-sm mt-1">Safe demo and training environment with simulated incidents.</p>
      </div>

      <div className="bg-[#22C55E]/10 border border-[#22C55E]/30 p-4 rounded-xl flex items-start gap-3">
        <i className="bx bx-info-circle text-2xl text-[#22C55E]"></i>
        <p className="text-sm text-[#22C55E] pt-0.5">
          Starting a scenario will inject a mock incident into your live dashboard for training and demonstration purposes. No real systems will be affected.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scenarios.map((sc, i) => (
          <div key={i} className="card p-6 flex flex-col justify-between border-t-4 border-t-[#22C55E]">
            <div>
              <div className="flex justify-between items-start mb-4">
                <SeverityBadge severity={sc.difficulty} />
                <span className="text-xs font-bold text-[#A1A1AA] flex items-center gap-1">
                  <i className="bx bx-time-five text-lg"></i> {sc.duration}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{sc.title}</h3>
              <p className="text-sm text-[#A1A1AA] mb-4">{sc.desc}</p>
              
              <div className="text-xs text-[#71717A] bg-[#ffffff05] p-3 rounded-lg">
                <span className="block mb-1 font-bold uppercase tracking-wider">Target Service:</span>
                <span className="text-white">{sc.service}</span>
              </div>
            </div>
            
            <button 
              onClick={() => startScenario(sc)}
              className="w-full py-3 mt-6 rounded-lg bg-gradient-to-r from-[#22C55E]/20 to-[#22C55E]/10 hover:from-[#22C55E]/30 hover:to-[#22C55E]/20 border border-[#22C55E]/50 text-[#22C55E] font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              <i className="bx bx-play-circle text-lg"></i> Start Scenario
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
