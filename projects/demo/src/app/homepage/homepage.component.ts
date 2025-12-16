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

  implementationCode = `
import {
  createCrossFieldValidator,
  abstractControlPathValue,
  AbstractControlPathValue,
  AbstractControlPaths,
} from 'ngx-cross-field-validation';

function createExtraValidators<T extends FormGroup>(injector: Injector) {
  return {
    requiredIf: function <P extends AbstractControlPaths<T>>(
      targetPath: P,
      predicate: (targetValue: AbstractControlPathValue<T, P>['value']) => boolean,
    ) {
      injector.get(DestroyRef).onDestroy(() => {
        subscription?.unsubscribe();
        subscription = null;
      });
      let subscription: null | Subscription = null;
      let isSelf = false;

      return createCrossFieldValidator<T>(function ({ root, control }) {
        const targetControl = abstractControlPathValue(root, targetPath);

        subscription?.unsubscribe();
        subscription = targetControl.valueChanges
          .pipe(
            tap(() => {
              if (isSelf) return;
              isSelf = true;
              control.updateValueAndValidity();
              isSelf = false;
            }),
          )
          .subscribe();

        if (predicate(targetControl.value) === false) {
          return null;
        }

        return Validators.required(control);
      });
    },
  };
}
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
type T = FormGroup<{
  shippingMethod: FormControl<'pickup' | 'delivery'>;
  deliveryAddress: FormControl<null | string>;
}>;

@Component({ ... })
export class MyComponent {
  private readonly injector = inject(Injector);
  private readonly ExtraValidators = createExtraValidators<T>(this.injector);

  protected readonly formGroup = new FormGroup<T['controls']>({
    shippingMethod: new FormControl('pickup', {
      nonNullable: true,
      validators: [
        Validators.required,
      ],
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
}
  `.trim();
}
