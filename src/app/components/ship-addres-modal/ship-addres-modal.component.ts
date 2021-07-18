import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, NavParams, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MailCheckService } from 'src/app/services/mail-check.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { RegisterPageRoutingModule } from 'src/app/pages/auth-pages/register/register-routing.module';


@Component({
  selector: 'app-ship-addres-modal',
  templateUrl: './ship-addres-modal.component.html',
  styleUrls: ['./ship-addres-modal.component.scss'],
})
export class ShipAddresModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController,
              private fb:FormBuilder,
              public alertController: AlertController,
              public _mailCheckService:MailCheckService,
              public loadingController: LoadingController,
              private navParams: NavParams) { }


  customAddressForm:FormGroup
  ref:any;
  isEdit:boolean=false;
  addressId:any;

  ngOnInit() {
    this.initCustomAddresssForm();
    this.ref      = this.navParams.get('ref');
    this.isEdit   = this.navParams.get('isEdit');
    this.addressId= this.navParams.get('id');

    if(this.isEdit){
      this.showCustomToAddress(this.addressId)
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  ionViewDidEnter(){
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


  initCustomAddresssForm(){
    this.customAddressForm =this.fb.group({
        name         : ['',Validators.compose([
                         Validators.required,
                         Validators.minLength(3)
                     ])],
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


  onSubmitCustomAddress(){
   
      if(!this.validateAddressData()){
        return;
      }

    const data = this.customAddressForm.value;
    this.presentLoading();
    this._mailCheckService.addNewCustomToAddress(data).pipe(
      finalize(() => {
        this.loadingController.dismiss();
      }),
      ).subscribe( res =>{
        if(res){
          this.ref.customToAddressList.push({
            id  :res.data.id,
            name:res.data.name
          })
          this.ref.mailCheckProcessData.customToAddress = res.data.id
          this.dismiss();
        }
         
      })
  }

  // only use on edit mode
  showCustomToAddress(id){
       this._mailCheckService.showCustomToAddress(id).subscribe(res =>{
         this.setAddressValue(res.data);
       })
  }

  setAddressValue(data){
    this.customAddressForm.patchValue({
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

  onUpdateCustomAddress()
  {
    if(!this.validateAddressData()){
      return;
    }

    let data    = this.customAddressForm.value;
        data.id = this.addressId;
    this.presentLoading();
    this._mailCheckService.updateCustomToAddress(data).pipe(
      finalize(() => {
        this.loadingController.dismiss();
      }),
      catchError(err => {
      return of(false);
      })).subscribe( res =>{
        if(res){
              this.ref.customToAddressList.filter(el =>{
                if(el.id==this.addressId){
                  el.name = res.data.name
                }
            })
            this.ref.cdr.markForCheck();
            this.dismiss();
        }
        
      })
  }

  isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.customAddressForm.controls[controlName];
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
