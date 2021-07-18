import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailCheckService {

  ROOT_URL = environment.rootUrl;
  BASE_URL =this.ROOT_URL+'/api/m';

  constructor( private http: HttpClient ) { }

  getMailingOptions() {
    return this.http.get<any>(`${this.BASE_URL}/mailchecks/getMailingOptions`);
  }

  createMailCheck(data){
    return this.http.post<any>(`${this.BASE_URL}/mailchecks/create`,data);
  }


  // multiple check by HAFIL on 17-07-2020

  loadMultipleCheck(checksIds){
       return this.http.post<any>(`${this.BASE_URL}/mailchecks/getMultiMailData`,checksIds);
  }

  createMultipleMailCheck(data){
    return this.http.post<any>(`${this.BASE_URL}/mailchecks/multipleCreate`,data);
}

  getTotalMailingFee(data){
    return this.http.post<any>(`${this.BASE_URL}/mailchecks/getTotalMailingFee`,data);
  }

  //custom to address
  addNewCustomToAddress(data){
    return this.http.post<any>(`${this.BASE_URL}/mailchecks/addCustomAddress`,data)
  }

  showCustomToAddress(id){
     return this.http.get<any>(`${this.BASE_URL}/mailchecks/showCustomAddress/${id}`)
  }

  updateCustomToAddress(data){
    return this.http.post<any>(`${this.BASE_URL}/mailchecks/updateCustomAddress`,data)
  }


  // custom from address
  showCustomFromAddress(id){
    return this.http.get<any>(`${this.BASE_URL}/mailchecks/showCustomFromAddress/${id}`)
  }

 addNewCustomFromAddress(data){
  return this.http.post<any>(`${this.BASE_URL}/mailchecks/addCustomFromAddress`,data)
 }

 updateCustomFromAddress(data){
  return this.http.post<any>(`${this.BASE_URL}/mailchecks/updateCustomFromAddress`,data)
 }



 //attachments

 //get attachments by check id
 loadExisitngAttachments(data){
    return this.http.post<any>(`${this.BASE_URL}/mailchecks/getExistingAttachment`,data)
 }

 saveAttachment(data){
   return this.http.post<any>(`${this.BASE_URL}/mailchecks/addAttachment`,data)
 }

 updateMailDocumentsFromExistingAttachments(data){
  return this.http.post<any>(`${this.BASE_URL}/mailchecks/updateMailDocumentsFromExistingAttachments`,data)
}

getAttachmentUrl(id){
  return this.http.get<any>(`${this.BASE_URL}/mailchecks/openAttachment/${id}`)
}







  

 








}
