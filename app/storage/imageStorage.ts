import { create } from "zustand";

interface IBuilderItem {
  id: string;
  file?: File;
  type: "image" | "text";
  name: string;
  setName: (value: string) => void;
}

const useBuilderItems = create<IBuilderItem>()((set) => ({
  id: "",
  file: undefined,
  type: "image",
  name: "",
  setName: (value) => set(() => ({ name: value })),
}));
