import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, LoadingController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankAccountService } from 'src/app/services/bankAccount.service';
import { finalize, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-bank-update-modal',
  templateUrl: './bank-update-modal.component.html',
  styleUrls: ['./bank-update-modal.component.scss'],
})
export class BankUpdateModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController,
    private fb:FormBuilder ,
    public alertController: AlertController,
    public _bankAccountService:BankAccountService,
    public loadingController: LoadingController,
    private navParams: NavParams) { }

ref:any;   //BankAccountUpdateModalComponent ref
bankForm:FormGroup
bankId:any;


  ngOnInit() {
    this.initBankForm();
    this.ref             = this.navParams.get('ref');
    this.bankId          = this.navParams.get('bankId');
    this.getBankDetail(this.bankId)
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  initBankForm(){
    this.bankForm =this.fb.group({
          bankName                :['',Validators.required],
          bankRoutingNumber       :['', Validators.compose([
                                      Validators.required,
                                      Validators.minLength(9),
                                      Validators.maxLength(9)
                                    ])],
          bankIdentity            :[],
          bankCity                :[],
          bankState               :[],
          bankZip                 :[]
     })
  }

  getBankDetail(bankId){
    this._bankAccountService.showBank(bankId).pipe(finalize(() => {})).subscribe( res =>{
      this.setBankFormValue(res.data)
   });
  }

  setBankFormValue(data){
    this.bankForm.patchValue({
      bankName               :data.bankName!=null ?data.bankName:'',
      bankRoutingNumber      :data.bankRoutingNumber!=null?data.bankRoutingNumber:'',
      bankIdentity           :data.bankIdentity!=null?data.bankIdentity:'',
      bankCity               :data.bankCity!=null?data.bankCity:'',
      bankState              :data.bankState !=null ? data.bankState :'',
      bankZip                :data.bankZip!=null?data.bankZip:'',
   })
  }

  updateBank(){
    let data;
     data = this.bankForm.value;
     data.bankId = this.bankId;
     this.presentLoading('Updating..');
    this._bankAccountService.updateBank(data).pipe(
      finalize(() => {
        this.loadingController.dismiss();
      }),
      catchError(err => {
      return of(false);
      })).subscribe( res =>{

        if(res){
          this._bankAccountService.getAllBanks().pipe(finalize(() => {})).subscribe( res =>{
            this.ref.banks = res.data;
         });

          this.dismiss();
        }

      })
  }


  async presentLoading(message ='Please wait...') {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: message,
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  
onKeyPressRoutingNumber(event): boolean {

  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
 
   if(this.bankForm.value.bankRoutingNumber.length==9){
     return false;
   }

  return true;
}




}
