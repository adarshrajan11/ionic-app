import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, AlertController, ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { PayeeListPopoverComponent } from '../../../../components/payee-list-popover/payee-list-popover.component';
import { PayeeService } from '../../../../services/payee.service';
import { Subject, merge } from 'rxjs';
import { finalize, catchError, distinctUntilChanged } from 'rxjs/operators';
import { PayeeUpdateModalComponent } from 'src/app/components/payee-update-modal/payee-update-modal.component';

@Component({
  selector: 'app-payee-list',
  templateUrl: './payee-list.page.html',
  styleUrls: ['./payee-list.page.scss'],
})
export class PayeeListPage implements OnInit {

  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  constructor(public popoverController: PopoverController,
              private modalCtrl:ModalController,
              private payeeService: PayeeService,
              public alertController: AlertController) { }


  payees: any = [];
  page: any = 1;
  totalLength: any;
  disableScroll: any;
  searchTerm: any = '';
  showLoadingSpinner: boolean = false;
  searchQuery:any;
  deleting:boolean = false;
 

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  async presentPopover(ev: any,payee = null) {
    const popover = await this.popoverController.create({
      component: PayeeListPopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      componentProps:{
        payee : payee,
        payeeService : this.payeeService,
        ref:this,
      },
      translucent: true
    });
    return await popover.present();
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

  ionViewDidEnter() {
    this.deleting = false;
    this.searchQuery=''
    this.payees = [];
    this.page = 1;
    this.totalLength = null;
    this.loadPayees();
  }

  ngOnInit() {

  }

  loadPayees() {
    this.showLoadingSpinner = true;
    this.payeeService.getPayees(this.page).pipe(finalize(() => {this.showLoadingSpinner =false; })).subscribe(res => {
      this.payees = res.data.payees;
      this.totalLength = res.data.link.total;
    });
  }

  loadData(event) {

    if (this.payees.length >= this.totalLength) {
      event.target.complete();
      return false;
    }

    this.page++;
    this.payeeService.getPayees(this.page, this.searchTerm).subscribe(res => {
      let that = this;
      res.data.payees.forEach(function (el) {
        that.payees.push(el);
      })
      event.target.complete();
    });

  }

  searchPayee(event) {
    this.searchTerm = event.target.value;
    this.payees = [];
    this.page = 1;
    this.showLoadingSpinner = true;
    this.payeeService.getPayees(this.page, this.searchTerm).pipe(distinctUntilChanged()).subscribe(res => {
      this.showLoadingSpinner = false;
      this.payees = res.data.payees;
      this.totalLength = res.data.link.total;
    });
  }

  doRefresh(event) {
    this.showLoadingSpinner=false;  // disable initial loading spinner when refreshing
    this.searchQuery='';
    this.page = 1;
    this.payeeService.getPayees(this.page)
      .pipe(finalize(() => {event.target.complete(); }))
      .subscribe(res => {
        this.payees = res.data.payees;
        this.showLoadingSpinner = false;
        this.totalLength = res.data.link.total;
      });


  }

  async presentDeleteConfirm(payee) {
    const alert = await this.alertController.create({
      header: 'Are You Sure?',
      message: 'You want to delete this payee?',
      buttons: [
        {
          text: 'No, Cancel!',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.delete(payee);
          }
        }
      ]
    });

    await alert.present();
  }

  delete(payee) {
    this.deleting = true
    console.log("MAIN DELETE",payee.id);
    this.payeeService.delete( payee.id )
    .pipe(
      finalize(() => {
        // this.deleting = false;
      })
    )
    .subscribe(res => {
      console.log(res);
      this.loadPayees();
      this.deleting = false;
      this.popoverController.dismiss();
    });
  }

  async openPayeeUpdateModal(payeeId) {
    const modal = await this.modalCtrl.create({
      component: PayeeUpdateModalComponent,
      componentProps:{
        ref:this,
        payeeId:payeeId
      }
    });
    return await modal.present();
  }

  // this function call from payee update modal after success
  doAfterPayeeUpdate(){
    this.loadPayees();
  }

}
