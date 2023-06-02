import { Component } from '@angular/core';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private keycloakService: KeycloakService) {}

  public logout(){
    this.keycloakService.logout()
  }

  hasRole(reqRole: string) {
    return this.keycloakService.getUserRoles().includes(reqRole)
  }
}
