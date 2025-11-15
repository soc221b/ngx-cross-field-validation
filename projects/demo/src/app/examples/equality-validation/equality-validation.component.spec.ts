import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { EqualityValidationComponent } from './equality-validation.component';
import { By } from '@angular/platform-browser';

describe('EqualityValidationComponent', () => {
  let component: EqualityValidationComponent;
  let fixture: ComponentFixture<EqualityValidationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EqualityValidationComponent],
      errorOnUnknownElements: true,
      errorOnUnknownProperties: false,
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqualityValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be invalid if the password and confirm password do not match', fakeAsync(() => {
    const passwordEl = fixture.debugElement.query(
      By.css('input[name="password"]'),
    )!;
    passwordEl.nativeElement.value = 'do not tell anyone';
    passwordEl.triggerEventHandler('input', {
      target: passwordEl.nativeElement,
    });
    fixture.detectChanges();

    const confirmPasswordEl = fixture.debugElement.query(
      By.css('input[name="confirmPassword"]'),
    )!;
    confirmPasswordEl.nativeElement.value = 'something different';
    confirmPasswordEl.triggerEventHandler('input', {
      target: confirmPasswordEl.nativeElement,
    });
    fixture.detectChanges();

    expect(component.formGroup.controls.confirmPassword.invalid).toBeTrue();
  }));

  it('should be valid if the password and confirm password match', fakeAsync(() => {
    const passwordEl = fixture.debugElement.query(
      By.css('input[name="password"]'),
    )!;
    passwordEl.nativeElement.value = 'do not tell anyone';
    passwordEl.triggerEventHandler('input', {
      target: passwordEl.nativeElement,
    });
    fixture.detectChanges();

    const confirmPasswordEl = fixture.debugElement.query(
      By.css('input[name="confirmPassword"]'),
    )!;
    confirmPasswordEl.nativeElement.value = 'do not tell anyone';
    confirmPasswordEl.triggerEventHandler('input', {
      target: confirmPasswordEl.nativeElement,
    });
    fixture.detectChanges();

    expect(component.formGroup.controls.confirmPassword.valid).toBeTrue();
  }));
});
