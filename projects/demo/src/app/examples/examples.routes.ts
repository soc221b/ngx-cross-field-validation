import { Route } from '@angular/router';
import { routeConditionalValidation } from './conditional-validation/conditional-validation.route';
import { routeEqualityValidation } from './equality-validation/equality-validation.route';
import { routeInequalityValidation } from './inequality-validation/inequality-validation.route';
import { routeSequenceValidation } from './sequence-validation/sequence-validation.route';

export const routeExamples: Route = {
  path: 'examples',
  loadComponent: () =>
    import('./examples.component').then((m) => m.ExamplesComponent),
  children: [
    routeConditionalValidation,
    routeEqualityValidation,
    routeInequalityValidation,
    routeSequenceValidation,
  ],
};
