# ngx-cross-field-validation

```sh
$ npm i ngx-cross-field-validation
```

```ts
import { createCrossFieldValidator } from "ngx-cross-field-validation";
```

```ts
type T = FormGroup<{
  shippingMethod: FormControl<"pickup" | "delivery">;
  deliveryAddress: FormControl<null | string>;
}>;

new FormGroup<T>({
  shippingMethod: new FormControl("pickup", {
    nonNullable: true,
    validators: [Validators.required],
  }),
  deliveryAddress: new FormControl(null, {
    validators: [
      createCrossFieldValidator<T>(({ root }) => {
        return root.controls.shippingMethod.value === "delivery" ? Validators.required : null;
      }),
    ],
  }),
});
```
