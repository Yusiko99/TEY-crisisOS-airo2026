"use client";
import React, { useState } from 'react';
import { useAppStore } from '@/store/appStore';

export default function EvidenceVaultPage() {
  const { evidence, addEvidence } = useAppStore();
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Log', 'Screenshot', 'File', 'Note'];
  
  const filteredEvidence = activeTab === 'All' ? evidence : evidence.filter(e => e.type === activeTab);

  const getIcon = (type: string) => {
    switch(type) {
      case 'Log': return 'bx-terminal text-[#22C55E]';
      case 'Screenshot': return 'bx-image text-[#22D3EE]';
      case 'File': return 'bx-file text-[#C871DA]';
      case 'Note': return 'bx-note text-[#F59E0B]';
      default: return 'bx-folder';
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <i className="bx bx-folder text-[#22D3EE]"></i>
            Evidence Vault
          </h2>
          <p className="text-[#A1A1AA] text-sm mt-1">Secure repository for incident logs, screenshots, and notes.</p>
        </div>
        <button className="primary-button px-5 py-2.5">
          <i className="bx bx-upload"></i>
          Upload Evidence
        </button>
      </div>

      <div className="bg-[#22D3EE]/10 border border-[#22D3EE]/30 p-4 rounded-xl flex items-start gap-3">
        <i className="bx bx-shield-quarter text-2xl text-[#22D3EE]"></i>
        <p className="text-sm text-[#22D3EE] pt-0.5">
          All evidence is encrypted and access is role-based. This MVP uses simulated evidence records for demo purposes.
        </p>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="p-5 border-b border-[#ffffff14] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex gap-2 border border-[#ffffff14] rounded-lg p-1 bg-[#ffffff05]">
            {tabs.map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-md text-sm transition-colors ${activeTab === tab ? 'bg-[#ffffff14] text-white' : 'text-[#A1A1AA] hover:text-white'}`}
              >
                {tab === 'All' ? 'All Evidence' : tab + 's'}
              </button>
            ))}
          </div>
          <div className="relative">
            <i className="bx bx-search absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]"></i>
            <input 
              type="text" 
              placeholder="Search files..." 
              className="pl-9 pr-4 py-1.5 bg-[#ffffff05] border border-[#ffffff14] rounded-lg text-sm text-white focus:outline-none focus:border-[#C871DA]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#A1A1AA]">
            <thead className="bg-[#ffffff05] border-b border-[#ffffff14] text-xs uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Source</th>
                <th className="px-5 py-3">Collected At</th>
                <th className="px-5 py-3">Collected By</th>
                <th className="px-5 py-3">Hash Integrity</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvidence.map((ev) => (
                <tr key={ev.id} className="border-b border-[#ffffff0a] hover:bg-[#ffffff05] transition-colors">
                  <td className="px-5 py-4 font-medium text-white flex items-center gap-2">
                    <i className={`bx ${getIcon(ev.type)} text-lg`}></i>
                    {ev.name}
                  </td>
                  <td className="px-5 py-4">{ev.type}</td>
                  <td className="px-5 py-4">{ev.source}</td>
                  <td className="px-5 py-4">{ev.collectedAt}</td>
                  <td className="px-5 py-4">{ev.collectedBy}</td>
                  <td className="px-5 py-4 font-mono text-xs">{ev.hash}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 rounded hover:bg-[#ffffff14] text-[#22D3EE] transition-colors"><i className="bx bx-download"></i></button>
                      <button className="p-1.5 rounded hover:bg-[#F43F5E]/20 text-[#F43F5E] transition-colors"><i className="bx bx-trash"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
