"use client";
import React, { useState } from 'react';
import SeverityBadge from '@/components/ui/SeverityBadge';
import RiskGauge from '@/components/dashboard/RiskGauge';

export default function TriagePage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    service: 'Smart Parking System',
    severity: 'Medium',
  });
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) throw new Error('API Error');
      
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert('Failed to analyze with AI. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold text-white flex items-center gap-3 tracking-tight">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C871DA]/20 to-[#22D3EE]/20 flex items-center justify-center border border-[#ffffff14]">
            <i className="bx bx-brain text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#C871DA] to-[#22D3EE]"></i>
          </div>
          AI Triage
        </h2>
        <p className="text-[#A1A1AA] text-sm md:text-base max-w-2xl">
          Deploy intelligent agents to instantly analyze incident vectors, generate risk scores, and orchestrate automated mitigation playbooks.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Form Panel */}
        <div className="card p-8 xl:col-span-5 h-full relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C871DA] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:opacity-10 transition-opacity duration-700"></div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
            <div className="border-b border-[#ffffff14] pb-4 mb-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <i className="bx bx-target-lock text-[#22D3EE]"></i>
                Incident Input
              </h3>
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1AA] mb-2">Incident Title</label>
                <div className="relative">
                  <i className="bx bx-text absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A] text-lg"></i>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-[#0A0A0A]/50 border border-[#ffffff14] rounded-xl pl-12 p-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C871DA]/30 focus:border-[#C871DA] transition-all placeholder:text-[#4B5563]"
                    placeholder="e.g. Unusual API Timeouts in Gateway"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1AA] mb-2">Detailed Description</label>
                <div className="relative">
                  <i className="bx bx-align-left absolute left-4 top-4 text-[#71717A] text-lg"></i>
                  <textarea 
                    required
                    rows={5}
                    className="w-full bg-[#0A0A0A]/50 border border-[#ffffff14] rounded-xl pl-12 p-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C871DA]/30 focus:border-[#C871DA] transition-all placeholder:text-[#4B5563] resize-none"
                    placeholder="Provide telemetry data, error codes, or observed anomalies..."
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1AA] mb-2">Target Service</label>
                  <div className="relative">
                    <i className="bx bx-server absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]"></i>
                    <select 
                      className="w-full bg-[#0A0A0A]/50 border border-[#ffffff14] rounded-xl pl-10 p-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C871DA]/30 focus:border-[#C871DA] transition-all appearance-none cursor-pointer"
                      value={formData.service}
                      onChange={e => setFormData({...formData, service: e.target.value})}
                    >
                      <option>Smart Parking System</option>
                      <option>Citizen Portal</option>
                      <option>Public Camera Network</option>
                      <option>City Payment Gateway</option>
                      <option>Email Gateway</option>
                      <option>Finance System</option>
                      <option>Internal Admin Portal</option>
                    </select>
                    <i className="bx bx-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none"></i>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1AA] mb-2">Initial Severity</label>
                  <div className="relative">
                    <i className="bx bx-error absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]"></i>
                    <select 
                      className="w-full bg-[#0A0A0A]/50 border border-[#ffffff14] rounded-xl pl-10 p-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C871DA]/30 focus:border-[#C871DA] transition-all appearance-none cursor-pointer"
                      value={formData.severity}
                      onChange={e => setFormData({...formData, severity: e.target.value})}
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                    <i className="bx bx-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none"></i>
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="primary-button w-full py-4 mt-4 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <i className={`bx ${loading ? 'bx-loader-alt animate-spin' : 'bx-sparkles'} text-xl relative z-10`}></i>
              <span className="relative z-10 text-base">{loading ? 'Running AI Diagnostics...' : 'Initiate AI Triage'}</span>
            </button>
          </form>
        </div>

        {/* Intelligence Result Panel */}
        <div className="card p-0 flex flex-col relative overflow-hidden xl:col-span-7 h-full min-h-[600px] border-[#ffffff1a] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          {/* Empty State */}
          {!result && !loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-[#71717A] p-8 text-center bg-gradient-to-b from-[#ffffff02] to-transparent">
              <div className="relative w-32 h-32 flex items-center justify-center mb-8">
                <div className="absolute inset-0 rounded-full border border-[#ffffff0a] animate-[ping_4s_ease-in-out_infinite]"></div>
                <div className="absolute inset-4 rounded-full border border-[#ffffff0a] animate-[ping_4s_ease-in-out_infinite_1s]"></div>
                <div className="absolute inset-8 rounded-full border border-[#ffffff0a] animate-[ping_4s_ease-in-out_infinite_2s]"></div>
                <i className="bx bx-radar text-6xl text-[#ffffff1a] z-10 relative"></i>
              </div>
              <h3 className="text-white text-xl font-bold mb-3 tracking-tight">System on Standby</h3>
              <p className="text-sm max-w-md leading-relaxed text-[#A1A1AA]">
                Enter incident details to engage CrisisOS AI. The system will automatically classify threats, predict impact, and assemble a containment playbook.
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A0A0A]/90 backdrop-blur-md z-20 transition-all duration-500">
              <div className="relative flex items-center justify-center w-24 h-24 mb-8">
                <svg className="animate-spin text-[#C871DA] w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                  <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <i className="bx bx-brain absolute text-3xl text-[#22D3EE] animate-pulse"></i>
              </div>
              <p className="text-[#22D3EE] font-bold tracking-[0.2em] uppercase text-sm animate-pulse mb-2">Analyzing Threat Vectors</p>
              <div className="w-48 h-1 bg-[#ffffff10] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#22D3EE] to-[#C871DA] w-full animate-[progress_2s_ease-in-out_infinite_alternate]"></div>
              </div>
            </div>
          )}

          {/* Success State */}
          {result && !loading && (
            <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-8 animate-in fade-in zoom-in-95 duration-500">
              
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-[#ffffff14]">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#C871DA]/10 border border-[#C871DA]/30 flex items-center justify-center shadow-[0_0_20px_rgba(200,113,218,0.15)] shrink-0">
                    <i className="bx bx-bug-alt text-3xl text-[#C871DA]"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1.5 tracking-tight leading-tight">{result.incidentType}</h3>
                    <div className="flex items-center gap-3">
                      <p className="text-[#A1A1AA] text-xs uppercase tracking-wider font-semibold">AI Match Confidence</p>
                      <span className="text-[#22C55E] font-bold flex items-center bg-[#22C55E]/10 px-2.5 py-1 rounded-full text-xs border border-[#22C55E]/20">
                        <i className="bx bx-check-shield mr-1.5 text-sm"></i> {result.confidence}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="md:ml-auto">
                  <SeverityBadge severity={result.severity} />
                </div>
              </div>

              {/* Top Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-gradient-to-br from-[#ffffff08] to-transparent p-5 rounded-2xl border border-[#ffffff14] hover:border-[#ffffff2a] transition-colors group relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-24 h-24 bg-white opacity-[0.02] rounded-bl-full pointer-events-none"></div>
                  <div className="flex items-center gap-3 mb-2">
                    <i className="bx bx-server text-[#A1A1AA] group-hover:text-white transition-colors"></i>
                    <p className="text-xs text-[#A1A1AA] uppercase tracking-wider font-bold">Affected Service</p>
                  </div>
                  <p className="text-white font-semibold text-lg">{result.affectedService}</p>
                </div>
                
                <div className="bg-gradient-to-br from-[#22D3EE]/10 to-[#22D3EE]/0 p-5 rounded-2xl border border-[#22D3EE]/20 hover:border-[#22D3EE]/40 transition-colors group relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-24 h-24 bg-[#22D3EE] opacity-10 rounded-bl-full pointer-events-none"></div>
                  <div className="flex items-center gap-3 mb-2">
                    <i className="bx bx-git-branch text-[#22D3EE]"></i>
                    <p className="text-xs text-[#22D3EE] uppercase tracking-wider font-bold">Recommended Playbook</p>
                  </div>
                  <p className="text-white font-semibold text-lg">{result.recommendedPlaybook}</p>
                </div>
              </div>

              {/* Impact Card */}
              <div className="relative overflow-hidden rounded-2xl border border-[#F43F5E]/30 bg-[#F43F5E]/10 p-6 shadow-[inset_0_0_20px_rgba(244,63,94,0.05)]">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#F43F5E] opacity-10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                <div className="flex items-center gap-2 mb-3 relative z-10">
                  <i className="bx bx-error-circle text-[#F43F5E] text-lg"></i>
                  <p className="text-xs text-[#F43F5E] uppercase tracking-wider font-bold">Predicted System Impact</p>
                </div>
                <p className="text-white text-sm leading-relaxed relative z-10">
                  {result.potentialImpact}
                </p>
              </div>

              {/* Mid Section: Team & Gauge */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#000000]/30 rounded-2xl border border-[#ffffff0a] p-6">
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <i className="bx bx-group text-[#C871DA] text-lg"></i>
                    <p className="text-xs text-[#A1A1AA] uppercase tracking-wider font-bold">Required Response Team</p>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {result.recommendedRoles?.map((role: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-sm font-medium text-white bg-[#ffffff0a] px-3.5 py-1.5 rounded-full border border-[#ffffff14] shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#C871DA] to-[#22D3EE]"></span>
                        {role}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-[#ffffff10] pt-6 md:pt-0 pl-0 md:pl-6">
                   <div className="w-full max-w-[220px]">
                     <RiskGauge score={result.riskScore} />
                   </div>
                </div>
              </div>

              {/* Actions Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <i className="bx bx-time-five text-[#22C55E] text-lg"></i>
                  <p className="text-xs text-[#A1A1AA] uppercase tracking-wider font-bold">Immediate 15-Minute Protocol</p>
                </div>
                <div className="flex flex-col gap-3">
                  {result.firstActions?.map((action: string, i: number) => (
                    <div key={i} className="group flex items-start gap-4 bg-[#ffffff05] p-4 rounded-xl border border-[#ffffff0a] hover:bg-[#ffffff0c] hover:border-[#ffffff1a] transition-all duration-300">
                      <div className="w-7 h-7 rounded-full bg-[#22C55E]/10 flex items-center justify-center shrink-0 mt-0 border border-[#22C55E]/30 group-hover:bg-[#22C55E]/20 transition-colors">
                        <span className="text-[#22C55E] text-xs font-bold">{i + 1}</span>
                      </div>
                      <span className="text-[#F8FAFC] text-sm leading-relaxed mt-0.5 font-medium">{action}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
