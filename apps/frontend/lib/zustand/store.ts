import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const useAppStore = create<{
  state: {
    money: number;
    country: string;
  };
  setState: (newState: Partial<{ money: number; country: string }>) => void;
}>()(
  devtools(
    immer((set) => ({
      state: {
        money: 0,
        country: "",
      },
      setState: (newState) => {
        set((state) => {
          state.state = { ...state.state, ...newState };
        });
      },
    }))
  )
);

export {
  useAppStore
}