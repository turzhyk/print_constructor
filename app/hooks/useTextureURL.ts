'use client'
import { create } from "zustand";
interface ITextureUrl {
  link: string;
  setLink: (value: string) => void;
}
const useTextureLinkStore = create<ITextureUrl>()((set) => ({
  link: "cup_color_placeholder.jpg",
  setLink: (value) =>
    set((state) => {
      // console.log(value);
      return { link: value };
    }),
}));
export default useTextureLinkStore;
