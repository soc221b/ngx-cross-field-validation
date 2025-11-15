import { Route } from '@angular/router';

export const routeEqualityValidation: Route = {
  title: 'Equality validation',
  path: 'equality-validation',
  loadComponent: () =>
    import('./equality-validation.component').then(
      (m) => m.EqualityValidationComponent,
    ),
};
