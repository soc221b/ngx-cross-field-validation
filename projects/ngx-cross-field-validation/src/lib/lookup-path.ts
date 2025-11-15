import { AbstractControl, FormArray } from '@angular/forms';

export function lookupPath(
  control: AbstractControl,
  cache: readonly PropertyKey[],
): readonly PropertyKey[] {
  return hit(control, cache) ?? miss(control);
}

function hit(
  control: AbstractControl,
  cache: readonly PropertyKey[],
): null | readonly PropertyKey[] {
  let c = control.root;
  let i = 0;
  while (c && i < cache.length) {
    c = (c as any).controls[cache[i++]];
  }
  return control === c ? cache : null;
}

function miss(control: AbstractControl): readonly PropertyKey[] {
  let path: PropertyKey[] = [];
  let parent = control.parent;
  while (parent !== null) {
    const controlName =
      parent instanceof FormArray
        ? parent.controls.indexOf(control)
        : Object.entries(parent.controls).find(
            ([, value]) => value === control,
          )?.[0];
    if (controlName === undefined) throw ReferenceError();
    path.push(controlName);
    control = parent;
    parent = parent.parent;
  }
  path.reverse();
  return path;
}
