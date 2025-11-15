import { FormControl, FormGroup, FormArray, FormRecord } from '@angular/forms';
import { expectType, TypeEqual } from 'ts-expect';
import { AbstractControlPaths } from './abstract-control-paths';

describe('AbstractControlPaths', () => {
  it('control', () => {
    type Expected = '';

    type Actual = AbstractControlPaths<FormControl<number>>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('record', () => {
    type Expected = '' | '[string]';

    type Actual = AbstractControlPaths<FormRecord<FormControl<number>>>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('nested record', () => {
    type Expected = '' | '[string]' | '[string][string]';

    type Actual = AbstractControlPaths<
      FormRecord<FormRecord<FormControl<number>>>
    >;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('group', () => {
    type Expected = '' | 'price';

    type Actual = AbstractControlPaths<
      FormGroup<{
        price: FormControl<number>;
      }>
    >;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('nested group', () => {
    type Expected = '' | 'tire' | 'tire.price';

    type Actual = AbstractControlPaths<
      FormGroup<{
        tire: FormGroup<{
          price: FormControl<number>;
        }>;
      }>
    >;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('array', () => {
    type Expected = '' | '[number]';

    type Actual = AbstractControlPaths<FormArray<FormControl<number>>>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('nested array', () => {
    type Expected = '' | '[number]' | '[number][number]';

    type Actual = AbstractControlPaths<
      FormArray<FormArray<FormControl<number>>>
    >;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('mixed', () => {
    type Expected =
      | ''
      | 'tires'
      | 'tires[number]'
      | 'tires[number].prices'
      | 'tires[number].prices[number]';

    type Actual = AbstractControlPaths<
      FormGroup<{
        tires: FormArray<
          FormGroup<{
            prices: FormArray<FormControl<number>>;
          }>
        >;
      }>
    >;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });
});
