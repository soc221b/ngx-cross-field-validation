import { Component, inject, Injector, OnInit } from '@angular/core';
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
import { MatSelectModule } from '@angular/material/select';
import { createExtraValidators } from '../../create-extra-validators';
import { CodeComponent } from '../../code/code.component';

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
    CodeComponent,
  ],
  templateUrl: './sequence-validation.component.html',
})
export class SequenceValidationComponent implements OnInit {
  injector = inject(Injector);
  ExtraValidators = createExtraValidators<TFormGroup>(this.injector);

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
          ...this.formGroup.getRawValue().tires.map((tire) => tire.id),
        ) + 1,
        { nonNullable: true },
      ),
      price: new FormControl(defaultPrice, {
        nonNullable: true,
        validators: [
          Validators.required,
          this.ExtraValidators.withPrevious('tires', (previousTire) =>
            Validators.min(previousTire.controls.price.value + 1),
          ),
        ],
      }),
    });
    this.formGroup.controls.tires.insert(index, control);
    this.updateValueAndValidity(index);
    this.updateValueAndValidity(index + 1);
  }

  removeTire(index: number) {
    this.formGroup.controls.tires.removeAt(index);
    this.updateValueAndValidity(index);
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

  code = `
new FormControl('', {
  validators: [
    ExtraValidators.withPrevious(
      'tires',
      (previousTire) => Validators.min(previousTire.controls.price.value),
    )
  ],
})
  `.trim();
}
