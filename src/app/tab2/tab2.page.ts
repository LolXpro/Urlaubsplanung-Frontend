import { Component } from '@angular/core';
import {UrlaubsServiceService} from "../shared/service/urlaubs-service.service";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  typeVal: string = 'normal';
  fromDate: Date | undefined;
  toDate: Date | undefined;
  description: string | undefined;

  constructor(private keycloakService: KeycloakService, private urlaubsService: UrlaubsServiceService) {
  }

  public submit(){

    this.urlaubsService.postUrlaub({
      username: this.keycloakService.getUsername(),
      startDate: this.fromDate!,
      endDate: this.toDate!,
      type: this.typeVal,
      description: this.description? this.description: '',
      status: "bearbeitung"
    })
    console.log(this.typeVal, this.fromDate, this.toDate, this.description)
    this.reset();

  }

  public reset() {
    this.typeVal = 'normal'
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

  ionViewWillEnter() {
    this.reset()
  }

}
