import { storage } from "three/tsl";
import { create } from "zustand";
import { BuilderItemType } from "./BuilderItemType";
export interface BasicProps {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}
export interface ImageProps {}
export interface TextProps {
  value: string;
  size: number;
  color: string;
  style: string;
  italic: boolean;
  bold: boolean;
}
interface IBuilderItemProps {
  id: string;
  type: BuilderItemType;
  basicProps: BasicProps;
  props: ImageProps | TextProps;
}
interface ItemsProps {
  itemsProps: Record<string, IBuilderItemProps>;
  addItemProps: (
    id: string,
    type: BuilderItemType,
    specificProps: TextProps | ImageProps
  ) => void;
  setTextValue: (id: string, value: string) => void;
  setTextColor: (id: string, color: string) => void;
  setTextSize: (id: string, size: number) => void;
  //   setTextStyle: (id: string, style: string) => void;
  setBasicProps: (id: string, value: BasicProps) => void;
  setItalic: (id: string, value: boolean) => void;
  setBold: (id: string, value: boolean) => void;
  getItemById: (id: string) => IBuilderItemProps | undefined;
  duplicateItemProps: (id: string, newId: string) => void;
}
export const useItemPropsStorage = create<ItemsProps>()((set, get) => ({
  itemsProps: {},

  addItemProps: (id, type, specificProps) => {
    set((state) => ({
      itemsProps: {
        ...state.itemsProps,
        [id]: {
          id,
          type,
          basicProps: { x: 0, y: 0, width: 100, height: 100, rotation: 0 },
          props: specificProps,
        },
      },
    }));
  },
  //   setPos: (id: string, x: number, y: number) =>
  //     set((state) => ({
  //       itemsProps: state.itemsProps.map((item) =>
  //         item.id === id ? {
  //             ...item,
  //             basicProps: {
  //               ...item.basicProps,
  //               x: x,
  //               y: y,
  //             },
  //           } : item
  //       ),
  //     })),
  setBasicProps: (id, value) =>
    set((state) => {
      const item = state.itemsProps[id];
      if (!item) return state;
      return {
        itemsProps: {
          ...state.itemsProps,
          [id]: {
            ...item,
            basicProps: value,
          },
        },
      };
    }),
  getItemById: (id) => get().itemsProps[id],

  setTextValue: (id, value) =>
    set((state) => {
      const item = state.itemsProps[id];
      if (!item) return state;
      return {
        itemsProps: {
          ...state.itemsProps,
          [id]: {
            ...item,
            props: { ...item.props, value: value },
          },
        },
      };
    }),
  setTextColor: (id, value) =>
    set((state) => {
      const item = state.itemsProps[id];
      if (!item) return state;
      // console.log(value);
      return {
        itemsProps: {
          ...state.itemsProps,
          [id]: {
            ...item,
            props: { ...item.props, color: value },
          },
        },
      };
    }),
  setTextSize: (id, value) =>
    set((state) => {
      const item = state.itemsProps[id];
      if (!item) return state;
      // console.log(value);
      return {
        itemsProps: {
          ...state.itemsProps,
          [id]: {
            ...item,
            props: { ...item.props, size: value },
          },
        },
      };
    }),

  setItalic: (id, value) =>
    set((state) => {
      const item = state.itemsProps[id];
      if (!item) return state;
      return {
        itemsProps: {
          ...state.itemsProps,
          [id]: {
            ...item,
            props: { ...item.props, italic: value },
          },
        },
      };
    }),
  setBold: (id, value) =>
    set((state) => {
      const item = state.itemsProps[id];
      if (!item) return state;
      // console.log(value);
      return {
        itemsProps: {
          ...state.itemsProps,
          [id]: {
            ...item,
            props: { ...item.props, bold: value },
          },
        },
      };
    }),
  duplicateItemProps: (id, newId) =>
    set((state) => {
      const newItem = state.itemsProps[id];
      if (!newItem) return state;
      const newItem2 = { ...newItem, id: newId ? newId : newId };
      return {
        itemsProps: {
          ...state.itemsProps,
          [newId]: newItem2,
        },
      };
    }),
}));
