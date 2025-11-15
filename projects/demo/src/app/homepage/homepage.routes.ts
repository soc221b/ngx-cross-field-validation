import { Route } from '@angular/router';

export const routeHomepage: Route = {
  path: '',
  loadComponent: () =>
    import('./homepage.component').then((m) => m.HomepageComponent),
};
