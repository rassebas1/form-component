import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import {
  SaleType,
  PYMESale,
  FixedSale,
  MobileSale,
  FormField,
  FormPage
} from '../../models/sale.model';

import { DynamicInputComponent } from '../../components/dynamicInput/dynamic.component';
import { BehaviorSubject, Observable,map } from 'rxjs';


@Component({
  selector: 'app-sale-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DynamicInputComponent],
  templateUrl: './sale-form.component.html',
  styleUrls: ['./sale-form.component.css'],
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  isVisible = true;
  formPages: FormPage[] = [];
  currentPage$ = new BehaviorSubject<number>(0);
  itemsPerPage = 5;
  isSubmitting = false;
  readonly fieldsPerPage = 5;
  @Input() saleType: SaleType = 'PYME';
  @Input() formFields: FormField[] = [];
  @Output() formSubmit = new EventEmitter<PYMESale | FixedSale | MobileSale>();

  paginatedInputConfigs$: Observable<FormField[]>;

  constructor(private fb: FormBuilder) {
    this.paginatedInputConfigs$ = this.currentPage$.pipe(
      map(page => {
        const start = page * this.itemsPerPage;
        return this.formFields.slice(start, start + this.itemsPerPage);
      })
    );
  }
 

  get totalPages(): number {
    return Math.ceil(this.formFields.length / this.itemsPerPage);
  }

  get paginatedInputConfigs(): FormField[] {
    const start = this.currentPage$.value * this.itemsPerPage;
    return this.formFields.slice(start, start + this.itemsPerPage);
  }
  get progressPercentage(): number {
    return ((this.currentPage$.value + 1) / this.totalPages) * 100;
  }
  ngOnInit() {
    this.initializeForm();
    
  }

  private initializeForm() {
    const formGroup: any = {
      id: ['', Validators.required],
      date: [new Date().toISOString().split('T')[0], Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
    };

    this.formFields.forEach((field) => {
      formGroup[field.name] = ['', field.required ? Validators.required : []];
    });

    this.form = this.fb.group(formGroup);
  }
//send data
  onSubmit() {
    if (this.form.valid) {
      const formData = {
        ...this.form.value,
        date: new Date(this.form.value.date),
      };
      this.formSubmit.emit(formData);
      this.form.reset({
        date: new Date().toISOString().split('T')[0],
      });
    } else {
      this.markAllAsTouched();
    }
  }
//Asigna valores del input para el valor
  onValueChange(event: { name: string; value: string | boolean }) {
    this.form.get(event.name)?.setValue(event.value);
  }
//revisa si se interactuó con los elementos
  markAllAsTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  isFormValid(): boolean {
    if (this.form.invalid) {
      const invalidControls = Object.keys(this.form.controls).filter((key) => {
        const control = this.form.get(key);
        const config = this.formFields.find((config) => config.name === key);
        return config?.required && control?.invalid;
      });
      return invalidControls.length === 0;
    }
    return true;
  }

  
  onSaleSubmit(sale: PYMESale | FixedSale | MobileSale) {
    console.log('Sale submitted:', sale);
    // Here you would typically send the sale to a backend service
  }
  

  isCurrentPageValid(): boolean {
    const currentFields = this.paginatedInputConfigs;
    return currentFields.every(field => {
      const control = this.form;

      return control && (!field.required || !control.errors);
    });
  }

  nextPage() {
    this.currentPage$.next(this.currentPage$.value+1) ;
    if (this.currentPage$.value < this.totalPages - 1 && this.isCurrentPageValid()) {
      this.formPages[this.currentPage$.value].isComplete = true;
    }
  }

  previousPage() {
    if (this.currentPage$.value > 0) {
      this.currentPage$.next(this.currentPage$.value -1);
    }
  }

  goToPage(pageIndex: number) {
    if (pageIndex <= this.currentPage$.value || 
        (pageIndex === this.currentPage$.value + 1 && this.isCurrentPageValid())) {
      this.currentPage$.next(pageIndex);
    }
  }

  isLastPage(): boolean {
    return this.currentPage$.value === this.totalPages - 1;
  }
  // isFirstPage():boolean{
  //   return this.currentPage$.value == 0;
  // }
}
