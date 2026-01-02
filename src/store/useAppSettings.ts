import { create } from 'zustand';
import api from '@/lib/api';

const useAppSettings = create((set) => ({
  settings: null,
  isLoading: false,
  error: null,

  fetchSettings: async () => {
    set({ isLoading: true, error: null });
    try {
      // Sesuaikan endpoint jika baseURL di axios belum termasuk '/api'
      const response = await api.get('/settings'); 
      set({ settings: response.data, isLoading: false });
    } catch (err) {
      console.error("Failed to fetch settings:", err);
      set({ error: err, isLoading: false });
    }
  },
}));

export default useAppSettings;