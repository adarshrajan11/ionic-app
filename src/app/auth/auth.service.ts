import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from './models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ROOT_URL = environment.rootUrl;

  constructor( private http: HttpClient ,private router:Router) {
   }

  userName:any= localStorage.getItem('userName');

  isLoggedIn(){
    return !!localStorage.getItem('appToken');
  }

  logoutApp(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

/********************************************All api services*********************************************************** */
  login(username,password) {
    let data = {
      'username' : username,
      'password' : password
    };
    return this.http.post<any>(`${this.ROOT_URL}/api/m/login`,data);
  }

  logout(data={}){
    return this.http.post<any>(`${this.ROOT_URL}/api/m/logout`,data);
  }

  register(user){  
    return this.http.post<any>(`${this.ROOT_URL}/api/m/register`,user);
  }
  socialLogin(data){  
    return this.http.post<any>(`${this.ROOT_URL}/api/m/socialLogin`,data);
  }

  sendOtp(data){
    console.log("sendOtp Service Enter");
    return this.http.post<any>(`${this.ROOT_URL}/api/m/sendOtp`,data);
  }

  resetPasswordRequest(data){
    console.log("resetPasswordRequest");
    return this.http.post<any>(`${this.ROOT_URL}/api/m/resetPasswordRequest`,data);
  }
  resetPassword(data){
    console.log("resetPassword");
    return this.http.post<any>(`${this.ROOT_URL}/api/m/resetPassword`,data);
  }

}
