import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { lookupPath } from './lookup-path';

describe('lookupPath', () => {
  it('returns empty array for control without parent', () => {
    const root = new FormControl();

    const control = root;

    expect(lookupPath(control, [])).toEqual([]);
  });

  it('resolves path for nested FormGroup controls', () => {
    const root = new FormGroup({
      nested: new FormGroup({
        tire: new FormGroup({
          one: new FormControl(),
        }),
      }),
    });

    const control = root.controls.nested.controls.tire.controls.one;

    expect(lookupPath(control, [])).toEqual(['nested', 'tire', 'one']);
  });

  it('includes numeric indices for FormArray elements', () => {
    const root = new FormGroup({
      tires: new FormArray([
        new FormControl('one'),
        new FormControl('two'),
        new FormControl('three'),
      ]),
    });

    const control = root.controls.tires.at(2);

    expect(lookupPath(control, [])).toEqual(['tires', 2]);
  });

  it('handles mixed FormGroup/FormArray nesting', () => {
    const root = new FormGroup({
      nested: new FormGroup({
        tires: new FormArray([
          new FormGroup({ price: new FormControl() }),
          new FormGroup({ price: new FormControl() }),
        ]),
      }),
    });

    const control = root.controls.nested.controls.tires.at(1).controls.price;

    expect(lookupPath(control, [])).toEqual(['nested', 'tires', 1, 'price']);
  });

  it('cache hit', () => {
    const root = new FormGroup({
      nested: new FormGroup({
        tires: new FormArray([
          new FormGroup({ price: new FormControl() }),
          new FormGroup({ price: new FormControl() }),
        ]),
      }),
    });
    const control = root.controls.nested.controls.tires.at(0).controls.price;
    const cache = ['nested', 'tires', 0, 'price'];

    root.controls.nested.controls.tires.removeAt(1);

    expect(lookupPath(control, cache)).toBe(cache);
    expect(cache).toEqual(['nested', 'tires', 0, 'price']);
  });
});
