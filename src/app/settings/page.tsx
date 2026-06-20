import React from 'react';

export default function SettingsPage() {
  const integrations = [
    { name: "SIEM", desc: "Security Info & Event Mgmt", status: "Connected", icon: "bx-shield-quarter" },
    { name: "Slack", desc: "Team Communication", status: "Connected", icon: "bxl-slack" },
    { name: "Microsoft Teams", desc: "Enterprise Chat", status: "Not Connected", icon: "bxl-microsoft-teams" },
    { name: "Jira", desc: "Issue Tracking", status: "Connected", icon: "bxl-jira" },
    { name: "Email", desc: "SMTP Gateway", status: "Connected", icon: "bx-envelope" },
    { name: "Webhook", desc: "Custom HTTP endpoints", status: "Not Connected", icon: "bx-link" },
    { name: "Cloud Logs", desc: "AWS/Azure/GCP", status: "Coming Soon", icon: "bx-cloud" },
    { name: "API Gateway", desc: "Edge routing", status: "Connected", icon: "bx-server" },
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <i className="bx bx-cog text-[#71717A]"></i>
          Settings & Integrations
        </h2>
        <p className="text-[#A1A1AA] text-sm mt-1">Configure your workspace and third-party connections.</p>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="flex border-b border-[#ffffff14] bg-[#ffffff05]">
          {['Integrations', 'Organization', 'Thresholds', 'Access Control', 'Audit Logs'].map((tab, i) => (
            <button key={tab} className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${i === 0 ? 'border-[#C871DA] text-[#C871DA]' : 'border-transparent text-[#A1A1AA] hover:text-white hover:bg-[#ffffff05]'}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6">
          <h3 className="text-lg font-bold text-white mb-6">Connected Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map((int, i) => (
              <div key={i} className="bg-[#ffffff05] border border-[#ffffff14] rounded-xl p-4 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-lg bg-[#ffffff0a] border border-[#ffffff14] flex items-center justify-center">
                    <i className={`bx ${int.icon} text-2xl text-white`}></i>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border ${int.status === 'Connected' ? 'bg-[#22C55E]/10 border-[#22C55E]/30 text-[#22C55E]' : int.status === 'Coming Soon' ? 'bg-[#71717A]/10 border-[#71717A]/30 text-[#A1A1AA]' : 'bg-[#F43F5E]/10 border-[#F43F5E]/30 text-[#F43F5E]'}`}>
                    {int.status}
                  </span>
                </div>
                <div>
                  <h4 className="text-white font-bold">{int.name}</h4>
                  <p className="text-xs text-[#A1A1AA] mt-1">{int.desc}</p>
                </div>
                <button className={`w-full py-2 rounded-lg text-sm font-medium border transition-colors ${int.status === 'Connected' ? 'border-[#ffffff14] text-white hover:bg-[#ffffff0a]' : int.status === 'Coming Soon' ? 'border-[#ffffff0a] text-[#71717A] cursor-not-allowed' : 'border-[#C871DA]/30 text-[#C871DA] hover:bg-[#C871DA]/10'}`}>
                  {int.status === 'Connected' ? 'Configure' : int.status === 'Coming Soon' ? 'Waitlist' : 'Connect'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
