import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CodeComponent } from '../code/code.component';

@Component({
  selector: 'app-homepage',
  imports: [MatTabsModule, CodeComponent],
  templateUrl: './homepage.component.html',
})
export class HomepageComponent {
  demoCode = `
new FormControl(null, {
  validators: [
    ExtraValidators.sameAs('password'),

    ExtraValidators.differentFrom('sender'),

    ExtraValidators.requiredIf(
      'shippingMethod',
      (control) => control.value === 'delivery',
    ),

    ExtraValidators.withPrevious(
      // Fully type-safe
      // The path syntax is exactly the same as TypeScript
      'group[number].tires',

      // The \`withPrevious\` is a higher-order function,
      // you can combine it with any existing validator functions
      (previousTire) => Validators.min(previousTire.controls.price.value),
    ),
  ],
});
  `.trim();

  installCode = `
$ npm i ngx-cross-field-validation
  `.trim();

  importCode = `
import {
  createCrossFieldValidator,
  abstractControlPathValue,
  AbstractControlPathValue,
  AbstractControlPaths,
} from 'ngx-cross-field-validation';

function createExtraValidators<T extends FormGroup>() {
  return {
    requiredIf: function <P extends AbstractControlPaths<T>>(
      otherPath: P,
      predicate: (otherValue: AbstractControlPathValue<T, P>['value']) => boolean,
    ) {
      return createCrossFieldValidator<T>(function ({ root, control }) {
        if (predicate(abstractControlPathValue(root, path).value) === false) {
          return null;
        }

        return Validators.required(control);
      });
    },
  };
}
  `.trim();

  htmlCode = `
<select
  [formControl]="formGroup.controls.shippingMethod"
  (change)="formGroup.controls.deliveryAddress.updateValueAndValidity()"
>
  <option value="pickup">Pickup</option>
  <option value="delivery">Delivery</option>
</select>

<input
  type="text"
  [formControl]="formGroup.controls.deliveryAddress"
/>
  `.trim();

  tsCode = `
type T = FormGroup<{
  shippingMethod: FormControl<'pickup' | 'delivery'>;
  deliveryAddress: FormControl<null | string>;
}>;

const ExtraValidators = createExtraValidators<T>();

new FormGroup<T>({
  shippingMethod: new FormControl('pickup', {
    nonNullable: true,
    validators: [Validators.required],
  }),
  deliveryAddress: new FormControl(null, {
    validators: [
      ExtraValidators.requiredIf(
        'shippingMethod',
        (value) => value === 'delivery',
      ),
    ],
  }),
});
  `.trim();
}
