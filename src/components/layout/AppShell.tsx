"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", path: "/", icon: "bx-grid-alt" },
    { name: "Incidents", path: "/incidents", icon: "bx-error-circle" },
    { name: "AI Triage", path: "/triage", icon: "bx-brain" },
    { name: "Attack Surface", path: "/attack-surface", icon: "bx-radar" },
    { name: "Playbooks", path: "/playbooks", icon: "bx-git-branch" },
    { name: "Reports", path: "/reports", icon: "bx-file" },
    { name: "Simulations", path: "/simulations", icon: "bx-test-tube" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F8FAFC] flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/40 backdrop-blur-md border-b border-[#ffffff14]">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C871DA] to-[#22D3EE] p-[1px]">
            <div className="w-full h-full rounded-xl bg-[#0A0A0A] flex items-center justify-center">
              <i className="bx bx-shield-quarter text-2xl text-[#C871DA]"></i>
            </div>
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">CrisisOS AI</h1>
            <p className="text-[10px] text-[#A1A1AA] uppercase tracking-wider">AI Incident Command Center</p>
          </div>
        </div>

        {/* Floating Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-[#ffffff0a] p-1 rounded-full border border-[#ffffff14]">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (pathname.startsWith(item.path) && item.path !== "/");
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive ? "active-nav" : "text-[#A1A1AA] hover:text-white hover:bg-[#ffffff0a]"
                }`}
              >
                <i className={`bx ${item.icon} text-lg`}></i>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Utilities */}
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[#ffffff0a] border border-[#ffffff14] text-[#A1A1AA] hover:text-white transition-colors">
            <i className="bx bx-search text-xl"></i>
          </button>
          <button className="relative w-10 h-10 rounded-full flex items-center justify-center bg-[#ffffff0a] border border-[#ffffff14] text-[#A1A1AA] hover:text-white transition-colors">
            <i className="bx bx-bell text-xl"></i>
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#F43F5E] rounded-full"></span>
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[#ffffff0a] border border-[#ffffff14] text-[#A1A1AA] hover:text-white transition-colors">
            <i className="bx bx-cog text-xl"></i>
          </button>
          <div className="relative cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
              alt="User profile" 
              className="w-10 h-10 rounded-full object-cover border border-[#ffffff20] hover:border-[#ffffff40] transition-colors"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#22C55E] border-2 border-[#0A0A0A] rounded-full"></span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pt-24 px-6 pb-6 max-w-[1920px] mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
