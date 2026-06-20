"use client";
import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/appStore';
import SeverityBadge from '@/components/ui/SeverityBadge';
import StatusBadge from '@/components/ui/StatusBadge';

export default function IncidentsPage() {
  const { incidents } = useAppStore();

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <i className="bx bx-error-circle text-[#F43F5E]"></i>
            Incident Management
          </h2>
          <p className="text-[#A1A1AA] text-sm mt-1">Track, manage, and resolve security incidents.</p>
        </div>
        <Link href="/triage" className="primary-button px-5 py-2.5">
          <i className="bx bx-plus"></i>
          New Incident
        </Link>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="p-5 border-b border-[#ffffff14] flex justify-between items-center">
          <div className="flex gap-2">
            <div className="relative">
              <i className="bx bx-search absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]"></i>
              <input 
                type="text" 
                placeholder="Search incidents..." 
                className="pl-9 pr-4 py-2 bg-[#ffffff05] border border-[#ffffff14] rounded-lg text-sm text-white focus:outline-none focus:border-[#C871DA]"
              />
            </div>
            <button className="px-4 py-2 bg-[#ffffff05] border border-[#ffffff14] rounded-lg text-sm text-white hover:bg-[#ffffff10] flex items-center gap-2">
              <i className="bx bx-filter"></i> Filter
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#A1A1AA]">
            <thead className="bg-[#ffffff05] border-b border-[#ffffff14] text-xs uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Severity</th>
                <th className="px-5 py-3">Affected Service</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Detected At</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((inc) => (
                <tr key={inc.id} className="border-b border-[#ffffff0a] hover:bg-[#ffffff05] transition-colors">
                  <td className="px-5 py-4 font-medium text-white">{inc.id}</td>
                  <td className="px-5 py-4 text-white">{inc.title}</td>
                  <td className="px-5 py-4"><SeverityBadge severity={inc.severity} /></td>
                  <td className="px-5 py-4">{inc.affectedService}</td>
                  <td className="px-5 py-4"><StatusBadge status={inc.status} /></td>
                  <td className="px-5 py-4">{new Date(inc.detectedAt).toLocaleString()}</td>
                  <td className="px-5 py-4 text-right">
                    <Link href={`/incidents/${inc.id}`} className="p-2 rounded-md bg-[#C871DA]/10 text-[#C871DA] hover:bg-[#C871DA]/20 transition-colors inline-flex">
                      Review
                    </Link>
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
