import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Expense } from '../InterFace/helper';

// Define the type for Expense

// Define the type for Calculation Data
export type CalculationResultType = {
  totalPrice: number;
  totalPriceKilo: number;
  fisherRate: number;
  totalExpenses: number;
  boatRate: number;
  representativeRate: number;
  allShared: number;
  shared: number;
  realBoatRate: number;
  ownerBoatRate: number;
  totalOwnerRate: number;
  allFisherRate: number;
  otherRate: number;
  name: string;
  kilo: number;
  priceKilo: number;
  expenses: Expense[];
};

type NextDrawerType = 'user' | 'taxes' | null;

// Define the type for the Calculation state
export type CalculationStateT = {
  calculatedData: CalculationResultType | null;
  setCalculatedData: (data: CalculationResultType) => void;
  openNextDrawer: NextDrawerType;
  setOpenNextDrawer: (data: NextDrawerType) => void;
};

// Create the Zustand store
export const useCalculationStore = create<CalculationStateT>()(
  devtools((set) => ({
    calculatedData: null, // Initial state
    openNextDrawer: null,

    setCalculatedData: (data: CalculationResultType) =>
      set({ calculatedData: data }),
    setOpenNextDrawer: (data: NextDrawerType) => set({ openNextDrawer: data })
  }))
);
