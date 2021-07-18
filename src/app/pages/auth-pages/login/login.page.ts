import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { tap, takeUntil, finalize, catchError } from 'rxjs/operators';
import { AlertController, IonInput, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Storage } from '@ionic/storage';
import { CompanyManagementService } from 'src/app/services/company-management.service';
import { UserService } from 'src/app/services/user.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  @ViewChild('password',{static: false})  passwordElement: IonInput;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public alertController: AlertController,
    private router: Router,
    private storage: Storage,
    private _companyManagementService:CompanyManagementService,
    public userService: UserService,
    private googlePlus: GooglePlus,
    private facebook: Facebook,
    public loadingController: LoadingController,
  ) { }

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

  login: any;
  loading: boolean = false;
  loginForm: FormGroup;

  ngOnInit() {
    // if( localStorage.getItem('appToken') ){
    //   this.router.navigateByUrl('/tabs/list');
    // }
    this.loginForm = this.fb.group({
      email: [null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(320) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
      ])
      ],
      password: [null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ],
      remember_me: [false,]
    });
  }

  ionViewWillEnter(){
    // if( localStorage.getItem('appToken') ){
    //   this.router.navigateByUrl('/tabs/list');
    // }
  }


  ionViewDidEnter(){
    // if( localStorage.getItem('appToken') ){
    //   this.router.navigateByUrl('/tabs/list');
    // }
  }

  redirectIfAlreadyLogin(){

  }

  afterEnterUSername(){
    this.passwordElement.setFocus();
  }

  submit() {
    const controls = this.loginForm.controls;
    /** check form */
    // if (this.loginForm.invalid) {
    //   Object.keys(controls).forEach(controlName =>
    //     controls[controlName].markAsTouched()
    //   );
    //   return;
    // }
    if (!controls['email'].value) {
      this.presentAlert("Please Enter Username");
      return;
    } else if (!controls['password'].value) {
      this.presentAlert("Please Enter Password");
      return;
    }


    this.loading = true;
    const authData = {
      email: controls['email'].value,
      password: controls['password'].value,
      // remember_me: controls['remember_me'].value,
    };


    this.authService.login(authData.email, authData.password)
      .pipe(
        tap(user => {
          // if (user) {
          // localStorage.setItem('activeCompanyID', 'onlineCheckWriter');

        }, error => {
          console.log("TAPERR", error);
        }),
        finalize(() => {
          // this.loading = false;
        }), catchError(err => {
          this.loading = false;
          return of(false);
        })
      )
      .subscribe(res => {
        if (res) {
         
          let token = res.access_token;
          localStorage.setItem("appToken", token);
          localStorage.setItem("userName", res.name);
          this.authService.userName = res.name;
          //  this.storage.set('appToken', token).then(res => {
          //     this.storage.set('userName', res.name);
          //     this.storage.get('appToken').then((val) => {
          //       // console.log('Your Token is', val);
          //     });
          //  });

             /**********************Set user verification details******************* */
             if(res.isVerified==true){
              localStorage.setItem("verified", 'true');
             }



             /**************************Redirect user basis of number of companies ***************************/
             if(res.companies.totalCompanies > 0){
                  this.router.navigateByUrl('/company-switch');
                  return;
              }
              else if(res.companies.totalCompanies==0){
                    localStorage.setItem("activeCompanyName", res.companies.parentCompanyName);
                    localStorage.setItem("activeCompanyId",   res.companies.parentComapnyId);
                    localStorage.setItem("activeCompanyType",'owncmp');
                    this.router.navigateByUrl('/tabs/list');
                    return;
              }
         
              /****************Redirect user after login on the basis of his default company information(old version)*********************/
             if(res.companyInfo.companyName==''||res.companyInfo.companyName==null||res.companyInfo.companyName=='null'){
                this.router.navigateByUrl('/company-switch');
                return;
             }

            if(res.companyInfo.parentOnly||(res.companyInfo.isItDefault==1))
            {
              localStorage.setItem("activeCompanyName", res.companyInfo.companyName);
              localStorage.setItem("activeCompanyId", res.companyInfo.companyId);
              
              if(res.companyInfo.isOwnCompany){
                localStorage.setItem("activeCompanyType",'owncmp');
              }
              else{
                localStorage.setItem("activeCompanyType",'invcomp');
              }

              this.router.navigateByUrl('/tabs/list');
            }
            else{
              this.router.navigateByUrl('/company-switch');
            }
           /******************************************************************************************************** */

        }
      });

  }

  getUserVerificationStatus(){
    this.userService.getUserVerificationStatus().subscribe( res =>{
      if(res.data.emailVerified&&res.data.phoneVerified){
        this.userService.userVerified = true;
        localStorage.setItem("verified", 'true');
      }
      
   });
}

