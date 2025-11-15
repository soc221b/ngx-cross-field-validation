import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { ConditionalValidationComponent } from './conditional-validation.component';
import { By } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';

describe('ConditionalValidationComponent', () => {
  let component: ConditionalValidationComponent;
  let fixture: ComponentFixture<ConditionalValidationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ConditionalValidationComponent],
      errorOnUnknownElements: true,
      errorOnUnknownProperties: false,
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionalValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be invalid if the delivery address has not been entered yet', fakeAsync(() => {
    const trigger = fixture.debugElement.query(
      By.css('.mat-mdc-select-trigger'),
    )!.nativeElement;
    const overlayContainerElement =
      TestBed.inject(OverlayContainer).getContainerElement();
    trigger.click();
    fixture.detectChanges();
    flush();

    const options = [
      ...overlayContainerElement.querySelectorAll('mat-option'),
    ] as HTMLElement[];
    options[1].click();
    fixture.detectChanges();
    flush();
    const inputEl = fixture.debugElement.query(By.css('input'))!;
    inputEl.nativeElement.value = '';
    inputEl.triggerEventHandler('input', { target: inputEl.nativeElement });
    fixture.detectChanges();

    expect(component.formGroup.controls.deliveryAddress.enabled).toBeTrue();
    expect(component.formGroup.controls.deliveryAddress.invalid).toBeTrue();
  }));

  it('should be valid after entering the delivery address', fakeAsync(() => {
    const trigger = fixture.debugElement.query(
      By.css('.mat-mdc-select-trigger'),
    )!.nativeElement;
    const overlayContainerElement =
      TestBed.inject(OverlayContainer).getContainerElement();
    trigger.click();
    fixture.detectChanges();
    flush();
    const options = [
      ...overlayContainerElement.querySelectorAll('mat-option'),
    ] as HTMLElement[];
    options[1].click();
    fixture.detectChanges();
    flush();
    const inputEl = fixture.debugElement.query(By.css('input'))!;
    inputEl.nativeElement.value = 'Anywhere';
    inputEl.triggerEventHandler('input', { target: inputEl.nativeElement });
    fixture.detectChanges();

    expect(component.formGroup.controls.deliveryAddress.enabled).toBeTrue();
    expect(component.formGroup.controls.deliveryAddress.valid).toBeTrue();
  }));
});
