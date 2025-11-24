import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AbstractControlPaths } from './abstract-control-paths';
import { lookupPath } from './lookup-path';
import { AbstractControlPathValue } from './abstract-control-path-value';
import { AbstractControlTuplePath } from './abstract-control-tuple-path';

export function createCrossFieldValidator<
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
