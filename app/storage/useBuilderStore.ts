import { create } from "zustand";

interface IBuilderItemDimentions {
  x: number;
  y: number;
  width: number;
  height: number;
}
interface IBuilderItemProps{
  dim:IBuilderItemDimentions;
}
export enum BuilderItemType {
  Text = "text",
  Image = "image",
}
type BuilderItem = {
  id: string;
  file?: File;
  type: BuilderItemType;
  name: string;
};
interface IBuilderItems {
  items: BuilderItem[];
  addItem: (type: BuilderItemType, name: string, file?: File) => void;
  removeItem :(id:string) =>void;
  renameItem: (id:string, value:string) =>void; 
}
export const useItemStore = create<IBuilderItems>()((set) => ({
  items: [],
  addItem: (type, name, file) =>
    set((state) => ({
      items: [
        ...state.items,
        { id: crypto.randomUUID(), name: name, type, file: file },
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
