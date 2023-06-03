import { Component } from '@angular/core';
import {delay} from "rxjs";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  toEditVacationList: Array<any>;
  vacationList: Array<any>;
  constructor() {
    this.toEditVacationList = this.getToEditVacationList();
    this.vacationList = this.getVacationList();

  }

  getToEditVacationList(){
    //Get-Methode zum befüllen des Arrays für die "zu bearbeitenden Urlaube" hier einfügen
    return [
      { startDate: '2023-06-01', endDate: '2023-06-05', attribute: 'Attribute 1' },
      { startDate: '2023-06-10', endDate: '2023-06-15', attribute: 'Attribute 2' }
    ];
  }

  getVacationList(){
    //Get-Methode zum befüllen des Arrays für die "zu bearbeitenden Urlaube" hier einfügen
    return [
      { startDate: '2023-06-01', endDate: '2023-06-05', attribute: 'Attribute 1' },
      { startDate: '2023-06-10', endDate: '2023-06-15', attribute: 'Attribute 2' }
    ];
  }


  acceptVacation(vacation: any) {
    // Logik für das Akzeptieren des Urlaubs hier ausführen
    console.log('Urlaub akzeptiert:', vacation);
  }

  rejectVacation(vacation: any) {
    // Index des Urlaubs in der vacationList finden
    const index = this.toEditVacationList.indexOf(vacation);

    // Wenn der Index gefunden wurde
    if (index > -1) {
      // Den Urlaub aus der vacationList entfernen
      this.toEditVacationList.splice(index, 1);
      console.log('Urlaub abgelehnt:', vacation);
    }else {
      console.log('Urlaub ablehnung fehlgeschlagen:', vacation);
    }
  }
}
