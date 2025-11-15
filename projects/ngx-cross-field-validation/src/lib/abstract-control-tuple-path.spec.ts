import { expectType, TypeEqual } from 'ts-expect';
import {
  AbstractControlTuplePath,
  Normalize,
  Tokenize,
} from './abstract-control-tuple-path';

describe('Normalize', () => {
  it('', () => {
    type Expected = '';

    type Actual = Normalize<''>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('key', () => {
    type Expected = 'key';

    type Actual = Normalize<'key'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('nested.key', () => {
    type Expected = 'nested.key';

    type Actual = Normalize<'nested.key'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('[string]', () => {
    type Expected = '${string}';

    type Actual = Normalize<'[string]'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('[string][string]', () => {
    type Expected = '${string}.${string}';

    type Actual = Normalize<'[string][string]'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('[number]', () => {
    type Expected = '${number}';

    type Actual = Normalize<'[number]'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('[number][number]', () => {
    type Expected = '${number}.${number}';

    type Actual = Normalize<'[number][number]'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('[number].key', () => {
    type Expected = '${number}.key';

    type Actual = Normalize<'[number].key'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('nested[number]', () => {
    type Expected = 'nested.${number}';

    type Actual = Normalize<'nested[number]'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('[string].key', () => {
    type Expected = '${string}.key';

    type Actual = Normalize<'[string].key'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('nested[string]', () => {
    type Expected = 'nested.${string}';

    type Actual = Normalize<'nested[string]'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('[string][number]', () => {
    type Expected = '${string}.${number}';

    type Actual = Normalize<'[string][number]'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('[number][string]', () => {
    type Expected = '${number}.${string}';

    type Actual = Normalize<'[number][string]'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });
});

describe('Tokenize', () => {
  it('', () => {
    type Expected = [];

    type Actual = Tokenize<''>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('key', () => {
    type Expected = ['key'];

    type Actual = Tokenize<'key'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('nested.key', () => {
    type Expected = ['nested', 'key'];

    type Actual = Tokenize<'nested.key'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('${string}', () => {
    type Expected = [string];

    type Actual = Tokenize<'${string}'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('${string}.${string}', () => {
    type Expected = [string, string];

    type Actual = Tokenize<'${string}.${string}'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('${number}', () => {
    type Expected = [number];

    type Actual = Tokenize<'${number}'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('${number}.${number}', () => {
    type Expected = [number, number];

    type Actual = Tokenize<'${number}.${number}'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('${number}.key', () => {
    type Expected = [number, 'key'];

    type Actual = Tokenize<'${number}.key'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('nested.${number}', () => {
    type Expected = ['nested', number];

    type Actual = Tokenize<'nested.${number}'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('${string}.key', () => {
    type Expected = [string, 'key'];

    type Actual = Tokenize<'${string}.key'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('nested.${string}', () => {
    type Expected = ['nested', string];

    type Actual = Tokenize<'nested.${string}'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('${string}.${number}', () => {
    type Expected = [string, number];

    type Actual = Tokenize<'${string}.${number}'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('${number}.${string}', () => {
    type Expected = [number, string];

    type Actual = Tokenize<'${number}.${string}'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });
});

describe('AbstractControlTuplePath', () => {
  it('', () => {
    type Expected = [];

    type Actual = AbstractControlTuplePath<''>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('tire', () => {
    type Expected = ['tire'];

    type Actual = AbstractControlTuplePath<'tire'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('tire.price', () => {
    type Expected = ['tire', 'price'];

    type Actual = AbstractControlTuplePath<'tire.price'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('[number]', () => {
    type Expected = [number];

    type Actual = AbstractControlTuplePath<'[number]'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('[number][number]', () => {
    type Expected = [number, number];

    type Actual = AbstractControlTuplePath<'[number][number]'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('tires[number]', () => {
    type Expected = ['tires', number];

    type Actual = AbstractControlTuplePath<'tires[number]'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('tires[number].prices', () => {
    type Expected = ['tires', number, 'prices'];

    type Actual = AbstractControlTuplePath<'tires[number].prices'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });

  it('tires[number].prices[number]', () => {
    type Expected = ['tires', number, 'prices', number];

    type Actual = AbstractControlTuplePath<'tires[number].prices[number]'>;

    expectType<TypeEqual<Expected, Actual>>(true);
    expect(true).toBeTrue();
  });
});
