import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ROOT_URL = environment.rootUrl;
  BASE_URL = this.ROOT_URL+'/api/m';

  constructor(private http: HttpClient ) {}

   userVerified:boolean;

   
  isUserVerified(){
    if(localStorage.getItem('verified')=='true'){
      return true;
    }else{
      return false;
    }
    
  }
  setUserAsVerified(){
    localStorage.setItem('verified','true')
  }

  getUserVerificationStatus(){
    return this.http.get<any>(`${this.BASE_URL}/users/verificationStatus`);
  }

  sendEmailVerificationCode(data){
    return this.http.post<any>(`${this.BASE_URL}/users/sendEmailVerificationCode`,data)
  }

  sendPhoneVerificationCode(data){
    return this.http.post<any>(`${this.BASE_URL}/users/sendPhoneVerificationCode`,data)
  }

  confirmEmailVerification(data){
    return this.http.post<any>(`${this.BASE_URL}/users/confirmEmailVerification`,data)
  }
 
  confirmPhoneVerifcation(data){
    return this.http.post<any>(`${this.ROOT_URL}/api/m/users/confirmPhoneVerification`,data)
  }

  


  



}
