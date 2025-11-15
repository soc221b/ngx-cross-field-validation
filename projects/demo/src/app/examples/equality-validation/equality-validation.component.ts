import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { formatErrors } from '../../format-errors';
import { sameAs } from '../../validators/same-as';

type TFormGroup = FormGroup<{
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}>;

@Component({
  selector: 'app-equality-validation',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './equality-validation.component.html',
})
export class EqualityValidationComponent {
  formGroup = new FormGroup<TFormGroup['controls']>({
    password: new FormControl("don'ttellanyone", {
      validators: [Validators.required],
      nonNullable: true,
    }),
    confirmPassword: new FormControl("don'ttellanyone", {
      validators: [Validators.required, sameAs<TFormGroup>(['password'])],
      nonNullable: true,
    }),
  });

  formatErrors = formatErrors;

  onNgSubmit() {
    if (this.formGroup.invalid) return;

    alert('Submitted');
  }
}
