export type SaleType = 'PYME' | 'FIXED' | 'MOBILE';

export interface BaseSale {
  id: string;
  date: Date;
  amount: number;
}

export interface PYMESale extends BaseSale {
  companyName: string;
  employeeCount: number;
  sector: string;
}

export interface FixedSale extends BaseSale {
  address: string;
  planType: string;
  installationDate: Date;
}

export interface MobileSale extends BaseSale {
  phoneNumber: string;
  plan: string;
  deviceModel?: string;
}