import { TaxesType } from '../Taxes/Taxes';

export const required = (value: unknown) =>
  value ? undefined : 'مطلوب تعبئته';

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

export type StepComponentsT = {
  0: () => JSX.Element;
  1: () => JSX.Element;
  2: () => JSX.Element;
  3: () => JSX.Element;
};

export type ExpensesT = {
  occurrence: number;
  bay: string;
  value: number;
};

export type FishingT = {
  occurrence: 1;
  type: string;
  weight: number;
  price: number;
};

export type CalculatedDataT = {
  step: keyof StepComponentsT;
  number_trip: string;
  is_boat_rate: boolean;
  owner_arrow: number;
  fisher_arrow: number;
  other_arrow: number;
  dateTrip: string;
  expenses: ExpensesT[];
  fishing: FishingT[];
  rate_boat_price?: number;
  check_nakodah: boolean;
  check_captain: boolean;
  nakodah: string;
  captain: string;
  nakodah_arrows: string;
  captain_arrows: string;
};

export type CalculatedT = {
  totalPriceKilo: number;
  associationTaxes: number;
  totalExpenses: number;
  agentTaxes: number;
  allShared: number;
  shared: number;
  fisherArrow: number;
  otherArrow: number;
  boatRateRent: number;
  calculateNakhdah: number;
  boatTaxes: number;
  calculateCaptain: number;
  allOwnerArrow: number;
  numberTrip: string;
  dateTrip: string;
  typeFishing: FishingT[];
  expenses: ExpensesT[];
  rate_boat_price?: number;
  owner_arrow: number;
  fisher_arrow: number;
  other_arrow?: number;
  nakhdah?: string;
  nakodah_arrows?: string;
  captain?: string;
  captain_arrows?: string;
};

export type CompanyDataT = {
  company_name: string;
  company_logo: string;
  company_description: string;
  id: string;
};

export type TabsIdT = 'all' | 'details' | 'expenses' | 'arrows';

export const NumberFormatter = (value: number) => {
  const formattedValue = new Intl.NumberFormat('en-US').format(value);

  return formattedValue;
};

export const calculationResult = (
  values: CalculatedDataT,
  taxes: TaxesType
): CalculatedT => {
  let totalPrice = values.fishing.reduce((sum, item) => {
    return sum + Number(item.weight) * Number(item.price);
  }, 0);

  const totalPriceKilo = totalPrice;

  const associationTaxes = ((taxes?.tax_association ?? 0) / 100) * totalPrice; // ! the association taxes
  totalPrice -= associationTaxes; // ? change the total

  const totalExpenses = values.expenses.reduce((sum, item) => {
    return sum + Number(item.value);
  }, 0); // ! the Expenses taxes

  totalPrice -= totalExpenses; // ? change the total

  let boatTaxes = totalPrice * ((taxes?.tax_boat ?? 0) / 100); // ! boat taxes

  totalPrice -= boatTaxes; // ? change the total

  const agentTaxes = totalPrice * ((taxes?.tax_agent ?? 0) / 100); // ! representative Rate
  totalPrice -= agentTaxes; // ? change the total

  const allShared =
    +values.owner_arrow + +values.fisher_arrow + +(values?.other_arrow ?? 0); // ! all Shared
  const shared = totalPrice / allShared; // ! one Shared

  // ! arrow
  let ownerArrow = +values.owner_arrow * shared; // ! owner Arrows
  const fisherArrow = +values.fisher_arrow * shared; // ! owner Arrows
  const otherArrow = (+values?.other_arrow || 0) * shared; // ! owner Arrows

  // ! calcuate the nakhdah
  const nakhdah = () => {
    return values.check_nakodah
      ? values.nakodah !== 'other'
        ? shared * +values.nakodah
        : shared * +values.nakodah_arrows
      : 0; // Return 0 if check_nakodah is false
  };

  const calculateNakhdah = nakhdah();
  boatTaxes -= calculateNakhdah;

  const boatRateRent = values.is_boat_rate ? values.rate_boat_price ?? 0 : 0;

  boatTaxes -= boatRateRent || 0;

  const captain = () => {
    return values.check_captain
      ? values.captain !== 'other'
        ? shared * +values.captain
        : shared * +values.captain_arrows
      : 0;
  };

  const calculateCaptain = captain();
  ownerArrow -= calculateCaptain;

  const allOwnerArrow = ownerArrow + boatTaxes;
  return {
    totalPriceKilo,
    associationTaxes,
    totalExpenses,
    agentTaxes,
    allShared,
    shared,
    fisherArrow,
    otherArrow,
    boatRateRent,
    calculateNakhdah,
    boatTaxes,
    calculateCaptain,
    allOwnerArrow,
    numberTrip: values.number_trip,
    dateTrip: values.dateTrip,
    typeFishing: values.fishing,
    expenses: values.expenses,
    rate_boat_price: values?.rate_boat_price ?? 0,
    owner_arrow: values.owner_arrow,
    fisher_arrow: values.fisher_arrow,
    other_arrow: values?.other_arrow ?? 0,
    nakhdah: values?.nakodah,
    nakodah_arrows: values?.nakodah_arrows,
    captain: values?.captain,
    captain_arrows: values?.captain_arrows
  };
};
