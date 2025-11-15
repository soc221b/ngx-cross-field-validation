import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { formatErrors } from '../../format-errors';
import { MatButtonModule } from '@angular/material/button';
import { differentFrom } from '../../validators/different-fromt';

type TFormGroup = FormGroup<{
  from: FormControl<string>;
  to: FormControl<string>;
}>;

@Component({
  selector: 'app-inequality-validation',
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './inequality-validation.component.html',
})
export class InequalityValidationComponent {
  formGroup = new FormGroup<TFormGroup['controls']>({
    from: new FormControl('Bob', {
      nonNullable: true,
      validators: [Validators.required, differentFrom<TFormGroup>(['to'])],
    }),
    to: new FormControl('Alice', {
      nonNullable: true,
      validators: [Validators.required, differentFrom<TFormGroup>(['from'])],
    }),
  });

  formatErrors = formatErrors;

  onNgSubmit() {
    if (this.formGroup.invalid) return;

    alert('Submitted');
  }
}
