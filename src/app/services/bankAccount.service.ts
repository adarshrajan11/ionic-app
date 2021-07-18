import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  ROOT_URL = environment.rootUrl;
  BASE_URL =this.ROOT_URL+'/api/m';
  private httpClient: HttpClient;      // for external API

  constructor( private http: HttpClient ,handler: HttpBackend) { 
    this.httpClient = new HttpClient(handler);
  }

  getBankAccounts(term="") {
    return this.http.get<any>(`${this.BASE_URL}/bank-accounts?term=${term}`);
  }

  save(data) {
    return this.http.post<any>(`${this.BASE_URL}/bank-accounts/create`,data);
  }

  getBankAcountVerifyurl(bankAccount='') {
    return this.http.get<any>(`${this.BASE_URL}/bank-accounts/verifyAccount?bankAccountId=${bankAccount}`);
  }

  deleteBankAccount(data){
    return this.http.post<any>(`${this.BASE_URL}/bank-accounts/deleteBankAccount`,data);
  }

  showBankAccount(id){
    return this.http.get<any>(`${this.BASE_URL}/bank-accounts/showBankAccount/${id}`);
  }

  updateBankAccount(data){
    return this.http.post<any>(`${this.BASE_URL}/bank-accounts/updateBankAccount`,data);
  }



  //BANKS
  getAllBanks(){
    return this.http.get<any>(`${this.BASE_URL}/banks/getAllBanks`);
  }

  showBank(id){
    return this.http.get<any>(`${this.BASE_URL}/banks/showBank/${id}`);
  }
  updateBank(data){
    return this.http.post<any>(`${this.BASE_URL}/banks/updateBank`,data);
  }

  //external API
  getBankDetailsFromRoutingNumber(rn){
   return this.httpClient.get<any>(`https://www.routingnumbers.info/api/data.json?rn=${rn}`)
  }







}
