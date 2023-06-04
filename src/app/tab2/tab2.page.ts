import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  typeVal: string = 'urlaub';
  fromDate: Date | undefined;
  toDate: Date | undefined;
  description: string | undefined;

  constructor() {
  }

  public submit(){
    console.log(this.typeVal, this.fromDate, this.toDate, this.description)
    this.reset();
  }

  public reset() {
    this.typeVal = 'urlaub'
    this.fromDate = undefined;
    this.toDate = undefined;
    this.description = undefined;
  }
  handleRefresh(event:any) {
    setTimeout(() => {
      this.reset();
      event.target.complete();
    }, 20);
  }

  getTomorrowString(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }
}
