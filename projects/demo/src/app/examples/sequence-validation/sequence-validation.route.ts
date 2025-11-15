import { Route } from '@angular/router';

export const routeSequenceValidation: Route = {
  title: 'Sequence validation',
  path: 'sequence-validation',
  loadComponent: () =>
    import('./sequence-validation.component').then(
      (m) => m.SequenceValidationComponent,
    ),
};
