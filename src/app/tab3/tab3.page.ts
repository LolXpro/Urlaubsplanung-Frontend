import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {UrlaubsServiceService} from "../shared/service/urlaubs-service.service";
import {Urlaub} from "../models/urlaub";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  urlaubsListeBearbeitung$: Observable<Urlaub[]>;
  urlaubsListeGenehmigt$: Observable<Urlaub[]>;

  constructor(private urlaubsService: UrlaubsServiceService) {
    this.urlaubsListeBearbeitung$ = this.getUrlaube('bearbeitung');
    this.urlaubsListeGenehmigt$ = this.getUrlaube("genehmigt");
  }

  public getUrlaube(status?: string): Observable<Urlaub[]>{
    return this.urlaubsService.getUrlaube(status)
  }


  acceptVacation(vacation: any) {
    this.urlaubsService.putUrlaubStatus(vacation.id, "genehmigt")
    this.updateData();
    // Logik für das Akzeptieren des Urlaubs hier ausführen
    console.log('Urlaub akzeptiert:', vacation);
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

}
