import { create } from "zustand";
interface IItemId {
  id: string;
  setId: (value: string) => void;
}
const useActiveItemId = create<IItemId>()((set) => ({
  id: "",
  setId: (value) =>
    set((state) => {
      // console.log(value);
      return { id: value };
    }),
}));
export default useActiveItemId;
