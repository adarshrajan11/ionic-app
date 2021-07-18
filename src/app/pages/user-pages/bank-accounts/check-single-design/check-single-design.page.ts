import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BankAccountService } from '../../../../services/bankAccount.service';
import { tap, finalize, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-check-single-design',
  templateUrl: './check-single-design.page.html',
  styleUrls: ['./check-single-design.page.scss'],
})
export class CheckSingleDesignPage implements OnInit {

  constructor(
    private fb: FormBuilder,
    private bankAccountService: BankAccountService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  bankAccountForm: FormGroup;
  loading: boolean = false;
  routingNumberLoading:boolean=false;

  logoImage: any;
  logoImageName: any;
  signatureImage: any;
  signatureImageName: any;

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Saving...',
      // duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }


  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Oops !',
      // subHeader: 'Subtitle',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  

  ngOnInit() {
    this.initbankAccountForm();
  }

  initbankAccountForm() {
    this.bankAccountForm = this.fb.group({
      nickName: [''],
      name: ['', Validators.compose([
        Validators.required,
        // Validators.minLength(3),
        Validators.maxLength(255)
      ])],
      address: ['', Validators.compose([
        // Validators.required,
        // Validators.minLength(3),
        Validators.maxLength(255)
      ])],
      city: [''],
      state: [''],
      zip: [''],
      phone: [''],
      email: [''],
      bankName: ['', Validators.compose([
        Validators.required,
        // Validators.minLength(3),
        Validators.maxLength(255)
      ])],
      extraLine: [''],
      bankStreetAddress: [''],
      bankCity: [''],
      bankState: [''],
      bankZip: [''],
      checkNumber: ['', Validators.compose([
        Validators.required,
        // Validators.minLength(3),
        Validators.maxLength(255)
      ])],
      fractionalNumber: [''],
      routingNumber: ['', Validators.compose([
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9)
      ])],
      accountNumber: ['', Validators.compose([
        Validators.required,
        // Validators.minLength(10),
        // Validators.maxLength(12)
      ])],
      signatureImage: [null],
      logoImage: [null]
    });
  }

  save() {
    this.presentLoading()
    this.loading = true;
    const controls = this.bankAccountForm.controls;
    let data = this.processFormData(controls);
    this.bankAccountService.save(data).pipe(
      tap(res => {
        let message = "Bank Account Sucessfully Added"
        // this.router.navigate(['page/bank-account']);
        // this.advacedCheckDesignChoice(res.data.account_id)
      }),
      finalize(() => {
        this.loading = false;
        this.loadingController.dismiss();
      }), catchError(err => {
        this.loading = false;
        // this.presentAlert(err.error.errorMsg);
        // let message = "Oops! Something went wrong"
        return of(false);
      }),
    ).subscribe(res => {
      if (res) {
        this.bankAccountForm.reset();
        this.router.navigateByUrl('/tabs/bank-account');
      }
    })

    console.log('Processed Form Data : ', this.processFormData(controls));
    // console.log("FORM GROUP", this.checkDesignForm);
    // console.log("FORM CONTROL", controls);
  }

  // processFormData(controls) {
  //   let data = {
  //     bankAccountName: controls.name.value,
  //     bankAccountAddressLine1: controls.address.value,
  //     bankAccountCity: controls.city.value,
  //     bankAccountState: controls.state.value,
  //     bankAccountZip: controls.zip.value,
  //     bankAccountAddressLine2: controls.phone.value,
  //     // bank_account_email: controls.email.value,
  //     bankName: controls.bankName.value,
  //     BankAddress1: controls.bankStreetAddress.value,
  //     bankCity: controls.bankCity.value,
  //     bankState: controls.bankState.value,
  //     bankZip: controls.bankZip.value,
  //     checkSerialNumber: controls.checkNumber.value,
  //     bankIdentity: controls.fractionalNumber.value,  //Fractional Number
  //     bankRoutingNumber: controls.routingNumber.value.toString(),
  //     bankAccountNumber: controls.accountNumber.value,

  //     bankAccountNickName: controls.name.value,

  //     signatureImage: controls.signatureImage.value,
  //     logoImage: '',

  //     // logo_url: this.selectedLogoUrl,
  //     // signature_url: this.slectedSignatureUrl,

  //   }

  processFormData(controls) {

    let data = this.bankAccountForm.value;
    let formData = new FormData();

		if (this.signatureImage) {
			formData.append('signatureImage', this.signatureImage, this.signatureImageName);
			console.log(formData);
    }

    if (this.logoImage) {
			formData.append('logoImage', this.logoImage, this.logoImageName);
			console.log(formData);
    }

    formData.append('bankAccountName', data.name);
    formData.append('bankAccountAddressLine1', data.address);
    formData.append('bankAccountCity', data.city);
    formData.append('bankAccountState', data.state);
    formData.append('bankAccountZip', data.zip);
    formData.append('bankAccountPhone', data.phone);
    formData.append('bankName', data.bankName);
    formData.append('BankAddress1', data.bankStreetAddress);
    formData.append('bankCity', data.bankCity);
    formData.append('bankState', data.bankState);
    formData.append('bankZip', data.bankZip);
    formData.append('checkSerialNumber', data.checkNumber);
    formData.append('bankIdentity', data.fractionalNumber);
    formData.append('bankRoutingNumber', data.routingNumber);
    formData.append('bankAccountNumber', data.accountNumber);
    formData.append('bankAccountNickName', data.nickName);
    // console.log("Inside",formData);
    
    return formData;
  }

  onSignatureChange(event) {
    console.log("Signature Change Triggered");

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      // reader.onload = e => {
      //   // this.profilePhotoUrl = reader.result;
      // }
      reader.readAsDataURL(file);
      console.log(event.target.files[0]);
      this.signatureImage = event.target.files[0];
      this.signatureImageName = event.target.files[0].name;
    }
  }

  onLogoChange(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      // reader.onload = e => {
      //   // this.profilePhotoUrl = reader.result;
      // }
      reader.readAsDataURL(file);
      console.log(event.target.files[0]);
      this.logoImage = event.target.files[0];
      this.logoImageName = event.target.files[0].name;
    }
  }

getBankNameFromRoutingNumber(){
   if(this.bankAccountForm.value.routingNumber.length!=9){
     return;
   }
    this.routingNumberLoading=true;
    this.bankAccountService.getBankDetailsFromRoutingNumber(this.bankAccountForm.value.routingNumber).pipe(finalize(() => { this.routingNumberLoading=false; })).subscribe( res =>{
     
        this.bankAccountForm.patchValue({
          bankName         :res.customer_name,
          bankStreetAddress:res.address,
          bankZip          :res.zip,
          bankCity         :res.city,
          bankState        :res.state
       })
                  
});
}

onKeyPressRoutingNumber(event): boolean {

  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }

   if(this.bankAccountForm.value.routingNumber.length==9)
   {
      return false;
   }
 
      this.getBankNameFromRoutingNumber();
      return true;
}

}
