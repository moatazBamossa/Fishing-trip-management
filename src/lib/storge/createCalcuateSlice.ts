import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CalculatedT } from '../InterFace/helper';

// Define the type for Expense

// Define the type for Calculation Data

type NextDrawerType = 'user' | 'taxes' | null;

// Define the type for the Calculation state
export type CalculationStateT = {
  calculatedData: CalculatedT | null;
  setCalculatedData: (data: CalculatedT) => void;
  openNextDrawer: NextDrawerType;
  setOpenNextDrawer: (data: NextDrawerType) => void;
};

// Create the Zustand store
export const useCalculationStore = create<CalculationStateT>()(
  devtools((set) => ({
    calculatedData: null, // Initial state
    openNextDrawer: null,

    setCalculatedData: (data: CalculatedT) => set({ calculatedData: data }),
    setOpenNextDrawer: (data: NextDrawerType) => set({ openNextDrawer: data })
  }))
);
