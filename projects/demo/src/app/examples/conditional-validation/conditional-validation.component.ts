import { Component, OnInit } from '@angular/core';
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
import { createCrossFieldValidator } from '../../../../../ngx-cross-field-validation/src/public-api';

type TFormGroup = FormGroup<{
  shippingMethod: FormControl<'Pickup' | 'Delivery'>;
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
  ],
  templateUrl: './conditional-validation.component.html',
})
export class ConditionalValidationComponent implements OnInit {
  formGroup = new FormGroup<TFormGroup['controls']>({
    shippingMethod: new FormControl('Pickup', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    deliveryAddress: new FormControl(null, {
      validators: [
        createCrossFieldValidator<TFormGroup>(({ root, control }) => {
          return root.controls.shippingMethod.value === 'Delivery'
            ? Validators.required
            : null;
        }),
      ],
    }),
  });

  formatErrors = formatErrors;

  ngOnInit(): void {
    this.onShippingMethodChange();
  }

  onShippingMethodChange() {
    if (this.formGroup.controls.shippingMethod.value === 'Delivery') {
      this.formGroup.controls.deliveryAddress.enable();
    } else {
      this.formGroup.controls.deliveryAddress.disable();
    }
    this.formGroup.controls.deliveryAddress.updateValueAndValidity();
  }

  onNgSubmit() {
    if (this.formGroup.invalid) return;

    alert('Submitted');
  }
}
