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
export interface FormField {
  id:number
  name: string;
  label: string;
  type:
    | 'text'
    | 'number'
    | 'email'
    | 'password'
    | 'checkbox'
    | 'radio'
    | 'select'
    | 'date';
  options?: string[];
  required: boolean;
}

export interface FormPage {
  fields: FormField[];
  pageNumber: number;
  isComplete: boolean;
}