import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { BankAccountUpdateModalComponent } from '../bank-account-update-modal/bank-account-update-modal.component';

@Component({
  selector: 'app-bank-account-list-popover',
  templateUrl: './bank-account-list-popover.component.html',
  styleUrls: ['./bank-account-list-popover.component.scss'],
})
export class BankAccountListPopoverComponent implements OnInit {

  constructor(private navParams: NavParams,
              private modalCtrl:ModalController) { }

  bankAccountId:any;
  bankAccount:any;
  ref:any;  //BankAccountPage class reference
  ngOnInit() {
   this.bankAccount= this.navParams.get('bankAccount');
   this.ref=  this.navParams.get('ref');
   this.bankAccountId = this.bankAccount.id;
  }

  async openBankAccountUpdateModal(bankAccountId) {
    const modal = await this.modalCtrl.create({
      component: BankAccountUpdateModalComponent,
      componentProps:{
        ref:this.ref, //BankAccountPage class reference
        bankAccountId:bankAccountId
      }
    });
    return await modal.present();
  }

}
