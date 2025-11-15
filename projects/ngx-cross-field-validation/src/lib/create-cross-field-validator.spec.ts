import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { expectType, type TypeEqual } from 'ts-expect';
import { createCrossFieldValidator } from './create-cross-field-validator';

describe('createCrossFieldValidator', () => {
  it('type safety', () => {
    type T = FormGroup<{
      tires: FormArray<
        FormGroup<{
          price: FormControl<number>;
        }>
      >;
    }>;

    createCrossFieldValidator<T>(({ root, control, path }) => {
      expectType<TypeEqual<T, typeof root>>(true);
      expectType<
        TypeEqual<
          | FormGroup<{
              price: FormControl<number>;
            }>
          | FormArray<
              FormGroup<{
                price: FormControl<number>;
              }>
            >
          | FormControl<number>
          | T,
          typeof control
        >
      >(true);
      expectType<
        TypeEqual<
          [] | ['tires'] | ['tires', number] | ['tires', number, 'price'],
          typeof path
        >
      >(true);

      return null;
    });
    createCrossFieldValidator<T, ''>(({ root, control, path }) => {
      expectType<TypeEqual<T, typeof root>>(true);
      expectType<TypeEqual<T, typeof control>>(true);
      expectType<TypeEqual<[], typeof path>>(true);

      return null;
    });
    createCrossFieldValidator<T, 'tires'>(({ root, control, path }) => {
      expectType<TypeEqual<T, typeof root>>(true);
      expectType<TypeEqual<T['controls']['tires'], typeof control>>(true);
      expectType<TypeEqual<['tires'], typeof path>>(true);

      return null;
    });
    createCrossFieldValidator<T, 'tires[number]'>(({ root, control, path }) => {
      expectType<TypeEqual<T, typeof root>>(true);
      expectType<
        TypeEqual<T['controls']['tires']['controls'][number], typeof control>
      >(true);
      expectType<TypeEqual<['tires', number], typeof path>>(true);

      return null;
    });
    createCrossFieldValidator<T, 'tires[number].price'>(
      ({ root, control, path }) => {
        expectType<TypeEqual<T, typeof root>>(true);
        expectType<
          TypeEqual<
            T['controls']['tires']['controls'][number]['controls']['price'],
            typeof control
          >
        >(true);
        expectType<TypeEqual<['tires', number, 'price'], typeof path>>(true);

        return null;
      },
    );

    // @ts-expect-error
    createCrossFieldValidator<T, 'invalid.path'>(() => null);

    expect(true).toBeTrue();
  });

  it('implements equality example: confirmPassword validator', () => {
    type T = FormGroup<{
      password: FormControl<string>;
      confirmPassword: FormControl<string>;
    }>;

    const form = new FormGroup<T['controls']>({
      password: new FormControl('secret-pass', { nonNullable: true }),
      confirmPassword: new FormControl('secret-pass', {
        nonNullable: true,
        validators: [
          createCrossFieldValidator<T, 'confirmPassword'>(
            ({ root, control }) =>
              () =>
                root.controls.password.value === control.value
                  ? null
                  : { custom: 'Passwords do not match' },
          ),
        ],
      }),
    });

    // initially equal -> no error
    form.controls.confirmPassword.updateValueAndValidity();
    expect(form.controls.confirmPassword.errors).toBeNull();

    // make them differ -> error appears
    form.controls.confirmPassword.setValue('different');
    form.controls.confirmPassword.updateValueAndValidity();
    expect(form.controls.confirmPassword.errors).toEqual({
      custom: 'Passwords do not match',
    });
  });

  it('implements conditional example: dynamic required addition/removal', () => {
    type T = FormGroup<{
      shippingMethod: FormControl<'Pickup' | 'Delivery'>;
      deliveryAddress: FormControl<string | null>;
    }>;

    const form = new FormGroup<T['controls']>({
      shippingMethod: new FormControl('Pickup', { nonNullable: true }),
      deliveryAddress: new FormControl(null, {
        validators: [
          createCrossFieldValidator<T, 'deliveryAddress'>(({ root }) => {
            return root.controls.shippingMethod.value === 'Delivery'
              ? Validators.required
              : null;
          }),
        ],
      }),
    });

    const delivery = form.controls.deliveryAddress;

    // Pickup -> required should not be present (null value allowed)
    delivery.setValue(null);
    delivery.updateValueAndValidity();
    expect(delivery.hasError('required')).toBeFalse();

    // Switch to Delivery -> validator should add required
    form.controls.shippingMethod.setValue('Delivery');
    // run cross-field validator
    delivery.updateValueAndValidity();
    expect(delivery.hasError('required')).toBeTrue();
  });

  it('implements sequence example: FormArray indexed path and min validator', () => {
    type T = FormGroup<{
      tires: FormArray<
        FormGroup<{
          id: FormControl<number>;
          price: FormControl<number>;
        }>
      >;
    }>;

    const form = new FormGroup<T['controls']>({
      tires: new FormArray<T['controls']['tires']['controls'][number]>([]),
    });

    const add = (index: number, defaultPrice: number) => {
      const control = new FormGroup({
        id: new FormControl(
          Math.max(-1, ...form.getRawValue().tires.map((t: any) => t.id)) + 1,
          { nonNullable: true },
        ),
        price: new FormControl(defaultPrice, {
          nonNullable: true,
          validators: [
            Validators.required,
            createCrossFieldValidator<T, 'tires[number].price'>(
              ({ root, path, control }) => {
                if (control.value === null) return null;
                const idx = path[1];
                if (idx === 0) return null;
                const prev = root.controls.tires.controls[idx - 1];
                const prevPrice = prev.getRawValue().price;
                if (prevPrice === null) return null;
                return Validators.min(prevPrice + 1);
              },
            ),
          ],
        }),
      });
      form.controls.tires.insert(index, control as any);
    };

    add(0, 5);
    add(1, 10);
    add(2, 15);

    const secondPrice = (form.controls.tires.at(1) as any).controls
      .price as FormControl;

    // set second price to a value less than previous + 1 -> should have min error
    secondPrice.setValue(5);
    secondPrice.updateValueAndValidity();
    expect(secondPrice.hasError('min')).toBeTrue();

    // set to acceptable price -> no min error
    secondPrice.setValue(6);
    secondPrice.updateValueAndValidity();
    expect(secondPrice.hasError('min')).toBeFalse();
  });

  it('implements inequality example: from/to different-account validator', () => {
    type T = FormGroup<{
      from: FormControl<string>;
      to: FormControl<string>;
    }>;

    const form = new FormGroup<T['controls']>({
      from: new FormControl('Bob', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      to: new FormControl('Alice', {
        nonNullable: true,
        validators: [
          Validators.required,
          createCrossFieldValidator<T, 'to'>(
            ({ root, control }) =>
              () =>
                root.controls.from.value === null ||
                root.controls.to.value === null ||
                root.controls.from.value !== control.value
                  ? null
                  : { custom: 'The to and from accounts cannot be the same' },
          ),
        ],
      }),
    });

    // different -> no error
    form.controls.to.updateValueAndValidity();
    expect(form.controls.to.errors).toBeNull();

    // make same -> error
    form.controls.to.setValue('Bob');
    form.controls.to.updateValueAndValidity();
    expect(form.controls.to.errors).toEqual({
      custom: 'The to and from accounts cannot be the same',
    });
  });
});
