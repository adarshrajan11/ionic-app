import { Component, OnInit } from '@angular/core';
import { BankAccountService } from 'src/app/services/bankAccount.service';
import { DomSanitizer } from '@angular/platform-browser';
import { finalize } from 'rxjs/operators';
import { LoadingController, Platform } from '@ionic/angular';
import { Route } from '@angular/compiler/src/core';
import { RouterEvent, Router, ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-bank-verification-step2',
  templateUrl: './bank-verification-step2.page.html',
  styleUrls: ['./bank-verification-step2.page.scss'],
})
export class BankVerificationStep2Page implements OnInit {
 
  constructor(private _bankAccountService:BankAccountService,
             public loadingController: LoadingController,
             private sanitizer: DomSanitizer,
             public platform: Platform,
             private route:ActivatedRoute
             
             ) {}
 
    verifyBankAccountUrl:any;   
    showLoadingSpinner:boolean=false;
    deviceHeight:any;   
    bankAccountId:any;   
 
  ngOnInit() {
    this.deviceHeight= this.platform.height() -105;
    this.bankAccountId = this.route.snapshot.params['bankAccount'];
  }

  ionViewDidEnter(){
     this.getBankAccountVerifyUrl();
  }

  getBankAccountVerifyUrl(){
    this.presentLoading();
    this._bankAccountService.getBankAcountVerifyurl(this.bankAccountId).pipe(finalize(() => { this.loadingController.dismiss() })).subscribe( res =>{
      this.showLoadingSpinner =true;
      this.verifyBankAccountUrl = this.sanitizer.bypassSecurityTrustResourceUrl(res.data.url);
     });
  }

  async presentLoading(message ='Please wait...') {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: message,
    
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  onLoadIframe(){
    this.showLoadingSpinner=false;
  }

}
