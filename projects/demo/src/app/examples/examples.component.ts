import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  ActivatedRoute,
  EventType,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { routeExamples } from './examples.routes';
import { filter, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-examples',
  imports: [RouterLink, MatCardModule, RouterOutlet],
  templateUrl: './examples.component.html',
})
export class ExamplesComponent implements OnInit, OnDestroy {
  routes = routeExamples.children;
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  subscription?: Subscription;

  ngOnInit(): void {
    this.navigateToFirstChild();
    this.subscription = this.router.events
      .pipe(
        filter((e) => e.type === EventType.NavigationEnd),
        tap(() => this.navigateToFirstChild()),
      )
      .subscribe();
  }

  private navigateToFirstChild() {
    if (this.activatedRoute.firstChild === null) {
      this.router.navigate(['examples', this.routes?.[0].path]);
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
