import { create } from "zustand";
interface ITextureUrl {
  link: string;
  setLink: (value: string) => void;
}
const useTextureLinkStore = create<ITextureUrl>()((set) => ({
  link: "",
  setLink: (value) => set((state) => ({ link: value })),
}));
export default useTextureLinkStore;