import { FormControl, FormGroup, FormArray, FormRecord } from '@angular/forms';
import { expectType, TypeEqual } from 'ts-expect';
import { AbstractControlPathValue } from './abstract-control-path-value';

describe('AbstractControlPathValue', () => {
  it('control', () => {
    type Expected = FormControl<number>;

    type Actual = AbstractControlPathValue<FormControl<number>, ''>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('record 1', () => {
    type Expected = FormRecord<FormControl<number>>;

    type Actual = AbstractControlPathValue<FormRecord<FormControl<number>>, ''>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('record 2', () => {
    type Expected = FormControl<number>;

    type Actual = AbstractControlPathValue<
      FormRecord<FormControl<number>>,
      '[string]'
    >;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('nested record 1', () => {
    type Expected = FormRecord<FormRecord<FormControl<number>>>;

    type Actual = AbstractControlPathValue<
      FormRecord<FormRecord<FormControl<number>>>,
      ''
    >;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('nested record 2', () => {
    type Expected = FormRecord<FormControl<number>>;

    type Actual = AbstractControlPathValue<
      FormRecord<FormRecord<FormControl<number>>>,
      '[string]'
    >;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('nested record 3', () => {
    type Expected = FormControl<number>;

    type Actual = AbstractControlPathValue<
      FormRecord<FormRecord<FormControl<number>>>,
      '[string][string]'
    >;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('group 1', () => {
    type Expected = FormGroup<{
      price: FormControl<number>;
    }>;

    type Actual = AbstractControlPathValue<
      FormGroup<{
        price: FormControl<number>;
      }>,
      ''
    >;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('group 2', () => {
    type Expected = FormControl<number>;

    type Actual = AbstractControlPathValue<
      FormGroup<{
        price: FormControl<number>;
      }>,
      'price'
    >;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('nested group 1', () => {
    type Expected = FormGroup<{
      tire: FormGroup<{
        price: FormControl<number>;
      }>;
    }>;

    type Actual = AbstractControlPathValue<
      FormGroup<{
        tire: FormGroup<{
          price: FormControl<number>;
        }>;
      }>,
      ''
    >;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('nested group 2', () => {
    type Expected = FormGroup<{
      price: FormControl<number>;
    }>;

    type Actual = AbstractControlPathValue<
      FormGroup<{
        tire: FormGroup<{
          price: FormControl<number>;
        }>;
      }>,
      'tire'
    >;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('nested group 3', () => {
    type Expected = FormControl<number>;

    type Actual = AbstractControlPathValue<
      FormGroup<{
        tire: FormGroup<{
          price: FormControl<number>;
        }>;
      }>,
      'tire.price'
    >;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('array 1', () => {
    type Expected = FormArray<FormControl<number>>;

    type Actual = AbstractControlPathValue<FormArray<FormControl<number>>, ''>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('array 2', () => {
    type Expected = FormControl<number>;

    type Actual = AbstractControlPathValue<
      FormArray<FormControl<number>>,
      '[number]'
    >;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('nested array 1', () => {
    type Expected = FormArray<FormArray<FormControl<number>>>;

    type Actual = AbstractControlPathValue<
      FormArray<FormArray<FormControl<number>>>,
      ''
    >;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('nested array 2', () => {
    type Expected = FormArray<FormControl<number>>;

    type Actual = AbstractControlPathValue<
      FormArray<FormArray<FormControl<number>>>,
      '[number]'
    >;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('nested array 3', () => {
    type Expected = FormControl<number>;

    type Actual = AbstractControlPathValue<
      FormArray<FormArray<FormControl<number>>>,
      '[number][number]'
    >;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });
});
