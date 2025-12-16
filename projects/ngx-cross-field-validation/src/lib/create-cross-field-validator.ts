import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AbstractControlPaths } from './abstract-control-paths';
import { lookupPath } from './lookup-path';
import {
  abstractControlPathValue,
  AbstractControlPathValue,
} from './abstract-control-path-value';
import { AbstractControlTuplePath } from './abstract-control-tuple-path';
import { DestroyRef, Injector } from '@angular/core';
import { Subscription, tap } from 'rxjs';

export function createCrossFieldValidator<
  T extends FormGroup,
  P extends AbstractControlPaths<T> = AbstractControlPaths<T>,
>(
  crossFieldValidatorFn: (_: {
    control: AbstractControlPathValue<T, P>;
    path: AbstractControlTuplePath<P>;
    root: T;
  }) => ValidationErrors | null,
): ValidatorFn;
export function createCrossFieldValidator<
  T extends FormGroup,
  P extends AbstractControlPaths<T> = AbstractControlPaths<T>,
>(
  injector: Injector,
  crossFieldValidatorFn: (_: {
    control: AbstractControlPathValue<T, P>;
    path: AbstractControlTuplePath<P>;
    get(path: P): AbstractControlPathValue<T, P>;
  }) => ValidationErrors | null,
): ValidatorFn;
export function createCrossFieldValidator() {
  return arguments.length === 1
    ? createCrossFieldValidator1.apply(null, arguments as any)
    : createCrossFieldValidator2.apply(null, arguments as any);
}

export function createCrossFieldValidator1<
  T extends FormGroup,
  P extends AbstractControlPaths<T> = AbstractControlPaths<T>,
>(
  crossFieldValidatorFn: (_: {
    control: AbstractControlPathValue<T, P>;
    path: AbstractControlTuplePath<P>;
    root: T;
  }) => ValidationErrors | null,
): ValidatorFn {
  let cache: readonly PropertyKey[] = [];

  return (control: any) => {
    const root = control.root;
    if (root.controls === undefined) return null;

    return crossFieldValidatorFn({
      control,
      get path() {
        return (cache = lookupPath(
          control,
          cache,
        ) as AbstractControlTuplePath<P>);
      },
      root,
    });
  };
}

export function createCrossFieldValidator2<
  T extends FormGroup,
  P extends AbstractControlPaths<T> = AbstractControlPaths<T>,
>(
  injector: Injector,
  crossFieldValidatorFn: (_: {
    control: AbstractControlPathValue<T, P>;
    path: AbstractControlTuplePath<P>;
    get(path: P): AbstractControlPathValue<T, P>;
  }) => ValidationErrors | null,
): ValidatorFn {
  let cache: readonly PropertyKey[] = [];

  injector.get(DestroyRef).onDestroy(destroy);
  let subscriptions: Subscription[] = [];
  let isSelf = false;
  function destroy() {
    subscriptions.forEach((subscription) => subscription.unsubscribe());
    subscriptions = [];
  }

  return (control: any) => {
    destroy();

    const root = control.root;
    if (root.controls === undefined) return null;

    return crossFieldValidatorFn({
      control,
      get path() {
        return (cache = lookupPath(
          control,
          cache,
        ) as AbstractControlTuplePath<P>);
      },
      get(targetPath) {
        const targetControl = abstractControlPathValue<T, P>(root, targetPath);
        subscriptions.push(
          targetControl.valueChanges
            .pipe(
              tap(() => {
                if (isSelf) return;
                isSelf = true;
                control.updateValueAndValidity();
                isSelf = false;
              }),
            )
            .subscribe(),
        );
        return targetControl;
      },
    });
  };
}
