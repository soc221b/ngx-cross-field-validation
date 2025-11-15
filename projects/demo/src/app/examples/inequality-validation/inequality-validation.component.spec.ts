import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { InequalityValidationComponent } from './inequality-validation.component';
import { By } from '@angular/platform-browser';

describe('InequalityValidationComponent', () => {
  let component: InequalityValidationComponent;
  let fixture: ComponentFixture<InequalityValidationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [InequalityValidationComponent],
      errorOnUnknownElements: true,
      errorOnUnknownProperties: false,
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InequalityValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be invalid if the “from” and “to” accounts are the same', fakeAsync(() => {
    const fromEl = fixture.debugElement.query(By.css('input[name="from"]'))!;
    fromEl.nativeElement.value = 'Bob';
    fromEl.triggerEventHandler('input', {
      target: fromEl.nativeElement,
    });
    fixture.detectChanges();

    const toEl = fixture.debugElement.query(By.css('input[name="to"]'))!;
    toEl.nativeElement.value = 'Bob';
    toEl.triggerEventHandler('input', {
      target: toEl.nativeElement,
    });
    fixture.detectChanges();

    expect(component.formGroup.controls.to.invalid).toBeTrue();
  }));

  it('should be valid if the “from” and “to” accounts are different', fakeAsync(() => {
    const fromEl = fixture.debugElement.query(By.css('input[name="from"]'))!;
    fromEl.nativeElement.value = 'Bob';
    fromEl.triggerEventHandler('input', {
      target: fromEl.nativeElement,
    });
    fixture.detectChanges();

    const toEl = fixture.debugElement.query(By.css('input[name="to"]'))!;
    toEl.nativeElement.value = 'Alice';
    toEl.triggerEventHandler('input', {
      target: toEl.nativeElement,
    });
    fixture.detectChanges();

    expect(component.formGroup.controls.to.valid).toBeTrue();
  }));
});
