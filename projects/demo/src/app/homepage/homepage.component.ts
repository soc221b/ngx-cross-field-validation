import { Component } from '@angular/core';
import { CodeComponent } from '../code/code.component';

@Component({
  selector: 'app-homepage',
  imports: [CodeComponent],
  templateUrl: './homepage.component.html',
})
export class HomepageComponent {
  demoCode = `
new FormControl(null, {
  validators: [
    createCrossFieldValidator<Form>(
      this.injector, // to automatically invoke updateValueAndValidity when relevant controls change,
                     // and clean up subscriptions when the component is destroyed
      function ({
        control, // the control being validated
        path, // the path to the control being validated
        get, // like abstractControl.get but with type safety
      }) {
        return get('shippingMethod').value === 'delivery'
          ? Validators.required(control)
          : null;
      },
    ),
  ],
}
  `.trim();

  installCode = `
$ npm i ngx-cross-field-validation
  `.trim();

  htmlCode = `
<form>
  <select [formControl]="formGroup.controls.shippingMethod">
    <option value="pickup">Pickup</option>
    <option value="delivery">Delivery</option>
  </select>

  <input [formControl]="formGroup.controls.deliveryAddress" />

  <button>Submit</button>
</form>
  `.trim();

  tsCode = `
type Form = FormGroup<{
  shippingMethod: FormControl<'pickup' | 'delivery'>;
  deliveryAddress: FormControl<null | string>;
}>;

@Component({ ... })
export class MyComponent {
  injector = inject(Injector);

  formGroup = new FormGroup<Form['controls']>({
    shippingMethod: new FormControl('pickup', {
      nonNullable: true,
      validators: [
        Validators.required,
      ],
    }),
    deliveryAddress: new FormControl(null, {
      validators: [
        createCrossFieldValidator<Form>(
          this.injector,
          function ({ control, get }) {
            const targetControl = get('shippingMethod');

            return targetControl.value === 'delivery'
              ? Validators.required(control)
              : null;
          },
        ),
      ],
    }),
  });
}
  `.trim();
}
