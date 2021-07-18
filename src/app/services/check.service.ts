import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckService {

  ROOT_URL = environment.rootUrl;

  constructor( private http: HttpClient ) { }

  getChecks(page,term="",status="") {
    return this.http.get<any>(`${this.ROOT_URL}/api/m/checks?page=${page}&&term=${term}&&status=${status}`);
  }

  getCheckView(id) {
    return this.http.get<any>(`${this.ROOT_URL}/api/m/checks/show/${id}`);
  }

  saveCheck(data){
    return this.http.post<any>(`${this.ROOT_URL}/api/m/checks/create`,data);
  }

  updateCheck(data){
    return this.http.post<any>(`${this.ROOT_URL}/api/m/checks/updateCheck`,data);
  }


  getCheckSerialNumber(bankAccountId:string){
    return this.http.get<any>(`${this.ROOT_URL}/api/m/checks/serialNumber/suggest?bankAccountId=${bankAccountId}`);
  }

  printCheck(parameters){
    return this.http.get<any>(`${this.ROOT_URL}/api/m/checks/print/getPdf?${parameters}`);
  }

  deleteCheck(data){
     return this.http.post<any>(`${this.ROOT_URL}/api/m/checks/deleteCheck`,data);
  }
  
  voidCheck(data){
    return this.http.post<any>(`${this.ROOT_URL}/api/m/checks/voidCheck`,data);
  }

 
/**************************************Check Approval*******************************************************/
 getPendingRequestCount(){
    return this.http.get<any>(`${this.ROOT_URL}/api/m/check-approval/getPendingRequestCount`);
 }
 getPendingApprovalCheckList(){
    return this.http.get<any>(`${this.ROOT_URL}/api/m/check-approval/list`);
 }

 approveCheckForPrint(data){
    return this.http.post<any>(`${this.ROOT_URL}/api/m/check-approval/approve`,data);
 }
 rejectCheckForPrint(data){
    return this.http.post<any>(`${this.ROOT_URL}/api/m/check-approval/reject`,data);
 }


/*****************************************Check Attachments****************************************************/
 getAllCheckAttachments(checkId){
   return this.http.get<any>(`${this.ROOT_URL}/api/m/checks/${checkId}/attachments`);
 }

 addNewCheckAttachment(checkId,data){
   return this.http.post<any>(`${this.ROOT_URL}/api/m/checks/${checkId}/attachments`,data)
 }

 deleteCheckAttachment(checkId,attachmentId){
    return this.http.delete<any>(`${this.ROOT_URL}/api/m/checks/${checkId}/attachments/${attachmentId}`)
 }

 openAttachment(checkId,attachmentId){
     return this.http.get<any>(`${this.ROOT_URL}/api/m/checks/${checkId}/attachments/${attachmentId}/open`);
 }


/*****************************************Check Comments****************************************************/
 getAllCheckComments(checkId){
   return this.http.get<any>(`${this.ROOT_URL}/api/m/checks/${checkId}/comments`);
 }

 addNewCheckComment(checkId,data){
   return this.http.post<any>(`${this.ROOT_URL}/api/m/checks/${checkId}/comments`,data)
 }

/*****************************************Check Activity****************************************************/
 getCheckActivities(checkId){
  return this.http.get<any>(`${this.ROOT_URL}/api/m/checks/${checkId}/activities`); 
 }

 updateDeviceName(data){
   return this.http.post<any>(`${this.ROOT_URL}/api/m/checks/update-device-name`,data)
 }





}
