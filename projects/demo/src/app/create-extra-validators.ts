import { FormArray, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {
  AbstractControlPaths,
  AbstractControlPathValue,
  abstractControlPathValue,
  createCrossFieldValidator,
} from '../../../ngx-cross-field-validation/src/public-api';

export function createExtraValidators<T extends FormGroup>() {
  return {
    differentFrom: function <P extends AbstractControlPaths<T>>(path: P) {
      return createCrossFieldValidator<T>(function ({ root, control }) {
        if (abstractControlPathValue(root, path).value !== control.value) {
          return null;
        }

        return { differentFrom: true };
      });
    },

    requiredIf: function <P extends AbstractControlPaths<T>>(
      path: P,
      predicate: (other: AbstractControlPathValue<T, P>['value']) => boolean,
    ) {
      return createCrossFieldValidator<T>(function ({ root, control }) {
        if (predicate(abstractControlPathValue(root, path).value) === false) {
          return null;
        }

        return Validators.required(control);
      });
    },

    sameAs: function <P extends AbstractControlPaths<T>>(path: P) {
      return createCrossFieldValidator<T>(function ({ root, control }) {
        if (abstractControlPathValue(root, path).value === control.value) {
          return null;
        }

        return { sameAs: true };
      });
    },

    withPrevious: function <P extends AbstractControlPaths<T>>(
      arrayPath: P,
      createValidator: (
        previousControl: (AbstractControlPathValue<T, P> &
          FormArray)['controls'][number],
      ) => ValidatorFn,
    ) {
      return createCrossFieldValidator<T>(function ({ root, path, control }) {
        const formArray = abstractControlPathValue(root, arrayPath);
        if (formArray instanceof FormArray === false) throw TypeError();
        const index = path.slice(1)[0];
        if (typeof index !== 'number') throw TypeError();
        if (index === 0) return null;

        const previousControl = formArray.controls[index - 1];
        const validator = createValidator(previousControl as any);
        return validator(control);
      });
    },
  };
}
