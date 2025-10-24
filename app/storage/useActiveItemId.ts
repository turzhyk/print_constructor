import { create } from "zustand";
interface IItemId {
  id: string;
  setId: (value: string) => void;
}
const useActiveItemId = create<IItemId>()((set) => ({
  id: "",
  setId: (value) => set((state) => ({ id: value })),
}));
export default useActiveItemId;