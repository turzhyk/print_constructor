import { create } from "zustand";

interface CanvasParams {
  width: number;
  height: number;
  absPosX: number;
  absPosY: number;
  setPos: (x: number, y: number) => void;
  setSize: (width: number, height: number) => void;
  getSize: () => { width: number; height: number };
  getPos: () => { x: number; y: number };
}

export const useCanvasStore = create<CanvasParams>()((set, get) => ({
  width: 0,
  height: 0,
  absPosX: 0,
  absPosY: 0,
  setPos: (x, y) => set((state) => ({ ...state, absPosX: x, absPosY: y })),
  setSize: (x, y) => set((state) => ({ ...state, width: x, height: y })),
  getPos: () => {
    return { x: get().absPosX, y: get().absPosY };
  },
  getSize: () => ({ width: get().width, height: get().height }),
}));
