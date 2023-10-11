import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  private sort$ = new BehaviorSubject<number[]>([]);

  public bubbleSort(arrToBeSorted: number[]): Observable<number[]> {

    if (arrToBeSorted.length === 0) {
      return of([]); // returns an empty array if input empty
    }

    // validates the input to make sure every item is in fact a number
    const validInput = arrToBeSorted.every(item => typeof item === 'number');

    if (!validInput) {
      return throwError(() => 'Invalid input.');
    }

    if (arrToBeSorted.length > 1) {

      let end = arrToBeSorted.length;
      let swapped: boolean = false;

      do {
        swapped = false;
        for (let i = 0; i < end - 1; i++) {
          if (arrToBeSorted[i] > arrToBeSorted[i + 1]) {
            // Swaps
            arrToBeSorted = this.swap(arrToBeSorted, i, i + 1);
            swapped = true;
          }
        }
        end--; // last item swapped so it bubbles
      } while (swapped);
    }

    this.sort$.next(arrToBeSorted);
    return this.sort$.asObservable();
  }

  private swap(array: number[], index1: number, index2: number): number[] {
    let auxItem = array[index1];
    array[index1] = array[index2];
    array[index2] = auxItem;

    return array;
  }
}
