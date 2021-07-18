import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, LoadingController, NavParams } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { FormBuilder } from '@angular/forms';
import { PayeeService } from 'src/app/services/payee.service';
import { BankAccountService } from 'src/app/services/bankAccount.service';
import { CheckRequestPage } from 'src/app/pages/user-pages/check-request/check-request.page';
import { CheckRequestService } from 'src/app/services/check-request.service';
import { finalize } from 'rxjs/operators';


class Port {
  public id: number;
  public name: string;
}

@Component({
  selector: 'app-new-check-request-modal',
  templateUrl: './new-check-request-modal.component.html',
  styleUrls: ['./new-check-request-modal.component.scss'],
})


export class NewCheckRequestModalComponent implements OnInit {

  payees: Port[];
  bankAccounts:Port[];

 
  constructor(private modalCtrl: ModalController,
              private fb:FormBuilder,
              public alertController: AlertController,
              private bankAccountService: BankAccountService,
              public loadingController: LoadingController,
              private navParams: NavParams,
              private payeeService: PayeeService,
              private _checkRequestService:CheckRequestService) {} 

  checkRequestPageRef:any;
  newRequestData={
    payee        :null,
    bankAccount  :null,
    amount       :null,
    memo         :'',
    isEditable   :false,
    phone        :null,
    email        :null,
    clientEmail  :null  
  }

  requestType:any;   //1 -newRequest , 2-newRequestByPhone, 3-newRequestByEmail
  
  
  ngOnInit() {
    this.checkRequestPageRef      = this.navParams.get('ref');
    this.requestType              = this.navParams.get('requestType');
  }

  ionViewDidEnter() {
    this.getBankAccounts();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  searchPayees(event: {
    component: IonicSelectableComponent,
    text: string
     }) {
    let search = event.text;
    event.component.startSearch();
    this.payeeService.getPayeeSuggest(search).subscribe(res => {
      event.component.items = res.data.payees;
      event.component.endSearch();
    });
  }

  getBankAccounts() {
    this.bankAccountService.getBankAccounts().subscribe(bankAccounts => {
      this.bankAccounts = bankAccounts.data.bankAccounts;
    });
  }


  submitNewRequest(){

       if(this.newRequestData.payee==null){
        this.presentAlert('Please select any client')
        return;
       }
       else if(this.newRequestData.bankAccount==null){
        this.presentAlert('Please select any payable account')
        return;
       }
       else if(this.newRequestData.amount==null){
        this.presentAlert('Please enter amount')
        return;
       }
       else if(this.newRequestData.amount < 0||this.newRequestData.amount == 0){
        this.presentAlert('Amount should be greater than zero')
        return;
       }
     


    let processData ={
         payeeId       :this.newRequestData.payee!=null ? this.newRequestData.payee.id:'',
         payeeEmail    :this.newRequestData.clientEmail,
         bankAccountId :this.newRequestData.bankAccount!=null ? this.newRequestData.bankAccount.id:'',
         amount        :this.newRequestData.amount,
         memo          :this.newRequestData.memo,
         isEditable    :this.newRequestData.isEditable==true ? 1 : 0
      }

      this.presentLoading('Sending ..');
      this._checkRequestService.newCheckRequest(processData).pipe(
            finalize(() => {
                this.loadingController.dismiss();
            })).subscribe( res =>{
                this.checkRequestPageRef.loadAllRequests()
                this.dismiss();
          });

    }

    submitNewRequestByLink(requestType){

      if(this.newRequestData.bankAccount==null){
        this.presentAlert('Please select any payable account')
        return;
       }
       else if(this.newRequestData.amount==null){
        this.presentAlert('Please enter amount')
        return;
       }
       else if(requestType==2&&(this.newRequestData.phone==''||this.newRequestData.phone==null)){
        this.presentAlert('Please enter phone number')
        return;
       }
       else if(requestType==3&&(this.newRequestData.email==''||this.newRequestData.email==null)){
        this.presentAlert('Please enter Email address')
        return;
       }
       else if(this.newRequestData.amount < 0||this.newRequestData.amount == 0){
        this.presentAlert('Amount should be greater than zero')
        return;
       }

       
      let processData:any;
       processData ={
         bankAccountId :this.newRequestData.bankAccount.id,
         amount        :this.newRequestData.amount,
         memo          :this.newRequestData.memo,
     }

    //by phone
     if(requestType==2){
         processData.phone = this.newRequestData.phone;
         processData.requestType = 'phone';
     }

     //by email
     if(requestType==3){
         processData.email = this.newRequestData.email;
         processData.requestType = 'email';
     }

     this.presentLoading('Sending ..');
     this._checkRequestService.newCheckRequestByLink(processData).pipe(
           finalize(() => {
              this.loadingController.dismiss();
           })).subscribe( res =>{
               this.checkRequestPageRef.loadAllRequests()
               this.dismiss();
         });
    }

    onChangeClient(event){
      this.newRequestData.clientEmail =event.value.email;
    }

    async presentAlert(message, title = "Oops !") {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: title,
        message: message,
        buttons: ['OK']
      });
  
      await alert.present();
    }

    async presentLoading(message = "Please wait...") {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: message,
  
      });
      await loading.present();
      const { role, data } = await loading.onDidDismiss();
    }
  
 

}
