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
} from '../../models/sale.model';

import { DynamicInputComponent } from '../../components/dynamicInput/dynamic.component';

export interface FormField {
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

@Component({
  selector: 'app-sale-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DynamicInputComponent],
  templateUrl: './sale-form.component.html',
  styleUrls: ['./sale-form.component.css'],
})
export class FormComponent implements OnInit {
  isVisible = true;
  @Input() saleType: SaleType = 'PYME';
  @Input() formFields: FormField[] = [];
  @Output() formSubmit = new EventEmitter<PYMESale | FixedSale | MobileSale>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

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

  onValueChange(event: { name: string; value: string | boolean }) {
    this.form.get(event.name)?.setValue(event.value);
  }

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
  toggleFormVisibility() {
    this.isVisible = !this.isVisible;
  }
}
