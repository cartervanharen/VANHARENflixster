
import { create } from 'zustand';

const useStore = create(set => ({
  x: 0,
  setX: (value) => set({ x: value })
}));

export default useStore;