import { FormArray, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {
  AbstractControlPaths,
  AbstractControlPathValue,
  createCrossFieldValidator,
} from '../../../ngx-cross-field-validation/src/public-api';
import { Injector } from '@angular/core';

export function createExtraValidators<T extends FormGroup>(injector: Injector) {
  return {
    differentFrom: function <P extends AbstractControlPaths<T>>(targetPath: P) {
      return createCrossFieldValidator<T>(
        injector,
        function ({ control, get }) {
          const targetControl = get(targetPath);

          if (targetControl.value !== control.value) {
            return null;
          }

          return { differentFrom: true };
        },
      );
    },

    requiredIf: function <P extends AbstractControlPaths<T>>(
      targetPath: P,
      predicate: (other: AbstractControlPathValue<T, P>['value']) => boolean,
    ) {
      return createCrossFieldValidator<T>(
        injector,
        function ({ control, get }) {
          const targetControl = get(targetPath);

          if (predicate(targetControl.value) === false) {
            return null;
          }

          return Validators.required(control);
        },
      );
    },

    sameAs: function <P extends AbstractControlPaths<T>>(targetPath: P) {
      return createCrossFieldValidator<T>(
        injector,
        function ({ control, get }) {
          const targetControl = get(targetPath);

          if (targetControl.value === control.value) {
            return null;
          }

          return { sameAs: true };
        },
      );
    },

    withPrevious: function <P extends AbstractControlPaths<T>>(
      targetPath: P,
      createValidator: (
        previousControl: (AbstractControlPathValue<T, P> &
          FormArray)['controls'][number],
      ) => ValidatorFn,
    ) {
      return createCrossFieldValidator<T>(
        injector,
        function ({ control, path, get }) {
          const formArray = get(targetPath);
          if (formArray instanceof FormArray === false) throw TypeError();
          const index = path.slice(1)[0];
          if (typeof index !== 'number') throw TypeError();
          if (index === -1) return null;
          if (index === 0) return null;

          const previousControl = formArray.controls[index - 1];

          const validator = createValidator(previousControl as any);
          return validator(control);
        },
      );
    },
  };
}
