import { Component, OnInit } from '@angular/core';
import { SortService } from '../services/sort.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent {
  public unsorted: number[] = [3, 2, 1];
  public sorted$: Observable<number[]> = new Observable<number[]>();

  constructor(private sortService: SortService) {

  }

  public sortArray(): void {
    this.sorted$ = this.sortService.bubbleSort(this.unsorted);
  }
}
