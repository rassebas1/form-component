import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormComponent } from './app/components/sale-form/sale-form.component';
import {
  SaleType,
  PYMESale,
  FixedSale,
  MobileSale,
  FormField
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
          >
        </app-sale-form>
      </div>
    </div>
  `,
})
export class App {
  currentType: SaleType = 'PYME';
  saleTypes: SaleType[] = ['PYME', 'FIXED', 'MOBILE'];

  private pymeFields: FormField[] = [
    { id:1, type: 'text', label: 'Name', name: 'name', required: true },
    { id:1, type: 'email', label: 'Email', name: 'email', required: true },
    { id:1, type: 'select', label: 'Country', name: 'country', required: false, options: ['USA', 'Canada', 'UK', 'Australia'] },
    { id:1, type: 'date', label: 'Birth Date', name: 'birthDate', required: true },
    { id:1, type: 'checkbox', label: 'Subscribe to newsletter', name: 'subscribe', required: false },
    { id:1, type: 'text', label: 'Address', name: 'address', required: true },
    { id:1, type: 'text', label: 'City', name: 'city', required: true },
    { id:1, type: 'text', label: 'Postal Code', name: 'postalCode', required: true },
    { id:1, type: 'select', label: 'Favorite Color', name: 'favoriteColor', required: false, options: ['Red', 'Blue', 'Green', 'Yellow'] },
    { id:1, type: 'number', label: 'Age', name: 'age', required: true },
  {
      id:1,
      name: 'birthDate',
      label: 'Birth Date',
      type: 'date',
      required: false,
    },
    {
      id:1,
      name: 'acceptTerms',
      label: 'Términos y Condiciones',
      type: 'checkbox',
      required: false,
    },
  ];

  private fixedFields: FormField[] = [
    {
      id:1,
      name: 'address',
      label: 'Installation Address',
      type: 'text',
      required: true,
    },
    {
      id:1,
      name: 'planType',
      label: 'Plan Type',
      type: 'select',
      options: ['Basic', 'Premium', 'Enterprise'],
      required: true,
    },
    {
      id:1,
      name: 'depto',
      label: 'Departameto',
      type: 'select',
      options: [],
      required: true,
    },
    {
      id:1,
      name: 'installationDate',
      label: 'Installation Date',
      type: 'date',
      required: true,
    },
  ];

  private mobileFields: FormField[] = [
    {
      id:1,
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'text',
      required: true,
    },
    {
      id:1,
      name: 'plan',
      label: 'Mobile Plan',
      type: 'select',
      options: ['Basic', 'Standard', 'Premium', 'Unlimited'],
      required: true,
    },
    {
      id:1,
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

  

}

bootstrapApplication(App);
