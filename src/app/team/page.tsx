import React from 'react';
import { MOCK_TEAM } from '@/data/mockData';

export default function TeamPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <i className="bx bx-group text-[#C871DA]"></i>
            Team & Roles
          </h2>
          <p className="text-[#A1A1AA] text-sm mt-1">Manage incident response personnel and assignments.</p>
        </div>
        <button className="primary-button px-5 py-2.5">
          <i className="bx bx-user-plus"></i>
          Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_TEAM.map((member) => (
          <div key={member.id} className="card p-6 flex flex-col items-center text-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#C871DA] flex items-center justify-center text-black font-bold text-2xl mb-4">
                {member.avatar}
              </div>
              <div className={`absolute bottom-4 right-0 w-4 h-4 rounded-full border-2 border-[#0A0A0A] ${member.status === 'Available' ? 'bg-[#22C55E]' : member.status === 'Busy' ? 'bg-[#F43F5E]' : 'bg-[#F59E0B]'}`}></div>
            </div>
            <h3 className="text-lg font-bold text-white">{member.name}</h3>
            <p className="text-sm text-[#C871DA] mb-4">{member.role}</p>
            
            <div className="w-full flex gap-2">
              <button className="flex-1 py-2 bg-[#ffffff0a] hover:bg-[#ffffff14] border border-[#ffffff14] rounded-lg text-sm text-white transition-colors">
                Assign
              </button>
              <button className="w-10 flex-shrink-0 py-2 bg-[#ffffff0a] hover:bg-[#ffffff14] border border-[#ffffff14] rounded-lg text-[#22D3EE] transition-colors">
                <i className="bx bx-message-rounded-dots"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
