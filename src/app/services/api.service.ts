import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({
    //  'Content-Type': 'application/json',
     'Authorization': 'Bearer IC5n6ZKd78ZZ79oxtweaZaUugV5u22'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  endpoint = 'https://backend.smartwaypanel.com/api/tracking/historical_data/positions'

  constructor(private http:HttpClient) { }

  getPositions(params): Observable<any>{
    return this.http.get(this.endpoint + params, httpOptions)
  }

  getPositionsDetails(params) : Observable<any>{
    return this.http.get(this.endpoint + params, httpOptions)
  }
}
