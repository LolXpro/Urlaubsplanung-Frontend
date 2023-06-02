import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  typeVal: string | undefined;
  fromDate: Date | undefined;
  toDate: Date | undefined;
  description: string | undefined;

  constructor() {}

  public submit(){
    console.log(this.typeVal, this.fromDate, this.toDate, this.description)
  }

  public cancel() {
    this.typeVal = ''
    this.fromDate = undefined
    this.toDate = undefined
    this.description = undefined;
  }
}
