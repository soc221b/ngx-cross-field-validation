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
import { createExtraValidators } from '../../create-extra-validators';
import { CodeComponent } from '../../code/code.component';

type TFormGroup = FormGroup<{
  from: FormControl<string>;
  to: FormControl<string>;
}>;

const ExtraValidators = createExtraValidators<TFormGroup>();

@Component({
  selector: 'app-inequality-validation',
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    CodeComponent,
  ],
  templateUrl: './inequality-validation.component.html',
})
export class InequalityValidationComponent {
  formGroup = new FormGroup<TFormGroup['controls']>({
    from: new FormControl('Bob', {
      nonNullable: true,
      validators: [Validators.required, ExtraValidators.differentFrom('to')],
    }),
    to: new FormControl('Alice', {
      nonNullable: true,
      validators: [Validators.required, ExtraValidators.differentFrom('from')],
    }),
  });

  formatErrors = formatErrors;

  onNgSubmit() {
    if (this.formGroup.invalid) return;

    alert('Submitted');
  }

  code = `
new FormControl('', {
  validators: [
    ExtraValidators.differentFrom('to'),
  ],
})
new FormControl('', {
  validators: [
    ExtraValidators.differentFrom('from'),
  ],
})
  `.trim();
}
