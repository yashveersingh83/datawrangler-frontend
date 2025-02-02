import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoadingindicatorService {
  private requestCount = 0; // Tracks active requests
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable().pipe(
    debounceTime(200) // Optional debounce for smoother UX
  );

  show(): void {
    this.requestCount++;
    this.updateLoadingState();
  }

  hide(): void {
    this.requestCount = Math.max(0, this.requestCount - 1);
    this.updateLoadingState();
  }

  private updateLoadingState(): void {
    this.loadingSubject.next(this.requestCount > 0);
  }
}
