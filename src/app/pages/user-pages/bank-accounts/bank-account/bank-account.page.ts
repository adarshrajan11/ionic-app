import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, PopoverController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { BankAccountService } from '../../../../services/bankAccount.service';
import { finalize } from 'rxjs/operators';
import { BankAccountListPopoverComponent } from '../../../../components/bank-account-list-popover/bank-account-list-popover.component';
import { BankAccountUpdateModalComponent } from 'src/app/components/bank-account-update-modal/bank-account-update-modal.component';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.page.html',
  styleUrls: ['./bank-account.page.scss'],
})
export class BankAccountPage implements OnInit {

  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  constructor(public popoverController: PopoverController,
               private _bankAccountService:BankAccountService,
               private alertController:AlertController,
               private toastController:ToastController,
               private modalCtrl:ModalController) {}

  bankAccounts:any=[];
  searchTerm:any='';
  showLoadingSpinner:boolean=false;
  searchQuery:any;
  bankAccountDeleting:boolean=false;
    
    toggleInfiniteScroll() {
      this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    }

    async presentPopover(ev: any,bankAccount) {
      const popover = await this.popoverController.create({
        component: BankAccountListPopoverComponent,
        cssClass: 'my-custom-class',
        event: ev,
        translucent: true,
        componentProps:{
          bankAccount:bankAccount,
          ref:this,
          },
      });
      return await popover.present();
    }

    ionViewDidEnter(){
        this.searchQuery=''
        this.bankAccounts=[];
        this.loadBankAccounts();
    }
    
    ngOnInit(){
      
    }
  
    loadBankAccounts(){
      this.showLoadingSpinner =true;
      this._bankAccountService.getBankAccounts().pipe(finalize(() => {this.showLoadingSpinner =false; })).subscribe( res =>{
        this.bankAccounts = res.data.bankAccounts;
       });
    }

    searchBankAccount(event){
        this.searchTerm =event.target.value;
        this.bankAccounts=[];
        this.showLoadingSpinner =true;
        this._bankAccountService.getBankAccounts(this.searchTerm).subscribe( res =>{
          this.bankAccounts = res.data.bankAccounts;
          this.showLoadingSpinner =false;
         });
    }

    async presentBankAccountDeleteConfirm (bankAccountId) {
      const alert = await this.alertController.create({
        header: 'Are You Sure?',
        message: 'You want to delete this bank account?',
        buttons: [
          {
            text: 'No, Cancel!',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
               
            }
          }, {
            text: 'Okay',
            handler: () => {
              this.processDeleteBankAccount(bankAccountId)
            }
          }
        ]
      });
  
      await alert.present();
    }


    processDeleteBankAccount(bankAccountId){
      let processData ={
           bankAccountId:bankAccountId
      }
      this.bankAccountDeleting =true;
      this._bankAccountService.deleteBankAccount(processData).pipe(finalize(() => {this.bankAccountDeleting =false; })).subscribe( res =>{
        this.presentToast('Successfully deleted')
        this.loadBankAccounts();
       });
    }

    async presentToast(message) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000,
        animated:true,
        
      });
      toast.present();
    }
  
    async openBankAccountUpdateModal(bankAccount) {
      const modal = await this.modalCtrl.create({
        component: BankAccountUpdateModalComponent,
        componentProps:{
          ref:this,
          bankAccount:bankAccount
        }
      });
      return await modal.present();
    }
  
}
