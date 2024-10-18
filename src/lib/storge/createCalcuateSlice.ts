import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CalculatedT, CompanyDataT } from '../InterFace/helper';

// Define the type for Expense

// Define the type for Calculation Data

type NextDrawerType = 'user' | 'taxes' | null;

const data = sessionStorage.getItem('responseData');
const isAuth = data && JSON.parse(data);
// Define the type for the Calculation state
export type CalculationStateT = {
  calculatedData: CalculatedT | null;
  setCalculatedData: (data: CalculatedT | null) => void;
  openNextDrawer: NextDrawerType;
  isAuthenticated: boolean;
  companyData: CompanyDataT | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setOpenNextDrawer: (data: NextDrawerType) => void;
  setCompanyData: (data: CompanyDataT) => void;
};

// Create the Zustand store
export const useCalculationStore = create<CalculationStateT>()(
  devtools((set) => ({
    calculatedData: null, // Initial state
    openNextDrawer: null,
    companyData: isAuth || null,
    isAuthenticated: !!isAuth || false,

    setCalculatedData: (data: CalculatedT | null) =>
      set({ calculatedData: data }),
    setIsAuthenticated: (isAuthenticated: boolean) =>
      set({ isAuthenticated: isAuthenticated }),
    setOpenNextDrawer: (data: NextDrawerType) => set({ openNextDrawer: data }),
    setCompanyData: (data: CompanyDataT) => set({ companyData: data })
  }))
);
