import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Urlaub} from "../../models/urlaub";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UrlaubsServiceService {

  baseUrl = 'http://localhost:8081/urlaube'

  constructor(private http: HttpClient) { }

  getUrlaube(status?: string, username?: string): Observable<Urlaub[]>{
    let params = new HttpParams()
    if(status){params = params.append('status', status)}
    if(username){params = params.append('username', username)}
    return this.http.get<Urlaub[]>(this.baseUrl, {params})
  }

  postUrlaub(urlaub: {
    username: string;
    startDate: Date;
    endDate: Date;
    type: string;
    description: string;
    status: string;
  }){
    this.http.post(this.baseUrl, urlaub).subscribe()
  }

  putUrlaubStatus(id: number, status: string) {
    let params = new HttpParams().append('status', status)
    this.http.put(this.baseUrl + '/' + id, null, {params}).subscribe()
  }

  deleteUrlaub(id: number){
    this.http.delete(this.baseUrl + '/' + id).subscribe()
  }
}
