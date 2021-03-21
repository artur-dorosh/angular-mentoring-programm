import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderHandlingService {
  get loadingState(): boolean {
    return this.isLoading$.getValue();
  }

  set loadingState(value: boolean) {
    this.isLoading$.next(value);
  }

  private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
