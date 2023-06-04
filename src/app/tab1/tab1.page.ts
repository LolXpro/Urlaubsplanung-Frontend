import { Component } from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {Observable} from "rxjs";
import {Urlaub} from "../models/urlaub";

import {UrlaubsServiceService} from "../shared/service/urlaubs-service.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  vacationList: Array<any>
  urlaubsListeBearbeitung$: Observable<Urlaub[]>;
  urlaubsListeGenehmigt$: Observable<Urlaub[]>;
  urlaubsListeAbgelehnt$: Observable<Urlaub[]>;

  constructor(private keycloakService: KeycloakService, private urlaubsService: UrlaubsServiceService) {
    this.urlaubsListeBearbeitung$ = this.getUrlaube('bearbeitung');
    this.urlaubsListeGenehmigt$ = this.getUrlaube("genehmigt");
    this.urlaubsListeAbgelehnt$ = this.getUrlaube("abgelehnt");
  this.vacationList = [
                        { state: 'Genehmigt', startDate: '2023-06-01', endDate: '2023-06-05' },
                        { state: 'Abgelehnt', startDate: '2023-06-10', endDate: '2023-06-15' },
                        { state: 'In Bearbeitung', startDate: '2023-07-05', endDate: '2023-07-08' }
                      ];
  }

  public getUrlaube(status?: string): Observable<Urlaub[]>{
    return this.urlaubsService.getUrlaube(status, this.getUsername())
  }

  public getUsername(){
    return this.keycloakService.getUsername()
  }
  rejectVacation(vacation: any) {
    this.urlaubsService.putUrlaubStatus(vacation.id, "abgelehnt")
    this.updateData();
    // Index des Urlaubs in der vacationList finden
    console.log('Urlaub abgelehnt:', vacation);
  }

  updateData(){
    this.urlaubsListeBearbeitung$ = this.getUrlaube('bearbeitung');
    this.urlaubsListeGenehmigt$ = this.getUrlaube("genehmigt");
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      this.updateData();
      event.target.complete();
    }, 2000);
  }

  getvacationdays() {

  }

  getspecialvacationdays() {

  }

  deleteVacation(vacation: Urlaub) {
    this.urlaubsService.deleteUrlaub(vacation.id)
  }
}
