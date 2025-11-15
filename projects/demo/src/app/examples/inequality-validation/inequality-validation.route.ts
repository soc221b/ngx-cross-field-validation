import { Route } from '@angular/router';

export const routeInequalityValidation: Route = {
  title: 'Inequality validation',
  path: 'inequality-validation',
  loadComponent: () =>
    import('./inequality-validation.component').then(
      (m) => m.InequalityValidationComponent,
    ),
};
