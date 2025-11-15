import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { SequenceValidationComponent } from './sequence-validation.component';
import { By } from '@angular/platform-browser';

describe('SequenceValidationComponent', () => {
  let component: SequenceValidationComponent;
  let fixture: ComponentFixture<SequenceValidationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SequenceValidationComponent],
      errorOnUnknownElements: true,
      errorOnUnknownProperties: false,
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function onlyLeaveOneInput() {
    let remove1;
    while (
      (remove1 = fixture.debugElement.query(By.css('[data-testid="remove1"]')))
    ) {
      remove1.nativeElement.click();
      fixture.detectChanges();
      flush();
    }
  }

  function addOneInputAfter(index: number) {
    const add = fixture.debugElement.query(
      By.css(`[data-testid="add${index}"]`),
    );
    add.nativeElement.click();
    fixture.detectChanges();
    flush();
  }

  function type(index: number, value: string) {
    const input = fixture.debugElement.query(
      By.css(`[data-testid="input${index}"]`),
    )!;
    input.nativeElement.value = value;
    input.triggerEventHandler('input', {
      target: input.nativeElement,
    });
  }

  it('should be invalid if the current price is not higher than the previous price', fakeAsync(() => {
    onlyLeaveOneInput();
    type(0, '0');
    addOneInputAfter(0);

    type(1, '0');

    expect(
      component.formGroup.controls.tires.controls[1].controls.price.invalid,
    ).toBeTrue();
  }));

  it('should be valid if the current price is higher than the previous price', fakeAsync(() => {
    onlyLeaveOneInput();
    type(0, '0');
    addOneInputAfter(0);

    type(1, '1');

    expect(
      component.formGroup.controls.tires.controls[1].controls.price.valid,
    ).toBeTrue();
  }));
});
