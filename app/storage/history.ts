import { create } from "zustand";

interface IHistoryAction {
  elementId: string;
  actionType: string;
  prevValue: string;
  newValue: string;
}
interface HistoryActions {
  actions: IHistoryAction[];
  getLastAction: () => IHistoryAction;
  addAction: (
    elementId: string,
    actionType: string,
    prevValue: string,
    newValue: string
  ) => void;
}
export const useHistory = create<HistoryActions>()((set, get) => ({
  actions: [],
  getLastAction: () => {
    const actions = get().actions;
    return actions[actions.length - 1];
  },
  addAction: (elementId, actionType, prevValue, newValue) =>
    set((state) => ({
      actions: [
        ...state.actions,
        {
          elementId: elementId,
          actionType: actionType,
          prevValue: prevValue,
          newValue: newValue,
        },
      ],
    })),
}));