// googleData:any;
// facebookData:any;

// googleLogin(){
//   this.googlePlus.login({})
//   .then(res =>{ 
//        this.loadingController.dismiss();
//        if(res.accessToken){
//             let socialLoginData = {
//               'provider'  :'google',
//               'name'      :res.displayName,
//               'email'     :res.email
//             }

//             this.socialLogin(socialLoginData);
//        }
//   })
//   .catch(err => {
//     this.presentAlert('Login Failed..');
//   });
// }

// facebookLogin(){
//   this.facebook.login(['public_profile', 'user_friends', 'email'])
//   .then((res: FacebookLoginResponse) => {

//     if(res.status=='connected'){

//           this.presentLoading();
//           this.facebook.api(+res.authResponse.userID+'?fields=id,name,email,first_name',['public_profile']).then(res =>{
//                this.loadingController.dismiss();
//                let socialLoginData = {
//                     'provider'  :'facebook',
//                     'name'      :res.name,
//                     'email'     :res.email
//                 }
//               this.socialLogin(socialLoginData);
//         }).catch(e =>{ 
//             this.loadingController.dismiss();
//             this.presentAlert('Login Failed..');
//          });
//     }
//     else{
//        this.presentAlert('Login Failed..');
//     }  
//   })
//   .catch(e =>{ 
//           this.presentAlert('Login Failed..');
//    });

// }


// twitterLogin(){

// }

// linkedInLogin(){

// // this.linkedin.login(['r_basicprofile'], true)
// //   .then(res =>{
// //     this.presentAlert(JSON.stringify(res))
// //   })
// //   .catch(e => {
// //     this.presentAlert(JSON.stringify(e))
// //    });

// }

// socialLogin(data){
//   this.presentLoading()
//   this.authService.socialLogin(data).pipe(
//     tap(user => {
//     }),
//     finalize(() => {
//       this.loadingController.dismiss();
//     }), 
//     catchError(err => {
//       return of(false);
//     })
//   ).subscribe(res => {
//     if(res){
//           let token                 = res.access_token;
//           this.authService.userName =res.name;
//           localStorage.setItem("appToken", token);
//           localStorage.setItem("userName", res.name);

//           if(res.isNewUser){   // new signup
//             if(res.companyInfo){
//                 localStorage.setItem("activeCompanyName", res.companyInfo.companyName);
//                 localStorage.setItem("activeCompanyId", res.companyInfo.companyId);
//                 localStorage.setItem("activeCompanyType",'owncmp');
//                 this.router.navigateByUrl('/tabs/check-model');
//               }
//               else
//               {
//                 this.router.navigateByUrl('/company-switch');
//               }
//           }
//           else{   //already signup user

//                 /**********************Set user verification details******************* */
//                 if(res.isVerified==true){
//                    localStorage.setItem("verified", 'true');
//                 }
//                 /**************************Redirect user basis on number of companies ***************************/
//                 if(res.companies.totalCompanies > 0){
//                       this.router.navigateByUrl('/company-switch');
//                       return;
//                 }
//                 else if(res.companies.totalCompanies==0){
//                         localStorage.setItem("activeCompanyName", res.companies.parentCompanyName);
//                         localStorage.setItem("activeCompanyId",   res.companies.parentComapnyId);
//                         localStorage.setItem("activeCompanyType",'owncmp');
//                         this.router.navigateByUrl('/tabs/list');
//                         return;
//                }
//           }
//     }
  


//   });
  

// }

async presentLoading(message = "Please wait...") {
  const loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: message,

  });
  await loading.present();

  const { role, data } = await loading.onDidDismiss();
  console.log('Loading dismissed!');
}



}
