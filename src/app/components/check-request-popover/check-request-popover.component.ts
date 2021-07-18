import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-check-request-popover',
  templateUrl: './check-request-popover.component.html',
  styleUrls: ['./check-request-popover.component.scss'],
})
export class CheckRequestPopoverComponent implements OnInit {

  constructor(private navParams: NavParams,
    public modalController: ModalController,
    public popoverController: PopoverController,) { }



  checkRequestPageRef :any;   //CheckRequestPage ref
  requestId:any;
  requestStatus:any;

  ngOnInit() {
    this.requestId                   = this.navParams.get('requestId');
    this.checkRequestPageRef         = this.navParams.get('ref');
    this.requestStatus               = this.navParams.get('requestStatus');
  }




}
 