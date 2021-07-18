import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayeeService {

  ROOT_URL = environment.rootUrl;
  BASE_URL =this.ROOT_URL+'/api/m';

  constructor( private http: HttpClient ) { }

  getPayeeSuggest(term) {
    return this.http.get<any>(`${this.BASE_URL}/payees/payeeSuggest?term=${term}`);
  }

  getPayees(page,term="") {
    return this.http.get<any>(`${this.BASE_URL}/payees?page=${page}&&term=${term}`);
  }

  save(data){
    return this.http.post<any>(`${this.BASE_URL}/payees/create`,data);
  }

  update(data){
    return this.http.post<any>(`${this.BASE_URL}/payees/update`,data);
  }

  delete(id){
    return this.http.delete<any>(`${this.BASE_URL}/payees/delete?id=${id}`);
  }

  showPayee(id){
    return this.http.get<any>(`${this.BASE_URL}/payees/show/${id}`);
  }

}
