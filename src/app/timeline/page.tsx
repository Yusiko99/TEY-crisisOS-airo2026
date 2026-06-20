"use client";
import React from 'react';
import { useAppStore } from '@/store/appStore';
import SeverityBadge from '@/components/ui/SeverityBadge';

export default function TimelinePage() {
  const { tasks, updateTaskStatus } = useAppStore();

  const columns = ["Open", "In Progress", "Monitoring", "Resolved"];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-full">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <i className="bx bx-time-five text-[#F59E0B]"></i>
          Timeline & Tasks
        </h2>
        <p className="text-[#A1A1AA] text-sm mt-1">Response history timeline and active Kanban board.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Timeline (1/4 width) */}
        <div className="card p-6">
          <h3 className="text-lg font-bold text-white mb-6">Incident Timeline</h3>
          <div className="flex flex-col gap-6 relative">
            <div className="absolute left-3.5 top-2 bottom-0 w-px bg-[#ffffff14]"></div>
            {[
              { time: "10:18 AM", text: "Incident detected by monitoring system", color: "text-[#22D3EE]" },
              { time: "10:20 AM", text: "Alert triggered: Payment API errors spike", color: "text-[#F59E0B]" },
              { time: "10:22 AM", text: "AI triage completed, risk score 92", color: "text-[#C871DA]" },
              { time: "10:25 AM", text: "Incident assigned to Security Lead", color: "text-white" },
              { time: "10:30 AM", text: "Initial containment started", color: "text-white" },
              { time: "10:45 AM", text: "Payment gateway isolated", color: "text-[#22C55E]" },
            ].map((event, i) => (
              <div key={i} className="flex gap-4 relative">
                <div className="w-7 h-7 rounded-full bg-[#0A0A0A] border-4 border-[#ffffff14] z-10 flex-shrink-0"></div>
                <div className="pt-0.5">
                  <p className={`text-sm font-medium ${event.color}`}>{event.text}</p>
                  <p className="text-xs text-[#71717A] mt-1">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Board (3/4 width) */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
            {columns.map(col => (
              <div key={col} className="bg-[#ffffff05] rounded-xl border border-[#ffffff0a] p-4 flex flex-col gap-4">
                <h4 className="text-sm font-bold text-[#A1A1AA] uppercase tracking-wider flex justify-between">
                  {col}
                  <span className="bg-[#ffffff14] px-2 py-0.5 rounded-md text-white">
                    {tasks.filter(t => t.status === col).length}
                  </span>
                </h4>
                <div className="flex flex-col gap-3">
                  {tasks.filter(t => t.status === col).map(task => (
                    <div key={task.id} className="card p-4 hover:border-[#C871DA]/50 transition-colors cursor-pointer group">
                      <div className="flex justify-between items-start mb-2">
                        <SeverityBadge severity={task.priority} />
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          <button onClick={() => updateTaskStatus(task.id, 'Resolved')} className="p-1 text-[#22C55E] hover:bg-[#22C55E]/20 rounded"><i className="bx bx-check"></i></button>
                        </div>
                      </div>
                      <p className="text-sm text-white font-medium mb-3">{task.title}</p>
                      <div className="flex justify-between items-center text-xs text-[#71717A]">
                        <div className="flex items-center gap-1">
                          <i className="bx bx-time-five"></i> {task.dueTime}
                        </div>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#C871DA] text-black flex items-center justify-center font-bold">
                          {task.assignedTo.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
