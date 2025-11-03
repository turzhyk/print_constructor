'use client'
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
  addItem: (
    id: string,
    type: BuilderItemType,
    name: string,
    file?: File
  ) => void;
  removeItem: (id: string) => void;
  renameItem: (id: string, value: string) => void;
  duplicateItem: (id: string, newId: string) => void;

  getItemById: (id: string) => BuilderItem | undefined;
}
export const useItemStore = create<IBuilderItems>()((set, get) => ({
  items: [],
  getItemById: (id) => get().items.find((item) => item.id === id),
  addItem: (id, type, name, file) =>
    set((state) => ({
      items: [...state.items, { id: id, name: name, type, file: file }],
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
  duplicateItem: (id, newId) =>
    set((state) => {
      const newItem = state.items.find((i) => i.id === id);
      if (!newItem) return {items:state.items};
      const newItem2 = { ...newItem, id: newId};
      return { items: [...state.items, newItem2] };
    }),
}));
