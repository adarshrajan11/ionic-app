import { Component, OnInit } from '@angular/core';
import { MailCheckService } from '../../../../services/mail-check.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { CheckService } from '../../../../services/check.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { tap, finalize, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-new-check-mail',
  templateUrl: './new-check-mail.page.html',
  styleUrls: ['./new-check-mail.page.scss'],
})
export class NewCheckMailPage implements OnInit {

  constructor(private _mailCheckService:MailCheckService,
              private route:ActivatedRoute,
              private _checkService: CheckService,
              public alertController: AlertController,
              public loadingController: LoadingController,
              private router: Router) { }
  
   mailOptions:any=[];
   check_id:any; //route parameter
   checkData:any; // check view data

   //form data
   payeeEmail:any; 
   payeePhone:any; 
   mailTypeId:any;
   checkPaperId:any;
   informId:any;
   smsInform:any=false;
   emailInform:any=true;

   mailTypeAmount:any;
   checkPaperAmount:any;
   smsInformAmount:any;
   totalAmount:any;

   loading:boolean=false;

  ngOnInit() {
  }

  ionViewDidEnter(){
   this.mailOptions=[];
   this.payeeEmail=null;
   this.payeePhone=null;
   this.check_id = this.route.snapshot.paramMap.get("checkId");
   this.getMailOptions();
   this.loadCheckData();
  }

  getMailOptions(){
        this.presentLoading();
        this._mailCheckService.getMailingOptions().pipe(finalize(() => { this.loadingController.dismiss(); })).subscribe(res => {
                  this.mailOptions   = res.data.mailOptions;
                  this.setInitialValue(res.data.mailOptions)
                 
        });
        
  }

  setInitialValue(mailOptions){
    this.mailTypeId       = mailOptions.mailTypes[0].id;
    this.checkPaperId     = mailOptions.checkPapers[0].id;
    this.informId         = mailOptions.informOptions[0].id;
    this.mailTypeAmount   = mailOptions.mailTypes[0].amount;
    this.checkPaperAmount = mailOptions.checkPapers[0].amount;
    this.smsInformAmount  = 0;
    this.calculateAmount();
  }

  loadCheckData(){
    this._checkService.getCheckView(this.check_id).subscribe( res =>{
      this.checkData  = res.data;
      this.payeeEmail =this.checkData.payeeEmail;
      this.payeePhone =this.checkData.payeePhone;
    });
  }

  createMailCheck(){
    let processData ={
             'checkId'        :this.check_id,
             'mailTypeId'     :this.mailTypeId,
             'checkPaperId'   :this.checkPaperId,
             'informId'       :this.informId,
             'smsInform'      :this.smsInform==true? 1 :0,
             'emailInform'    :this.emailInform==true?1:0,
             'payeePhone'     :this.payeePhone,
             'payeeEmail'     :this.payeeEmail
           };
       if(processData.smsInform==1&&(this.validatePhone(processData.payeePhone)==false)){
          this.presentAlert('Please Enter valid phone number')
          return;
       }
       if(processData.emailInform==1&& (this.validateEmail(processData.payeeEmail)==false)){
        this.presentAlert('Please enter valid email address')
        return;
      }
   
    this.presentLoading();
    this._mailCheckService.createMailCheck(processData).pipe(
			tap( res => {
        this.presentAlert('Succesfully mailed','Success');
        this.router.navigateByUrl('/tabs/list');
			}),
			finalize(() => {
        this.loadingController.dismiss();
      }),
      catchError(err => {
        return of(false);
      })
		).subscribe(res => {

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

  onChangeMailType(event,index){
    this.mailTypeId     =event.target.value;
    this.mailTypeAmount =this.mailOptions.mailTypes[index].amount
    this.calculateAmount();
  }
  onChangeCheckPaper(event,index){
    this.checkPaperId     =event.target.value;
    this.checkPaperAmount =this.mailOptions.checkPapers[index].amount                       
    this.calculateAmount();
  }
 onChangeSmsInform(event){
    if (event.target.checked){
       this.smsInformAmount = this.mailOptions.informOptions[0].amount     
    }else{
       this.smsInformAmount =0;
    }
    this.calculateAmount();
}
  calculateAmount(){
    let totalAmount = parseFloat(this.mailTypeAmount) + parseFloat(this.checkPaperAmount) + parseFloat(this.smsInformAmount);
    this.totalAmount = totalAmount.toFixed(2);
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
  
  validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (re.test(String(email).toLowerCase()) == false) {
			return false;
		}
		else {
			return true;
		}
  }
  
  async presentLoading(message = "Please wait...") {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: message,

    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }



}
