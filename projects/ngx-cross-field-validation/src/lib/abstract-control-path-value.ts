import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { AbstractControlPaths } from './abstract-control-paths';
import { AbstractControlTuplePath } from './abstract-control-tuple-path';

export type AbstractControlPathValue<
  T extends AbstractControl,
  P extends AbstractControlPaths<T>,
> = Recursive<T, AbstractControlTuplePath<P>>;

type Recursive<
  T extends AbstractControl,
  TT = AbstractControlTuplePath<AbstractControlPaths<T>>,
> = T extends FormGroup
  ? TT extends [infer K extends keyof T['controls'], ...infer R]
    ? Recursive<T['controls'][K], R>
    : T
  : T extends FormArray
    ? TT extends [number, ...infer R]
      ? Recursive<T['controls'][number], R>
      : T
    : T;

export function abstractControlPathValue<
  T extends AbstractControl,
  P extends AbstractControlPaths<T>,
>(
  control: T,
  path: AbstractControlTuplePath<P>,
): AbstractControlPathValue<T, P> {
  for (const p of path) {
    control = (control as any)['controls'][p];
  }

  return control as AbstractControlPathValue<T, P>;
}
