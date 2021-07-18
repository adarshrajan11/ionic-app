import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/services/user.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.page.html',
  styleUrls: ['./user-verification.page.scss'],
})
export class UserVerificationPage implements OnInit {

  constructor(public _authService:AuthService,
              private _userService:UserService,
              private router:Router,
              public loadingController: LoadingController,private alertController:AlertController) { }

   userVerificationStatus:any;  
   email:any;
   showEmailInput:boolean=false;
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
      this.loadVerificationStatus();
  }

  loadVerificationStatus(){
    this.presentLoading();
    this._userService.getUserVerificationStatus().pipe(finalize(() => {  this.loadingController.dismiss() })).subscribe( res =>{
      this.loadingController.dismiss()
      this.userVerificationStatus  =res.data;
      this.email = this.userVerificationStatus.email

      if(this.userVerificationStatus.emailVerified){
          if(this.userVerificationStatus.phoneVerified){
            this._userService.setUserAsVerified();
            this.router.navigateByUrl('/tabs/list')
          }else{
            this.router.navigateByUrl('/user-verification-phone',{ state: { phone: this.userVerificationStatus.phone }})
          }    
      }
      else{
            this.showEmailInput =true;
      }
    
     
     });
  }

  sendEmailVerificationCode(){

     if(!this.validateEmail(this.email)){
        this.presentAlert('Please enter valid email address','Oops')
        return false;
     }


    let data ={
      email:this.email
    }
    this.presentLoading();
    this._userService.sendEmailVerificationCode(data).pipe(finalize(() => { this.loadingController.dismiss()  })).subscribe( res =>{
          if(res.success){
              this.showEmailInput =false;
              this.showOtpInput =true;
          }
     });
  }

  confirmEmailVerification(){
    let verification_code = this.otp.first+this.otp.second+this.otp.third+this.otp.forth+this.otp.fifth;
    let data ={
      email:this.email,
      verification_code:verification_code
    }

    this.presentLoading();
    this._userService.confirmEmailVerification(data).pipe(finalize(() => { this.loadingController.dismiss()  })).subscribe( res =>{
      this.showOtpInput =false;
      this.showOtpInput =false;
      this.otp =  {
        first: '',
        second: '',
        third: '',
        forth: '',
        fifth: '',
      };

      if(res.success){
           this.router.navigateByUrl('/user-verification-phone',{ state: { phone: this.userVerificationStatus.phone }})
      }
 });
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

  async presentLoading(message ='Please wait...') {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: message,
    
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

 
  validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (re.test(String(email).toLowerCase()) == false) {
			return false;
		}
		else {
			return true;
		}
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

  resendCode(){

    let data ={
      email:this.email
    }
    this._userService.sendEmailVerificationCode(data).pipe(finalize(() => {  })).subscribe( res =>{
      
     })
  }
}
