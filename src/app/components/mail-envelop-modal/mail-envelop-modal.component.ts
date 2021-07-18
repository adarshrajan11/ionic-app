import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, NavParams, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MailCheckService } from 'src/app/services/mail-check.service';
import { finalize, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-mail-envelop-modal',
  templateUrl: './mail-envelop-modal.component.html',
  styleUrls: ['./mail-envelop-modal.component.scss'],
})
export class MailEnvelopModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController,
    private fb:FormBuilder,
    public alertController: AlertController,
    public _mailCheckService:MailCheckService,
    public loadingController: LoadingController,
    private navParams: NavParams) { }


customFromAddressForm:FormGroup
ref:any;
isEdit:boolean=false;
addressId:any;

  ngOnInit() {
    this.initCustomFromAddresssForm();
    this.ref      = this.navParams.get('ref');
    this.isEdit   = this.navParams.get('isEdit');
    this.addressId= this.navParams.get('id');

    if(this.isEdit){
      this.showCustomFromAddress(this.addressId)
    }
    
  }

  ionViewDidEnter(){
  }


  dismiss() {
    this.modalCtrl.dismiss();
  }

  initCustomFromAddresssForm(){
    this.customFromAddressForm =this.fb.group({
          name         : ['',Validators.compose([Validators.required, Validators.minLength(3)])],
          companyName:null,
          addressLine1:['',Validators.required],
          addressLine2:null,
          city        :['',Validators.required],
          state       :['',Validators.required],
          zip         :['',Validators.required],
          phone       :null,
          email       :null,
          note        :null,
    })
  }

  showCustomFromAddress(id){
    this._mailCheckService.showCustomFromAddress(id).subscribe(res =>{
      this.setAddressValue(res.data);
    })
  }
  setAddressValue(data){
    this.customFromAddressForm.patchValue({
      name         :data.name,
      companyName  :data.companyName,
      addressLine1 :data.addressLine1,
      addressLine2 :data.addressLine2,
      city         :data.city,
      state        :data.state,
      zip          :data.zip,
      phone        :data.phone,
      email        :data.email,
      note         :data.note
    });

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

  
  validateAddressData(){

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


  onSubmitCustomFromAddress(){

    if(!this.validateAddressData()){
      return;
    }
    const data = this.customFromAddressForm.value;
    this.presentLoading();
    this._mailCheckService.addNewCustomFromAddress(data).pipe(
      finalize(() => {
        this.loadingController.dismiss();
      }),
      catchError(err => {
      return of(false);
      })).subscribe( res =>{
         this.ref.customFromAddressList.push({
           id  :res.data.id,
           name:res.data.name
         })
         this.ref.mailCheckProcessData.customFromAddress = res.data.id
         this.dismiss();
      })
  }

  onUpdateCustomFromAddress(){

    if(!this.validateAddressData()){
      return;
    }
    const data = this.customFromAddressForm.value;
    data.id = this.addressId;
    this.presentLoading();
    this._mailCheckService.updateCustomFromAddress(data).pipe(
      finalize(() => {
        this.loadingController.dismiss();
      }),
      catchError(err => {
      return of(false);
      })).subscribe( res =>{
        
        this.ref.customFromAddressList.filter(el =>{
          if(el.id==this.addressId){
             el.name = res.data.name
          }
        })
         this.dismiss();
      })

  }

  isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.customFromAddressForm.controls[controlName];
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

}
