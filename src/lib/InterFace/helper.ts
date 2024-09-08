export const required = (value: unknown) => (value ? undefined : 'required');

export type Expense = {
  [key: string]: string;
};

export type ValuesType = {
  name_boat: string;
  kilo: string;
  price_kilo: string;
  expenses: Expense[];
  owner_shared: string;
  fisher_shared: string;
  other_shared: string;
  RateBoat?: boolean;
  RateBoatPrice?: string;
};

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
