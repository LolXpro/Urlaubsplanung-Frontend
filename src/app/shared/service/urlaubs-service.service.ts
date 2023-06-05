import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Urlaub} from "../../models/urlaub";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UrlaubsServiceService {

  baseUrl = 'http://localhost:8081/'

  constructor(private http: HttpClient) { }

  getUrlaube(status?: string, username?: string): Observable<Urlaub[]>{
    let params = new HttpParams()
    if(status){params = params.append('status', status)}
    if(username){params = params.append('username', username)}
    return this.http.get<Urlaub[]>(this.baseUrl + 'urlaube', {params})
  }

  postUrlaub(urlaub: {
    username: string;
    startDate: Date;
    endDate: Date;
    type: string;
    description: string;
    status: string;
  }){
    this.http.post(this.baseUrl + 'urlaube' , urlaub).subscribe()
  }

  putUrlaubStatus(id: number, status: string) {
    let params = new HttpParams().append('status', status)
    this.http.put(this.baseUrl + 'urlaube/' + id, null, {params}).subscribe()
  }

  deleteUrlaub(id: number){
    this.http.delete(this.baseUrl + 'urlaube/' + id).subscribe()
  }

  getUrlaubstage(username:string,typ:string):Observable<number>{
    let params = new HttpParams().append('typ' , typ);
    return this.http.get<number>(this.baseUrl + 'benutzer/'+username, {params})
  }

}
