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
  urlaubsListeBearbeitung$: Observable<Urlaub[]>;
  urlaubsListeGenehmigt$: Observable<Urlaub[]>;
  urlaubsListeAbgelehnt$: Observable<Urlaub[]>;
  urlaubstage$: Observable<number>;
  sonderurlaubstage$: Observable<number>;

  constructor(private keycloakService: KeycloakService, private urlaubsService: UrlaubsServiceService) {
    this.urlaubsListeBearbeitung$ = this.getUrlaube('bearbeitung');
    this.urlaubsListeGenehmigt$ = this.getUrlaube("genehmigt");
    this.urlaubsListeAbgelehnt$ = this.getUrlaube("abgelehnt");
    this.urlaubstage$=this.getUrlabstage();
    this.sonderurlaubstage$=this.getSonderurlabstage();
  }

  public getUrlaube(status?: string): Observable<Urlaub[]>{
    return this.urlaubsService.getUrlaube(status, this.getUsername())
  }

  public getUsername(){
    return this.keycloakService.getUsername()
  }
  rejectVacation(vacation: any) {
    this.urlaubsService.putUrlaubStatus(vacation.id, "abgelehnt")
    console.log('Urlaub abgelehnt:', vacation);
    this.updateData();
    // Index des Urlaubs in der vacationList finden
  }

  public updateData(){
    setTimeout(() => {
      this.urlaubsListeBearbeitung$ = this.getUrlaube('bearbeitung');
      this.urlaubsListeGenehmigt$ = this.getUrlaube("genehmigt");
      this.urlaubsListeAbgelehnt$ = this.getUrlaube("abgelehnt");
      this.urlaubstage$=this.getUrlabstage();
      this.sonderurlaubstage$=this.getSonderurlabstage();
    }, 750); // Verzögerung von 2000 Millisekunden (2 Sekunden)
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      this.updateData();
      event.target.complete();
    }, 500);
  }



  deleteVacation(vacation: Urlaub) {
    this.urlaubsService.deleteUrlaub(vacation.id)
    this.updateData()
  }

 ionViewWillEnter() {
    this.updateData()
 }

  private getUrlabstage() {
    return this.urlaubsService.getUrlaubstage(this.getUsername(),'normal');
  }

  private getSonderurlabstage() {
    return this.urlaubsService.getUrlaubstage(this.getUsername(),'special');
  }
}
