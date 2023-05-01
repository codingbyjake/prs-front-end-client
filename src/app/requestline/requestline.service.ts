import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Requestline } from './requestline.class';

@Injectable({
  providedIn: 'root'
})
export class RequestlineService {
  baseurl: string = "http://localhost:5000/api/requestlines";

  constructor(
    private http: HttpClient
  ) { }

  create(requestline: Requestline): Observable<Requestline>{
    return this.http.post(`${this.baseurl}`, requestline) as Observable<Requestline>;
  }

  change(id: number, requestline: Requestline): Observable<any>{
    return this.http.put(`${this.baseurl}/${id}`, requestline) as Observable<any>;
  }

}
