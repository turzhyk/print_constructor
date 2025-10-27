import { create } from "zustand";
import { BuilderItemType } from "./BuilderItemType";

type BuilderItem = {
  id: string;
  file?: File;
  type: BuilderItemType;
  name: string;
};
interface IBuilderItems {
  items: BuilderItem[];
  addItem: (id:string,type: BuilderItemType, name: string, file?: File) => void;
  removeItem :(id:string) =>void;
  renameItem: (id:string, value:string) =>void; 
}
export const useItemStore = create<IBuilderItems>()((set) => ({
  items: [],
  addItem: (id,type, name, file) =>
    set((state) => ({
      items: [
        ...state.items,
        { id: id, name: name, type, file: file },
      ],
    })),
  removeItem: (id: string) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  renameItem: (id: string, value: string) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, name: value } : item
      ),
    })),
}));
