import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-verification-phone',
  templateUrl: './user-verification-phone.page.html',
  styleUrls: ['./user-verification-phone.page.scss'],
})
export class UserVerificationPhonePage implements OnInit {

  constructor(public _authService:AuthService,
    private _userService:UserService,
    private router:Router,
    public loadingController: LoadingController,private alertController:AlertController) { }
    phone:any;
    showPhoneInput:boolean=true;
    showOtpInput:boolean=false;
    otp: any =  {
      first: '',
      second: '',
      third: '',
      forth: '',
      fifth: '',
    };

  ngOnInit() {
   
  }

  ionViewDidEnter(){
    this.phone = history.state.phone; //coming from email verification page
    this.loadVerificationStatus()
  }

  sendPhoneVerificationCode(){

    if(!this.validatePhone(this.phone)){
      this.presentAlert('Please enter valid phone number','Oops')
      return false;
    }

    let data ={
      phone : this.phone
    }
    this.presentLoading();
    this._userService.sendPhoneVerificationCode(data).pipe(finalize(() => { this.loadingController.dismiss()  })).subscribe( res =>{
          if(res.success){
              this.showPhoneInput =false;
              this.showOtpInput =true;
          }
     });
  }


  async presentLoading(message ='Please wait...') {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: message,
    
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  otpController(event,next,prev){
    if(event.target.value.length < 1 && prev){
      prev.setFocus()
    }
    else if(next && event.target.value.length>0){
      next.setFocus();
    }
    else {
     return 0;
    } 
  }

  confirmPhoneVerification(){
    let verification_code = this.otp.first+this.otp.second+this.otp.third+this.otp.forth+this.otp.fifth;
    let data ={
      phone:this.phone,
      verification_code:verification_code
    }

    this.presentLoading();
    this._userService.confirmPhoneVerifcation(data).pipe(finalize(() => { this.loadingController.dismiss()  })).subscribe( res =>{
      this.showOtpInput=false;
      this.otp =  {
        first: '',
        second: '',
        third: '',
        forth: '',
        fifth: '',
      };
      if(res.success){
          this.presentAlert('Succesfully verified')
          this._userService.setUserAsVerified();
          this.router.navigateByUrl('/tabs/list')
      }
 });
  }

  loadVerificationStatus(){
    this._userService.getUserVerificationStatus().pipe(finalize(() => {   })).subscribe( res =>{
      this.phone = res.data.phone
      if(!res.data.emailVerified){
        this.router.navigateByUrl('/user-verification-email')
      }
      else if(res.data.phoneVerified&&res.data.emailVerified){
        this._userService.setUserAsVerified();
        this.router.navigateByUrl('/tabs/list')
      }

     });
  }

  async presentAlert(message, title = "") {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  validatePhone(phone) {
		//  var re= /^[0]?[789]\d{9}$/;
		var re = /^[0-9]*$/
		if (re.test(phone) == false || phone == '') {
			return false;
		}
		else {
			return true;
		}
  }


  resendCode(){

    let data ={
      phone : this.phone
    }
    this._userService.sendPhoneVerificationCode(data).pipe(finalize(() => {  })).subscribe( res =>{
      
     });
  }

  

}
