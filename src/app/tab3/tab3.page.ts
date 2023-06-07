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


  public acceptVacation(vacation: any) {
    this.urlaubsService.putUrlaubStatus(vacation.id, "genehmigt")
    console.log('Urlaub akzeptiert:', vacation);
    this.updateData();
  }

  public rejectVacation(vacation: any) {
    this.urlaubsService.putUrlaubStatus(vacation.id, "abgelehnt")
    console.log('Urlaub abgelehnt:', vacation);
    this.updateData();
  }

  private updateData(){
    setTimeout(() => {
    this.urlaubsListeBearbeitung$ = this.getUrlaube('bearbeitung');
    this.urlaubsListeGenehmigt$ = this.getUrlaube("genehmigt");
    }, 750);
  }

  public handleRefresh(event:any) {
    setTimeout(() => {
      this.updateData();
      event.target.complete();
    }, 1000);
  }

  ionViewWillEnter() {
    this.updateData()
  }

}
