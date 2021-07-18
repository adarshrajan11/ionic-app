import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { ApproveCheckRequestModalComponent } from '../approve-check-request-modal/approve-check-request-modal.component';

@Component({
  selector: 'app-received-check-request-popover',
  templateUrl: './received-check-request-popover.component.html',
  styleUrls: ['./received-check-request-popover.component.scss'],
})
export class ReceivedCheckRequestPopoverComponent implements OnInit {

  
  constructor(private navParams: NavParams,
              public modalController: ModalController,
              public popoverController: PopoverController,) { }

  receivedCheckRequestPageRef :any; 
  requestId:any;
  requestStatus:any;

  ngOnInit() {
    this.requestId                   = this.navParams.get('requestId');
    this.receivedCheckRequestPageRef = this.navParams.get('ref');
    this.requestStatus               = this.navParams.get('requestStatus');
  }



  async approveCheckNewReqstModal(){
    this.popoverController.dismiss();
    const modal = await this.modalController.create({
      component: ApproveCheckRequestModalComponent,
      componentProps:{
        ref      :this.receivedCheckRequestPageRef,
        requestId:this.requestId
      }
    });
    return await modal.present();
  }



}
