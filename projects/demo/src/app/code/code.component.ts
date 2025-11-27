import {
  AfterViewInit,
  Component,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { delay, fromEvent, startWith, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-code',
  imports: [],
  templateUrl: './code.component.html',
})
export class CodeComponent implements OnInit, AfterViewInit, OnDestroy {
  language = input.required<string>();
  code = input.required<string>();

  private subscription?: Subscription;

  ngOnInit(): void {
    this.subscription = fromEvent(window, 'click')
      .pipe(
        startWith(),
        delay(0),
        tap(() => (window as any).hljs?.highlightAll()),
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    (window as any).hljs?.highlightAll();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
