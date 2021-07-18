import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyManagementService {

  ROOT_URL = environment.rootUrl;

  constructor( private http: HttpClient ) {}


  getAllCompanies() {
    return this.http.get<any>(`${this.ROOT_URL}/api/m/companyManagement/getAllCompanies`);
  }

  checkActiveCompanyIdExist(){
    return !!localStorage.getItem('activeCompanyId');
  }
  checkActiveCompanyNameExist(){
    return !!localStorage.getItem('activeCompanyName');
  }

  getActiveCompanyId(){
    return localStorage.getItem('activeCompanyId');
  }

  getActiveCompanyName(){
    return localStorage.getItem('activeCompanyName');
  }
  getActiveCompanyType(){
    return localStorage.getItem('activeCompanyType');
  }

  setActiveCompanyInfo(id,name,type){
      localStorage.setItem('activeCompanyName',name);
      localStorage.setItem('activeCompanyId',id);
      localStorage.setItem('activeCompanyType',type);  //owncmp  or invcomp 
  }

 

}
