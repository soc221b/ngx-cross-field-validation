import {
  AbstractControl,
  FormArray,
  FormGroup,
  FormRecord,
} from '@angular/forms';

export type AbstractControlPaths<
  T extends AbstractControl,
  R extends boolean = true,
  D extends any[] = [],
> = D['length'] extends 7
  ? never
  :
      | ''
      | (T extends FormGroup<{
          [key: string]: AbstractControl;
        }>
          ? FormRecordPaths<T, [...D, 0]>
          : T extends FormGroup
            ? FormGroupPaths<T, R, [...D, 0]>
            : T extends FormArray
              ? FormArrayPaths<T, [...D, 0]>
              : '');

type FormGroupPaths<
  T extends FormGroup,
  R extends boolean = true,
  D extends any[] = [],
> = {
  [K in keyof T['controls']]: `${R extends true ? '' : '.'}${Exclude<keyof T['controls'], symbol>}${AbstractControlPaths<T['controls'][K], false, D>}`;
}[keyof T['controls']];

type FormArrayPaths<
  T extends FormArray,
  D extends any[] = [],
> = `[number]${AbstractControlPaths<T['controls'][number], false, D>}`;

type FormRecordPaths<
  T extends FormRecord,
  D extends any[] = [],
> = `[string]${AbstractControlPaths<T['controls'][string], false, D>}`;
