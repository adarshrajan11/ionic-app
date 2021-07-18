import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckService } from '../../../../services/check.service';
import { EmailCheckService } from '../../../../services/email-check.service';
import { tap, finalize, catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { of } from 'rxjs';

@Component({
  selector: 'app-new-check-email',
  templateUrl: './new-check-email.page.html',
  styleUrls: ['./new-check-email.page.scss'],
})
export class NewCheckEmailPage implements OnInit {

  constructor(private route:ActivatedRoute,
              private _checkService: CheckService,
              private _emailCheckService:EmailCheckService,
              public alertController: AlertController,
              private router: Router) { }

  check_id:any;
  checkData:any;
  payeeEmail:any;
  loading:boolean=false;
  


  ngOnInit(){
   
  }

  ionViewDidEnter(){
    this.payeeEmail=null;
    this.checkData=null;
    this.check_id = this.route.snapshot.paramMap.get("checkId");
    console.log(this.check_id);
    this.loadCheckData();
  }

  loadCheckData(){
    this._checkService.getCheckView(this.check_id).subscribe( res =>{
      this.checkData = res.data;
      this.payeeEmail=this.checkData.payeeEmail;
      console.log(this.checkData);
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

  createEmailCheck(){

    if(this.payeeEmail==''){
      this.presentAlert('Please enter payee email');
      return false;
    }

    let data ={
      checkId :this.check_id,
      payeeEmail:this.payeeEmail

    };

    this.loading=true;
    this._emailCheckService.createEmailCheck(data).pipe(
			tap( res => {
        this.presentAlert('Succesfully sent','Success');
        this.router.navigateByUrl('/tabs/list');
			}),
			finalize(() => {
        this.loading=false;
        
      }),
      catchError(err => {
        return of(false);
      })
		).subscribe(res => {

    });

  }

}
