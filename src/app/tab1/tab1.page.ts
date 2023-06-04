import { Component } from '@angular/core';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  vacationList: Array<any>

  constructor(private keycloakService: KeycloakService) {
  this.vacationList = [
                        { state: 'Genehmigt', startDate: '2023-06-01', endDate: '2023-06-05' },
                        { state: 'Abgelehnt', startDate: '2023-06-10', endDate: '2023-06-15' },
                        { state: 'In Bearbeitung', startDate: '2023-07-05', endDate: '2023-07-08' }
                      ];
  }

  public getUsername(){
    return this.keycloakService.getUsername()
  }

}
