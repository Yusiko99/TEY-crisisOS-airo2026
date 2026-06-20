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
    <div className="flex flex-col gap-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <i className="bx bx-brain text-[#C871DA]"></i>
          AI Triage
        </h2>
        <p className="text-[#A1A1AA] text-sm mt-1">Submit an incident description and get an AI-generated triage result.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="card p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-[#A1A1AA] mb-1">Incident Title</label>
              <input 
                type="text" 
                required
                className="w-full bg-[#ffffff05] border border-[#ffffff14] rounded-lg p-3 text-white focus:outline-none focus:border-[#C871DA] transition-colors"
                placeholder="e.g. Unusual API Timeouts"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#A1A1AA] mb-1">Description</label>
              <textarea 
                required
                rows={4}
                className="w-full bg-[#ffffff05] border border-[#ffffff14] rounded-lg p-3 text-white focus:outline-none focus:border-[#C871DA] transition-colors"
                placeholder="Describe what happened..."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#A1A1AA] mb-1">Affected Service</label>
                <select 
                  className="w-full bg-[#ffffff05] border border-[#ffffff14] rounded-lg p-3 text-white focus:outline-none focus:border-[#C871DA] transition-colors"
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
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A1A1AA] mb-1">Initial Severity</label>
                <select 
                  className="w-full bg-[#ffffff05] border border-[#ffffff14] rounded-lg p-3 text-white focus:outline-none focus:border-[#C871DA] transition-colors"
                  value={formData.severity}
                  onChange={e => setFormData({...formData, severity: e.target.value})}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="primary-button py-3 mt-2 disabled:opacity-50"
            >
              <i className={`bx ${loading ? 'bx-loader-alt animate-spin' : 'bx-sparkles'}`}></i>
              {loading ? 'Analyzing...' : 'Analyze with AI'}
            </button>
          </form>
        </div>

        {/* Result Panel */}
        <div className="card p-0 flex flex-col relative overflow-hidden">
          {!result && !loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-[#71717A] p-6 text-center">
              <i className="bx bx-analyse text-6xl mb-4 opacity-50"></i>
              <p>Awaiting Input</p>
              <p className="text-sm mt-2">Submit an incident to see AI-generated triage insights, risk scores, and recommended playbooks.</p>
            </div>
          )}

          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-[#22D3EE]">
              <i className="bx bx-loader-alt animate-spin text-5xl mb-4"></i>
              <p className="animate-pulse">Processing with Xiaomimimo AI...</p>
            </div>
          )}

          {result && !loading && (
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 animate-in fade-in">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{result.incidentType}</h3>
                  <p className="text-[#A1A1AA] text-sm">Confidence: <span className="text-white font-bold">{result.confidence}%</span></p>
                </div>
                <SeverityBadge severity={result.severity} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#ffffff05] p-4 rounded-xl border border-[#ffffff0a]">
                  <p className="text-xs text-[#A1A1AA] mb-1 uppercase tracking-wide">Affected Service</p>
                  <p className="text-white font-medium">{result.affectedService}</p>
                </div>
                <div className="bg-[#ffffff05] p-4 rounded-xl border border-[#ffffff0a]">
                  <p className="text-xs text-[#A1A1AA] mb-1 uppercase tracking-wide">Recommended Playbook</p>
                  <p className="text-[#22D3EE] font-medium flex items-center gap-2">
                    <i className="bx bx-git-branch"></i> {result.recommendedPlaybook}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-[#A1A1AA] mb-2 uppercase tracking-wide">Potential Impact</p>
                <p className="text-white text-sm bg-[#F43F5E]/10 border border-[#F43F5E]/20 p-3 rounded-lg">
                  {result.potentialImpact}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-[#A1A1AA] mb-2 uppercase tracking-wide">Recommended Team</p>
                  <ul className="flex flex-col gap-2">
                    {result.recommendedRoles?.map((role: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-white">
                        <i className="bx bx-user-circle text-[#C871DA]"></i> {role}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-center items-center">
                   <div className="w-32 h-32">
                     <RiskGauge score={result.riskScore} />
                   </div>
                </div>
              </div>

              <div>
                <p className="text-xs text-[#A1A1AA] mb-2 uppercase tracking-wide">First 15-Minute Actions</p>
                <ul className="flex flex-col gap-2">
                  {result.firstActions?.map((action: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#F8FAFC]">
                      <i className="bx bx-check-circle text-[#22C55E] mt-0.5"></i> 
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
