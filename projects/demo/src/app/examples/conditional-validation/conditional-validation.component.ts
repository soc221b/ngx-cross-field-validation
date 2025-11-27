import { Component, inject, Injector, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { formatErrors } from '../../format-errors';
import { createExtraValidators } from '../../create-extra-validators';
import { CodeComponent } from '../../code/code.component';

type TFormGroup = FormGroup<{
  shippingMethod: FormControl<'pickup' | 'delivery'>;
  deliveryAddress: FormControl<string | null>;
}>;

@Component({
  selector: 'app-conditional-validation',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    CodeComponent,
  ],
  templateUrl: './conditional-validation.component.html',
})
export class ConditionalValidationComponent implements OnInit {
  injector = inject(Injector);
  ExtraValidators = createExtraValidators<TFormGroup>(this.injector);

  formGroup = new FormGroup<TFormGroup['controls']>({
    shippingMethod: new FormControl('pickup', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    deliveryAddress: new FormControl(null, {
      validators: [
        this.ExtraValidators.requiredIf(
          'shippingMethod',
          (value) => value === 'delivery',
        ),
      ],
    }),
  });

  formatErrors = formatErrors;

  ngOnInit(): void {
    this.onShippingMethodChange();
  }

  onShippingMethodChange() {
    if (this.formGroup.controls.shippingMethod.value === 'delivery') {
      this.formGroup.controls.deliveryAddress.enable();
    } else {
      this.formGroup.controls.deliveryAddress.disable();
    }
  }

  onNgSubmit() {
    if (this.formGroup.invalid) return;

    alert('Submitted');
  }

  code = `
new FormControl(null, {
  validators: [
    ExtraValidators.requiredIf(
      'shippingMethod',
      (value) => value === 'delivery',
    ),
  ],
})
  `.trim();
}
