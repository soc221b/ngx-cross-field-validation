import { FormGroup, ValidatorFn } from '@angular/forms';
import { AbstractControlPaths } from './abstract-control-paths';
import { lookupPath } from './lookup-path';
import { AbstractControlPathValue } from './abstract-control-path-value';
import { AbstractControlTuplePath } from './abstract-control-tuple-path';

export function createCrossFieldValidator<
  T extends FormGroup,
  P extends AbstractControlPaths<T> = AbstractControlPaths<T>,
>(
  createValidator: (_: {
    control: AbstractControlPathValue<T, P>;
    path: AbstractControlTuplePath<P>;
    root: T;
  }) => null | ValidatorFn,
): ValidatorFn {
  let cache: readonly PropertyKey[] = [];

  return (control: any) => {
    const root = control.root;
    if (root.controls === undefined) return null;

    const validator = createValidator({
      control,
      get path() {
        return (cache = lookupPath(
          control,
          cache,
        ) as AbstractControlTuplePath<P>);
      },
      root,
    });

    return validator ? validator(control) : null;
  };
}
