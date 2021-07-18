import { Component, OnInit } from '@angular/core';
import { BankAccountService } from 'src/app/services/bankAccount.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-bank-verification',
  templateUrl: './bank-verification.page.html',
  styleUrls: ['./bank-verification.page.scss'],
})
export class BankVerificationPage implements OnInit {

  constructor(private _bankAccountService:BankAccountService) {}

  segment:any='nonverifybank';
  bankAccounts:any=[];
  verifiedAccounts:any=[];
  nonVerifiedAccounts:any=[];

  ngOnInit(){
  }

  ionViewDidEnter(){
    this.loadBankAccounts();
  }

  loadBankAccounts(){
    this._bankAccountService.getBankAccounts().pipe(finalize(() => { })).subscribe( res =>{
      this.bankAccounts = res.data.bankAccounts;

      this.verifiedAccounts =this.bankAccounts.filter(el =>{
         return el.verified==1;
      })

      this.nonVerifiedAccounts =this.bankAccounts.filter(el =>{
        return el.verified!=1;
     })

     });
  }


}
