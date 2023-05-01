import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Request } from './request.class';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  baseurl: string = "http://localhost:5000/api/requests";
  constructor(
    private http: HttpClient
  ) { }

  list(): Observable<Request[]>{
    return this.http.get(`${this.baseurl}`) as Observable<Request[]>;
  }

  get(id: number): Observable<Request>{
    return this.http.get(`${this.baseurl}/${id}`) as Observable<Request>;
  }

  create(request: Request): Observable<Request>{
    return this.http.post(`${this.baseurl}`, request) as Observable<Request>;
  }

  change(id: number, request: Request): Observable<any>{
    return this.http.put(`${this.baseurl}/${id}`, request) as Observable<any>;
  }

  remove(id: number): Observable<any>{
    return this.http.delete(`${this.baseurl}/${id}`) as Observable<any>;
  }

  // *************** Additional Methods ***************

    // ******** Methods returns all Requests with Status REVIEW except those of current User ********
  requests(id: number): Observable<Request[]>{
    return this.http.get(`${this.baseurl}/reviews/${id}`) as Observable<Request[]>;
  }

  // ******** Methods Sets Request Status to Review or Approved ********
  review(request: Request): Observable<any>{
    return this.http.put(`${this.baseurl}/review/${request.id}`, request) as Observable<any>;
  }

  approve(request: Request): Observable<any>{
    return this.http.put(`${this.baseurl}/approve/${request.id}`, request) as Observable<any>;
  }

  reject(request: Request): Observable<any>{
    if(request.rejectionReason === null){
     console.debug("Rejection Reason Required");
     return request.rejectionReason as Observable<any>;  // <<<<<<<<<<<< Refactor Required <<<<<<<<<<<<<
    }
    return this.http.put(`${this.baseurl}/reject/${request.id}`, request) as Observable<any>;
  }

}
