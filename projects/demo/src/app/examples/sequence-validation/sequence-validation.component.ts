import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { formatErrors } from '../../format-errors';
import { MatButtonModule } from '@angular/material/button';
import { createCrossFieldValidator } from '../../../../../ngx-cross-field-validation/src/public-api';
import { MatSelectModule } from '@angular/material/select';

type TFormGroup = FormGroup<{
  tires: FormArray<
    FormGroup<{
      id: FormControl<number>;
      price: FormControl<number>;
    }>
  >;
}>;

@Component({
  selector: 'app-sequence-validation',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sequence-validation.component.html',
})
export class SequenceValidationComponent implements OnInit {
  formGroup = new FormGroup<TFormGroup['controls']>({
    tires: new FormArray<TFormGroup['controls']['tires']['controls'][number]>(
      [],
    ),
  });

  formatErrors = formatErrors;

  ngOnInit() {
    this.addTire(0, 5);
    this.addTire(1, 10);
    this.addTire(2, 15);
  }

  addTire(index: number, defaultPrice: number) {
    const control = new FormGroup<
      TFormGroup['controls']['tires']['controls'][number]['controls']
    >({
      id: new FormControl(
        Math.max(
          -1,
          ...this.formGroup.getRawValue().tires.map((email) => email.id),
        ) + 1,
        { nonNullable: true },
      ),
      price: new FormControl(defaultPrice, {
        nonNullable: true,
        validators: [
          Validators.required,
          createCrossFieldValidator<TFormGroup, 'tires[number].price'>(
            ({ root, path }) => {
              const index = path[1];
              if (index === 0) return null;

              const previousControl = root.controls.tires.controls[index - 1];
              const previousPrice = previousControl.getRawValue().price;

              return Validators.min(previousPrice + 1);
            },
          ),
        ],
      }),
    });
    this.formGroup.controls.tires.insert(index, control);
    control.controls.price.updateValueAndValidity();
    this.updateValueAndValidity(index + 1);
  }

  removeTire(index: number) {
    this.formGroup.controls.tires.removeAt(index);
    this.updateValueAndValidity(index);
  }

  onInput(index: number) {
    this.updateValueAndValidity(index + 1);
  }

  updateValueAndValidity(index: number) {
    if (index < this.formGroup.controls.tires.length) {
      this.formGroup.controls.tires.controls[
        index
      ].controls.price.updateValueAndValidity();
    }
  }

  onNgSubmit() {
    if (this.formGroup.invalid) return;

    alert('Submitted');
  }
}
