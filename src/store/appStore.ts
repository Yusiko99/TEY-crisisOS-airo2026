import { create } from 'zustand';
import { Incident, Task, Evidence, MOCK_INCIDENTS, MOCK_TASKS, MOCK_EVIDENCE } from '@/data/mockData';

interface AppState {
  incidents: Incident[];
  tasks: Task[];
  evidence: Evidence[];
  addIncident: (incident: Incident) => void;
  updateIncidentStatus: (id: string, status: Incident['status']) => void;
  updateTaskStatus: (id: string, status: Task['status']) => void;
  addEvidence: (evidence: Evidence) => void;
}

export const useAppStore = create<AppState>((set) => ({
  incidents: MOCK_INCIDENTS,
  tasks: MOCK_TASKS,
  evidence: MOCK_EVIDENCE,
  addIncident: (incident) => set((state) => ({ incidents: [incident, ...state.incidents] })),
  updateIncidentStatus: (id, status) => set((state) => ({
    incidents: state.incidents.map(i => i.id === id ? { ...i, status } : i)
  })),
  updateTaskStatus: (id, status) => set((state) => ({
    tasks: state.tasks.map(t => t.id === id ? { ...t, status } : t)
  })),
  addEvidence: (newEvidence) => set((state) => ({ evidence: [newEvidence, ...state.evidence] }))
}));
