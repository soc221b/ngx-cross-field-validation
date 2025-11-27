import{a as p}from"./chunk-VDCNSOUF.js";import{Ia as e,Ta as d,bb as t,ib as o,jb as r,kb as l,yb as i}from"./chunk-SVKJO3NG.js";var c=class s{demoCode=`
new FormControl(null, {
  validators: [
    ExtraValidators.sameAs('password'),

    ExtraValidators.differentFrom('sender'),

    ExtraValidators.requiredIf(
      'shippingMethod',
      (control) => control.value === 'delivery',
    ),

    ExtraValidators.withPrevious(
      // Fully type-safe
      // The path syntax is exactly the same as TypeScript
      'group[number].tires',

      // The \`withPrevious\` is a higher-order function,
      // you can combine it with any existing validator functions
      (previousTire) => Validators.min(previousTire.controls.price.value),
    ),
  ],
});
  `.trim();installCode=`
$ npm i ngx-cross-field-validation
  `.trim();implementationCode=`
import {
  createCrossFieldValidator,
  abstractControlPathValue,
  AbstractControlPathValue,
  AbstractControlPaths,
} from 'ngx-cross-field-validation';

function createExtraValidators<T extends FormGroup>(injector: Injector) {
  return {
    requiredIf: function <P extends AbstractControlPaths<T>>(
      targetPath: P,
      predicate: (targetValue: AbstractControlPathValue<T, P>['value']) => boolean,
    ) {
      injector.get(DestroyRef).onDestroy(() => {
        subscription?.unsubscribe();
        subscription = null;
      });
      let subscription: null | Subscription = null;
      let isSelf = false;

      return createCrossFieldValidator<T>(function ({ root, control }) {
        const targetControl = abstractControlPathValue(root, targetPath);

        subscription?.unsubscribe();
        subscription = targetControl.valueChanges
          .pipe(
            tap(() => {
              if (isSelf) return;
              isSelf = true;
              control.updateValueAndValidity();
              isSelf = false;
            }),
          )
          .subscribe();

        if (predicate(targetControl.value) === false) {
          return null;
        }

        return Validators.required(control);
      });
    },
  };
}
  `.trim();htmlCode=`
<form>
  <select [formControl]="formGroup.controls.shippingMethod">
    <option value="pickup">Pickup</option>
    <option value="delivery">Delivery</option>
  </select>

  <input [formControl]="formGroup.controls.deliveryAddress" />

  <button>Submit</button>
</form>
  `.trim();tsCode=`
type T = FormGroup<{
  shippingMethod: FormControl<'pickup' | 'delivery'>;
  deliveryAddress: FormControl<null | string>;
}>;

@Component({ ... })
export class MyComponent {
  private readonly injector = inject(Injector);
  private readonly ExtraValidators = createExtraValidators<T>(this.injector);

  protected readonly formGroup = new FormGroup<T>({
    shippingMethod: new FormControl('pickup', {
      nonNullable: true,
      validators: [
        Validators.required,
      ],
    }),
    deliveryAddress: new FormControl(null, {
      validators: [
        ExtraValidators.requiredIf(
          'shippingMethod',
          (value) => value === 'delivery',
        ),
      ],
    }),
  });
}
  `.trim();static \u0275fac=function(a){return new(a||s)};static \u0275cmp=d({type:s,selectors:[["app-homepage"]],decls:15,vars:5,consts:[[1,"text-center","text-xl","font-bold"],[1,"text-center","text-lg","font-bold","mt-4","mb-2"],[1,"mt-2"],["language","typescript",1,"w-80","md:w-160","lg:w-240",3,"code"],["language","shell",1,"w-80","md:w-160","lg:w-240",3,"code"],["language","html",1,"w-80","md:w-160","lg:w-240",3,"code"]],template:function(a,n){a&1&&(o(0,"h1",0),i(1,"Cross-field Validation"),r(),o(2,"h2",1),i(3,"Introduction"),r(),o(4,"p"),i(5,` This library provides several utilities that help you focus on declaring business logic when working with cross-field validation in Angular.
`),r(),o(6,"p",2),i(7,` For instance, with ngx-cross-field-validation, you can create your own validator functions and use them like this:
`),r(),l(8,"app-code",3),o(9,"h2",1),i(10,"Getting Started"),r(),l(11,"app-code",4)(12,"app-code",5)(13,"app-code",3)(14,"app-code",3)),a&2&&(e(8),t("code",n.demoCode),e(3),t("code",n.installCode),e(),t("code",n.htmlCode),e(),t("code",n.tsCode),e(),t("code",n.implementationCode))},dependencies:[p],encapsulation:2})};export{c as HomepageComponent};
