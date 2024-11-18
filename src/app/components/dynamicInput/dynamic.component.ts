import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormField } from '../../models/sale.model';

@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class DynamicInputComponent implements OnInit {
  @Input() config!: FormField;
  @Output() valueChange = new EventEmitter<{
    name: string;
    value: string | boolean;
  }>();

  control: FormControl = new FormControl('');

  ngOnInit() {
    const validators = this.config.required ? [Validators.required] : [];
    if (this.config.type === 'email') {
      validators.push(Validators.email);
    }
    this.control = new FormControl('', validators);

    if (this.config.type === 'checkbox') {
      this.control.setValue(false);
    }

    this.control.valueChanges.subscribe((value) => {
      this.valueChange.emit({ name: this.config.name, value });
    });
  }

  get isInvalid(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }
}
