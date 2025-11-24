import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { AbstractControlPaths } from './abstract-control-paths';
import { AbstractControlTuplePath } from './abstract-control-tuple-path';

export type AbstractControlPathValue<
  T extends AbstractControl,
  P extends AbstractControlPaths<T>,
> = Recursive<T, AbstractControlTuplePath<P>>;

export type Recursive<
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
>(control: T, path: P): AbstractControlPathValue<T, P> {
  const ps = [];
  const re = /\[number\]|[^\.\[]+/g;
  let next;
  while ((next = re.exec(path)) !== null) {
    ps.push(next[0]);
  }

  for (const p of ps) {
    control = (control as any)['controls'][p];
  }

  return control as AbstractControlPathValue<T, P>;
}
