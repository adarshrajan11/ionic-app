import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, LoadingController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MailCheckService } from 'src/app/services/mail-check.service';
import { finalize, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { BankAccountService } from 'src/app/services/bankAccount.service';
import { BankUpdateModalComponent } from '../bank-update-modal/bank-update-modal.component';

@Component({
  selector: 'app-bank-account-update-modal',
  templateUrl: './bank-account-update-modal.component.html',
  styleUrls: ['./bank-account-update-modal.component.scss'],
})
export class BankAccountUpdateModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController,
    private fb:FormBuilder,
    public alertController: AlertController,
    public _mailCheckService:MailCheckService,
    public _bankAccountService:BankAccountService,
    public loadingController: LoadingController,
    private navParams: NavParams) { }



ref:any;
bankAccountForm:FormGroup
bankAccountId:any;
banks:any=[];
bankAccountDetails:any={
    hasTemplate:true
};
logoImage: any;
logoImageName: any;
signatureImage: any;
signatureImageName: any;


  ngOnInit() {
 
    this.initBankAccountForm();
    this.ref      = this.navParams.get('ref');
    this.bankAccountId   = this.navParams.get('bankAccountId');
    this.getAllBanks();
    
  }



  ionViewDidEnter(){
  }


  dismiss() {
    this.modalCtrl.dismiss();
  }

  getAllBanks(){
    this._bankAccountService.getAllBanks().pipe(finalize(() => {})).subscribe( res =>{
        this.banks = res.data;
        this.getBankAccountDetail(this.bankAccountId);
     });
  }

  getBankAccountDetail(bankAccountId){
    this._bankAccountService.showBankAccount(bankAccountId).pipe(finalize(() => {})).subscribe( res =>{
      this.bankAccountDetails = res.data;
      this.setBankAccountFormValue(res.data)
   });
  }

  initBankAccountForm(){
    this.bankAccountForm =this.fb.group({
          id                      :['',Validators.required],
          bankId                  :['',Validators.required],
          bankAccountName         :['',Validators.required],
          bankAccountNickName     :['',Validators.required],
          bankAccountNumber       :['',Validators.required],
          bankAccountAddressLine1 :['',Validators.required],
          bankAccountAddressLine2 :[''],
          bankAccountCity         :['',Validators.required],
          bankAccountState        :['',Validators.required],
          bankAccountZip          :['',Validators.required],
          bankAccountPhone        :['',Validators.pattern('[^a-z]*'),],
    })

  }

  setBankAccountFormValue(data){
    this.bankAccountForm.patchValue({
      id                     :this.bankAccountId,
      bankId                 :data.bankId,
      bankAccountName        :data.bankAccountName!=null ?data.bankAccountName:'',
      bankAccountNickName    :data.bankAccountNickName!=null?data.bankAccountNickName:'',
      bankAccountNumber      :data.bankAccountNumber!=null?data.bankAccountNumber:'',
      bankAccountAddressLine1:data.bankAccountAddressLine1!=null?data.bankAccountAddressLine1:'',
      bankAccountAddressLine2:data.bankAccountAddressLine2 !=null ? data.bankAccountAddressLine2 :'',
      bankAccountCity        :data.bankAccountCity!=null?data.bankAccountCity:'',
      bankAccountState       :data.bankAccountState!=null ?data.bankAccountState :'' ,
      bankAccountZip         :data.bankAccountZip !=null ? data.bankAccountZip :'',
      bankAccountPhone       :data.bankAccountPhone!=null ? data.bankAccountPhone:''
    });

  }

  updateBankAccount(){
    let data = this.processFormData();
    this.presentLoading();
    this._bankAccountService.updateBankAccount(data).pipe(
      finalize(() => {
        this.loadingController.dismiss();
      }),
      catchError(err => {
      return of(false);
      })).subscribe( res =>{
        if(res){
          this.ref.loadBankAccounts();
          this.dismiss();
        }
      })
  }

  processFormData() {
    let data = this.bankAccountForm.value;
    let formData = new FormData();
		if (this.signatureImage) {
			formData.append('signatureImage', this.signatureImage, this.signatureImageName);
    }
    if (this.logoImage) {
			formData.append('logoImage', this.logoImage, this.logoImageName);
    }
    formData.append('id', data.id);
    formData.append('bankId', data.bankId);
    formData.append('bankAccountName', data.bankAccountName);
    formData.append('bankAccountNickName', data.bankAccountNickName);
    formData.append('bankAccountNumber', data.bankAccountNumber);
    formData.append('bankAccountAddressLine1', data.bankAccountAddressLine1);
    formData.append('bankAccountAddressLine2', data.bankAccountAddressLine2);
    formData.append('bankAccountCity', data.bankAccountCity);
    formData.append('bankAccountState', data.bankAccountState);
    formData.append('bankAccountZip', data.bankAccountZip);
    formData.append('bankAccountPhone', data.bankAccountPhone);
    return formData;
  }

  onSignatureChange(event) {
   
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      this.signatureImage = event.target.files[0];
      this.signatureImageName = event.target.files[0].name;
    }
  }

  onLogoChange(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      this.logoImage = event.target.files[0];
      this.logoImageName = event.target.files[0].name;
    }
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

  
  validateBankAccountData(){

    if(this.isControlHasError('name','required')){
      this.presentAlert('Please enter name')
      return false
    }
    else if(this.isControlHasError('addressLine1','required')){
      this.presentAlert('Please enter address line 1')
      return false
   }
    else if(this.isControlHasError('city','required')){
      this.presentAlert('Please enter city')
      return false
    }
    else if(this.isControlHasError('state','required')){
      this.presentAlert('Please enter state')
      return false
    }
    else if(this.isControlHasError('zip','required')){
      this.presentAlert('Please enter zip')
      return false
    }

    return true;
 }



  isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.bankAccountForm.controls[controlName];
		if (!control) {
			return false;
		}
		const result = control.hasError(validationType);
		return result;
  }
  
  async presentLoading(message ='Please wait...') {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: message,
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

   
  async openBankUpdateModal(bankId) {
    const modal = await this.modalCtrl.create({
      component: BankUpdateModalComponent,
      componentProps:{
        ref:this,
        bankId:bankId
      }
    });
    return await modal.present();
  }

}
