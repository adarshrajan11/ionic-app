import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { finalize, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  constructor(public alertController: AlertController, private route: ActivatedRoute, private router: Router, private authSerice: AuthService) { }

  login: any;
  loading: boolean = false;

  password: string;
  confirmPassword: string;

  async presentAlert(message:string,title="Opps !") {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {

  }

  reset(){
    
    if (this.password ==''||this.password==null) {
      this.presentAlert("Please enter password");
      return;
    }
    if(this.confirmPassword==''||this.confirmPassword==null){
      this.presentAlert("Please enter confirm password");
      return;
    }

    if (this.password != this.confirmPassword) {
      this.presentAlert("The password confirmation does not match.");
      return;
    }else {
      let data = {
        email : this.route.snapshot.paramMap.get('email'),
        otp : this.route.snapshot.paramMap.get('otp'),
        password : this.password,
      };
      this.authSerice.resetPassword(data).pipe(
        finalize(() => {
          this.loading = false;
          this.password = '';
          this.confirmPassword = '';
        }), catchError(err => {
          if(err.status == 422){
            this.loading = false;
            return of(false);
          }
        })
      ).subscribe(res => {
        if (res) {
          this.presentAlert("Password Changed Successfully","Sucess");
          this.router.navigate(['/login'])
        }
      });
    }
  }

}
