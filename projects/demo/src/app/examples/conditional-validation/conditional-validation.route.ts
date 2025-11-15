import { Route } from '@angular/router';

export const routeConditionalValidation: Route = {
  title: 'Conditional validation',
  path: 'conditional-validation',
  loadComponent: () =>
    import('./conditional-validation.component').then(
      (m) => m.ConditionalValidationComponent,
    ),
};
