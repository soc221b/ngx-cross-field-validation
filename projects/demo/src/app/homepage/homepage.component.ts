import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { delay, fromEvent, startWith, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-homepage',
  imports: [MatTabsModule],
  templateUrl: './homepage.component.html',
})
export class HomepageComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription?: Subscription;

  ngOnInit(): void {
    this.subscription = fromEvent(window, 'click')
      .pipe(
        startWith(),
        delay(0),
        tap(() => (window as any).hljs.highlightAll()),
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    (window as any).hljs.highlightAll();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  installCode = `
$ npm i ngx-cross-field-validation
  `.trim();

  importCode = `
import { createCrossFieldValidator } from 'ngx-cross-field-validation';
  `.trim();

  htmlCode = `
<select
  [formControl]="formGroup.controls.shippingMethod"
  (change)="formGroup.controls.deliveryAddress.updateValueAndValidity()"
>
  <option value="pickup">Pickup</option>
  <option value="delivery">Delivery</option>
</select>

<input
  type="text"
  [formControl]="formGroup.controls.deliveryAddress"
/>
  `.trim();

  tsCode = `
type T = FormGroup<{
  shippingMethod: FormControl<'pickup' | 'delivery'>;
  deliveryAddress: FormControl<null | string>;
}>;

new FormGroup<T>({
  shippingMethod: new FormControl("pickup", {
    nonNullable: true,
    validators: [
      Validators.required,
    ],
  }),
  deliveryAddress: new FormControl(null, {
    validators: [
      createCrossFieldValidator<T>(({ root }) =>
        root.controls.shippingMethod.value === 'delivery'
          ? Validators.required
          : null,
      ),
    ],
  }),
});
  `.trim();
}
