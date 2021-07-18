import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController, LoadingController, AlertController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { PayeeService } from 'src/app/services/payee.service';
import { BankAccountService } from 'src/app/services/bankAccount.service';
import { CheckRequestService } from 'src/app/services/check-request.service';
import { CheckCategoryService } from 'src/app/services/check-category.service';
import { finalize } from 'rxjs/operators';
import { stringify } from 'querystring';
import { CheckService } from 'src/app/services/check.service';


class Port {
  public id: number;
  public name: string;
}

@Component({
  selector: 'app-approve-check-request-modal',
  templateUrl: './approve-check-request-modal.component.html',
  styleUrls: ['./approve-check-request-modal.component.scss'],
})
export class ApproveCheckRequestModalComponent implements OnInit {

 
  constructor(private modalCtrl: ModalController,
              private navParams: NavParams,
              private checkService: CheckService,
              public popoverController: PopoverController,
              private _bankAccountService: BankAccountService,
              private _payeeService: PayeeService,
              private _checkRequestService:CheckRequestService,
              private _checkCategoryService: CheckCategoryService,
              public loadingController: LoadingController,
              public alertController: AlertController,
           ){ }

  receivedCheckRequestPageRef :any; 
  payToName:any;
  requestId:any;
  bankAccounts:any[];
  categories:any[];
  approvalProcessData={
     bankAccount   :null,
     amount        :null,
     memo          :null,
     checkSerialNo :null,
     checkIssueDate:new Date().toISOString(),
     accountNo     :null,
     invoiceNo     :null,
     note          :null,
     category      :null,
     isEditable    :false,
     payToName     :''

  }

  ngOnInit() {
    this.getBankAccounts();
    this.requestId                   = this.navParams.get('requestId');
    this.receivedCheckRequestPageRef = this.navParams.get('ref');
  }

  
  getBankAccounts() {
    this._bankAccountService.getBankAccounts().subscribe(bankAccounts => {
      this.bankAccounts = bankAccounts.data.bankAccounts;
    });
  }

  ionViewDidEnter(){
    this.getReceivedCheckRequestData();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  onSearchCategory(event: {
    component: IonicSelectableComponent,
    text: string
    }){
        let portName = event.text;
        event.component.startSearch();
        this._checkCategoryService.get(portName).subscribe(ports => {
          event.component.items = ports.data.categories;
          event.component.endSearch();
        });
  }

  getReceivedCheckRequestData(){
    this.presentLoading();
    this._checkRequestService.showReceivedCheckRequest(this.requestId).pipe(
      finalize(() => {
        this.loadingController.dismiss();
      })).subscribe( res =>{
         this.setRequestData(res.data)
    });
  }


  setRequestData(data){
    this.approvalProcessData.payToName = data.payToName;
    this.approvalProcessData.amount    = data.amount;
    this.approvalProcessData.memo      = data.memo;
    this.approvalProcessData.isEditable=data.isEditable==1 ? true :false;
  }

  submitApproval(){

     if(this.approvalProcessData.bankAccount==null){
       this.presentAlert('Please select one bank account');
       return;
     }
     
     let processData ={
      bankAccount   :this.approvalProcessData.bankAccount!=null ? this.approvalProcessData.bankAccount.id:'',
      amount        :this.approvalProcessData.amount,
      memo          :this.approvalProcessData.memo,
      checkSerialNo :this.approvalProcessData.checkSerialNo,
      checkIssueDate:this.approvalProcessData.checkIssueDate,
      accountNo     :this.approvalProcessData.accountNo,
      invoiceNo     :this.approvalProcessData.invoiceNo,
      note          :this.approvalProcessData.note,
      category      :this.approvalProcessData.category!=null ? this.approvalProcessData.category.id:'',
     }
     
     this.presentLoading();
     this._checkRequestService.approveCheckRequest(this.requestId,processData).pipe(
      finalize(() => {
         this.loadingController.dismiss();
      })).subscribe( res =>{
         this.receivedCheckRequestPageRef.loadAllRequests();
         this.dismiss();
    });

  }

  onChangeBankAccount(event) {
    this.checkService.getCheckSerialNumber(event.value.id).subscribe(res => {
      this.approvalProcessData.checkSerialNo =res.data.checkSerialNo;
    });
  }

  async presentLoading(message = "Loading data...") {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: message,

    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
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

  



  
}
