import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckRequestService {

  ROOT_URL = environment.rootUrl;
  BASE_URL = this.ROOT_URL+'/api/m';

  constructor( private http: HttpClient ) { }

  getAllCheckRequests(page,term="",status=""){
     return this.http.get<any>(`${this.BASE_URL}/check-requests?page=${page}&&term=${term}&&status=${status}`);
  }

  newCheckRequest(data){
    return this.http.post<any>(`${this.BASE_URL}/check-requests`,data);
  }

  deleteCheckRequest(id){
    return this.http.delete<any>(`${this.BASE_URL}/check-requests/${id}`);
  }

  newCheckRequestByLink(data){
    return this.http.post<any>(`${this.BASE_URL}/check-requests/by-link`,data);
  }

  resendRequest(id,data={}){
    return this.http.post<any>(`${this.BASE_URL}/check-requests/${id}/resend`,data);
  }


  //*********************************Approval side*************************************************//
  getAllReceivedCheckRequest(page,term="",status=""){
    return this.http.get<any>(`${this.BASE_URL}/check-requests/received?page=${page}&&term=${term}&&status=${status}`);
  }

  showReceivedCheckRequest(id){
    return this.http.get<any>(`${this.BASE_URL}/check-requests/received/${id}`);
  }

  approveCheckRequest(id,data){
    return this.http.post<any>(`${this.BASE_URL}/check-requests/received/${id}/approve`,data);
  }

  rejectCheckRequest(id,data={}){
    return this.http.post<any>(`${this.BASE_URL}/check-requests/received/${id}/reject`,data);
  }


}
