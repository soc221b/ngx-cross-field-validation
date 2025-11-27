import { FormArray, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {
  AbstractControlPaths,
  AbstractControlPathValue,
  abstractControlPathValue,
  createCrossFieldValidator,
} from '../../../ngx-cross-field-validation/src/public-api';
import { DestroyRef, Injector } from '@angular/core';
import { Subscription, tap } from 'rxjs';

export function createExtraValidators<T extends FormGroup>(injector: Injector) {
  return {
    differentFrom: function <P extends AbstractControlPaths<T>>(path: P) {
      injector.get(DestroyRef).onDestroy(() => {
        subscription?.unsubscribe();
        subscription = null;
      });
      let subscription: null | Subscription = null;
      let isSelf = false;

      return createCrossFieldValidator<T>(function ({ root, control }) {
        const targetControl = abstractControlPathValue(root, path);

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

        if (targetControl.value !== control.value) {
          return null;
        }

        return { differentFrom: true };
      });
    },

    requiredIf: function <P extends AbstractControlPaths<T>>(
      path: P,
      predicate: (other: AbstractControlPathValue<T, P>['value']) => boolean,
    ) {
      injector.get(DestroyRef).onDestroy(() => {
        subscription?.unsubscribe();
        subscription = null;
      });
      let subscription: null | Subscription = null;
      let isSelf = false;

      return createCrossFieldValidator<T>(function ({ root, control }) {
        const targetControl = abstractControlPathValue(root, path);

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

    sameAs: function <P extends AbstractControlPaths<T>>(path: P) {
      injector.get(DestroyRef).onDestroy(() => {
        subscription?.unsubscribe();
        subscription = null;
      });
      let subscription: null | Subscription = null;
      let isSelf = false;

      return createCrossFieldValidator<T>(function ({ root, control }) {
        const targetControl = abstractControlPathValue(root, path);

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

        if (targetControl.value === control.value) {
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
      injector.get(DestroyRef).onDestroy(() => {
        subscription?.unsubscribe();
        subscription = null;
      });
      let subscription: null | Subscription = null;
      let isSelf = false;

      return createCrossFieldValidator<T>(function ({ root, path, control }) {
        const formArray = abstractControlPathValue(root, arrayPath);
        if (formArray instanceof FormArray === false) throw TypeError();
        const index = path.slice(1)[0];
        if (typeof index !== 'number') throw TypeError();
        if (index === 0) return null;

        const previousControl = formArray.controls[index - 1];

        subscription?.unsubscribe();
        subscription = previousControl.valueChanges
          .pipe(
            tap(() => {
              if (isSelf) return;
              isSelf = true;
              control.updateValueAndValidity();
              isSelf = false;
            }),
          )
          .subscribe();

        const validator = createValidator(previousControl as any);
        return validator(control);
      });
    },
  };
}
