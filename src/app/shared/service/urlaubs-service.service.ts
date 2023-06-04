import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Urlaub} from "../../models/urlaub";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UrlaubsServiceService {

  baseUrl = 'http://localhost:8081'

  constructor(private http: HttpClient) { }

  getUrlaube(status?: string, username?: string): Observable<Urlaub[]>{
    let params = new HttpParams()
    if(status){params = params.append('status', status)}
    if(username){params = params.append('username', username)}
    return this.http.get<Urlaub[]>(this.baseUrl+ '/urlaube', {params})
  }


  putUrlaubStatus(id: number, status: string) {
    this.http.put('https://dd239709-42c6-4f8c-93cd-1000b92bf6ac.mock.pstmn.io' + '/urlaube/' + id, {status}).subscribe()
  }
}
