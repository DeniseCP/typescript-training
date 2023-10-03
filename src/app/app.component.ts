import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public value: number = 0;
  public warnMsg: boolean = false;

  public increment(): void {
    this.warnMsg = false;
    this.value++;
  }

  public reset(): void {
    this.warnMsg = false;
    this.value = 0;
  }

  public decrease(): void {
    if (this.value !== 0) {
      this.value--;
    } else {
      this.warnMsg = true;
    }
  }
}
