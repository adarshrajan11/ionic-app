import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../auth/models/user.model';
import { tap, takeUntil, finalize, catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  loading = false;
  btnEnable: boolean = false;

  constructor(private router: Router, private auth: AuthService, private fb: FormBuilder, public alertController: AlertController) { }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Oops !',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  login: any;

  ngOnInit() {
    // console.log("INIT");
    this.initRegisterForm();
  }

  ionViewWillEnter() {
    // console.log("ASDFASDFSADF");
    // this.initRegisterForm();
  }

  initRegisterForm() {
    this.registerForm = this.fb.group({
      name: ['',
        // Validators.compose([
        //   Validators.required,
        //   Validators.minLength(3),
        //   Validators.maxLength(100)
        // ])
      ],
      username: ['',
        // Validators.compose([
        //   Validators.required,
        //   Validators.email,
        //   Validators.minLength(3),
        //   // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        //   Validators.maxLength(320)
        // ]),
      ],
      password: ['',
        // Validators.compose([
        //   Validators.required,
        //   Validators.minLength(6),
        //   Validators.maxLength(100),
        //   Validators.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])")),
        //   // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}').
        // ])
      ],
      confirmPassword: ['',
        // Validators.compose([
        //   Validators.required,
        //   Validators.minLength(6),
        //   Validators.maxLength(100)
        // ])
      ],
      phone: [null,
        // Validators.compose([
        // // Validators.required,
        // Validators.pattern('^[0-9]*$'),
        // Validators.maxLength(13)])
      ],
      couponCode: [null],
      agree: [null, Validators.required]
    }, {
      // validator: ConfirmPasswordValidator.MatchPassword
    });
  }

  submit() {
    console.log("Enter");

    const controls = this.registerForm.controls;
    this.loading = true;

    if (!controls['agree'].value) {
      let message = "Please check 'I agree the terms & condition' check box";
      this.presentAlert(message);
      return;
    }

    let _user: User;
    // _user.clear();
    // _user.name = controls['name'].value;
    // _user.username = controls['username'].value;
    // _user.email = controls['username'].value;
    // _user.password = controls['password'].value;
    // _user.password_confirmation = controls['confirmPassword'].value;

    let data = {};
    data['name'] = controls['name'].value;
    data['username'] = controls['username'].value;
    // data['email'] = controls['email'].value;
    data['password'] = controls['password'].value;
    data['password_confirmation'] = controls['confirmPassword'].value;
    data['coupen_code'] = controls['couponCode'].value;
    

    this.auth.register(data).pipe(
      tap(user => {
        if (user) {
         
        } 
      }),
      finalize(() => {
        this.loading = false;
      }), 
      catchError(err => {
        this.loading = false;
        return null;
      })
    ).subscribe(res => {
      let token = res.access_token;
      localStorage.setItem("appToken", token);
      this.auth.userName =res.name;
      localStorage.setItem("userName", res.name);

      if(res.companyInfo){
        localStorage.setItem("activeCompanyName", res.companyInfo.companyName);
        localStorage.setItem("activeCompanyId", res.companyInfo.companyId);
        localStorage.setItem("activeCompanyType",'owncmp');
        this.router.navigateByUrl('/tabs/check-model');
      }
      else{
        this.router.navigateByUrl('/company-switch');
      }


    });
  }

  isAgreed() {
    const controls = this.registerForm.controls;
    return !controls['agree'].value;
  }

}
