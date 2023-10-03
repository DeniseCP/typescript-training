import { Component } from '@angular/core';

@Component({
  selector: 'app-number-finder',
  templateUrl: './number-finder.component.html',
  styleUrls: ['./number-finder.component.css']
})
export class NumberFinderComponent {

  public largestNumber: number | null;
  public numberList: string | null = '';

  // private arrayOfInputNs: number[];

  constructor() {
    this.largestNumber = null;
  }

  public findLargestNumber(): void {
    let auxArr: string[] = [];
    if (this.numberList === null || this.numberList.trim().length === 0) {
      return;
    }

    auxArr = this.numberList.split(',').filter(a => /^\s*[0-9]*$/.test(a));

    // Solution using Javascript functions
    // this.arrayOfInputNs = auxArr.map(a => Number(a));
    // this.arrayOfInputNs.sort((a, b) => a - b);
    // this.largestNumber = this.arrayOfInputNs[this.arrayOfInputNs.length - 1];

    // Solution using Brute force
    if (auxArr.length > 0) {
      this.largestNumber = Number(auxArr[1]);
      for(let i = 1; i < auxArr.length; i++) {
        const currentNumber = Number(auxArr[i]);
        if(!isNaN(currentNumber) && currentNumber > this.largestNumber) {
          this.largestNumber = currentNumber;
        }
      }
    }

  }

}
