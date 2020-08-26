import { of, Observable, timer, Subject, fromEvent } from 'rxjs';
import { map, takeUntil, repeatWhen } from 'rxjs/operators';

export class RepeatingServiceCall<T> {
  readonly observable$: Observable<T>;
  private readonly _stop = new Subject<void>();
  private readonly _start = new Subject<void>();

  constructor(delay: number) {
    this.observable$ = timer(0, delay)
      .pipe(
        map(() => <T>{}),
        takeUntil(this._stop),
        repeatWhen(() => this._start)
      );
  }

  start(): void {
    this._start.next();
  }

  stop(): void {
    this._stop.next();
  }

}

const caller = new RepeatingServiceCall<any>(1000);
caller.observable$.subscribe(() => console.log('RUNNING'));

fromEvent(document.querySelector('#stop'), 'click')
  .subscribe(() => caller.stop());
fromEvent(document.querySelector('#start'), 'click')
  .subscribe(() => caller.start());



