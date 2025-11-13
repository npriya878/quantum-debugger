import { Universe, DebugSession } from '../types';

export interface StorageData {
  bugHistory: DebugSession[];
  quantumLevel: number;
  totalXP: number;
  lastUpdated: string;
}

const STORAGE_KEY = 'quantum_debugger_data';

export const storage = {
  load(): StorageData {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        return {
          bugHistory: [],
          quantumLevel: 1,
          totalXP: 0,
          lastUpdated: new Date().toISOString(),
        };
      }
      return JSON.parse(saved);
    } catch (err) {
      console.error('Failed to load storage:', err);
      return {
        bugHistory: [],
        quantumLevel: 1,
        totalXP: 0,
        lastUpdated: new Date().toISOString(),
      };
    }
  },

  save(data: StorageData): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error('Failed to save storage:', err);
    }
  },

  addSession(session: Omit<DebugSession, 'id' | 'created_at'>): DebugSession {
    const data = this.load();
    const newSession: DebugSession = {
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      ...session,
    };
    data.bugHistory.push(newSession);
    data.lastUpdated = new Date().toISOString();
    this.save(data);
    return newSession;
  },

  getSessions(): DebugSession[] {
    return this.load().bugHistory;
  },

  deleteSession(id: string): void {
    const data = this.load();
    data.bugHistory = data.bugHistory.filter((s) => s.id !== id);
    data.lastUpdated = new Date().toISOString();
    this.save(data);
  },

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  },

  updateStats(quantumLevel: number, totalXP: number): void {
    const data = this.load();
    data.quantumLevel = quantumLevel;
    data.totalXP = totalXP;
    data.lastUpdated = new Date().toISOString();
    this.save(data);
  },
};
