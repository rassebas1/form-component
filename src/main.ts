import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormComponent } from './app/components/sale-form/sale-form.component';
import { FormField } from './app/components/sale-form/sale-form.component';
import {
  SaleType,
  PYMESale,
  FixedSale,
  MobileSale,
} from './app/models/sale.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, FormComponent],
  template: `
    <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div class="relative py-3 sm:max-w-xl sm:mx-auto">
        <h1 class="text-2xl font-bold text-center mb-8">{{ currentType }} Sale Form</h1>
        
        <div class="mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div class="grid grid-cols-3 gap-4">
            <div *ngFor="let type of saleTypes" class="flex items-center">
              <input 
                type="radio" 
                [id]="type" 
                [value]="type" 
                [(ngModel)]="currentType"
                name="saleType"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              >
              <label [for]="type" class="ml-3 block text-sm font-medium text-gray-700">
                {{ type }}
              </label>
            </div>
          </div>
        </div>

        <app-sale-form
          [saleType]="currentType"
          [formFields]="getCurrentFields()"
          (formSubmit)="onSaleSubmit($event)">
        </app-sale-form>
      </div>
    </div>
  `,
})
export class App {
  currentType: SaleType = 'PYME';
  saleTypes: SaleType[] = ['PYME', 'FIXED', 'MOBILE'];

  private pymeFields: FormField[] = [
    {
      name: 'companyName',
      label: 'Company Name',
      type: 'text',
      required: false,
    },
    {
      name: 'employeeCount',
      label: 'Number of Employees',
      type: 'number',
      required: true,
    },
    {
      name: 'sector',
      label: 'Business Sector',
      type: 'select',
      options: ['Technology', 'Retail', 'Manufacturing', 'Services', 'hola'],
      required: true,
    },
    {
      name: 'birthDate',
      label: 'Birth Date',
      type: 'date',
      required: true,
    },
    {
      name: 'acceptTerms',
      label: 'Términos y Condiciones',
      type: 'checkbox',
      required: true,
    },
  ];

  private fixedFields: FormField[] = [
    {
      name: 'address',
      label: 'Installation Address',
      type: 'text',
      required: true,
    },
    {
      name: 'planType',
      label: 'Plan Type',
      type: 'select',
      options: ['Basic', 'Premium', 'Enterprise'],
      required: true,
    },
    {
      name: 'depto',
      label: 'Departameto',
      type: 'select',
      options: [],
      required: true,
    },
    {
      name: 'installationDate',
      label: 'Installation Date',
      type: 'date',
      required: true,
    },
  ];

  private mobileFields: FormField[] = [
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'text',
      required: true,
    },
    {
      name: 'plan',
      label: 'Mobile Plan',
      type: 'select',
      options: ['Basic', 'Standard', 'Premium', 'Unlimited'],
      required: true,
    },
    {
      name: 'deviceModel',
      label: 'Device Model',
      type: 'text',
      required: false,
    },
  ];

  getCurrentFields(): FormField[] {
    switch (this.currentType) {
      case 'PYME':
        return this.pymeFields;
      case 'FIXED':
        return this.fixedFields;
      case 'MOBILE':
        return this.mobileFields;
    }
  }

  onSaleSubmit(sale: PYMESale | FixedSale | MobileSale) {
    console.log('Sale submitted:', sale);
    // Here you would typically send the sale to a backend service
  }
}

bootstrapApplication(App);
