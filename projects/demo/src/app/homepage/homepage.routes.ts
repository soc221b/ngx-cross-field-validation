import { Route } from '@angular/router';

export const routeHomepage: Route = {
  title: 'ngx-cross-field-validation',
  path: '',
  loadComponent: () =>
    import('./homepage.component').then((m) => m.HomepageComponent),
};
