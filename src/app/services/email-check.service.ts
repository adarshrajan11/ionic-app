import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailCheckService {

  ROOT_URL = environment.rootUrl;
  BASE_URL =this.ROOT_URL+'/api/m';

  constructor( private http: HttpClient ) { }

  getReceivedChecks(page,term="") {
    return this.http.get<any>(`${this.BASE_URL}/emailchecks/receivedChecks?page=${page}&&term=${term}`);
  }

  createEmailCheck(data){
    return this.http.post<any>(`${this.BASE_URL}/emailchecks/create`,data);
  }

  updateEmailCheckStatus(data){
    return this.http.post<any>(`${this.BASE_URL}/emailchecks/updateStatus`,data);
  }



  
}


