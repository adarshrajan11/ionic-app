import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-received-check-popover',
  templateUrl: './received-check-popover.component.html',
  styleUrls: ['./received-check-popover.component.scss'],
})
export class ReceivedCheckPopoverComponent implements OnInit {

  ref : any;
  checkId:any;
  checkStatus:any;
  constructor(private navParams: NavParams) { }
 

  ngOnInit() {
    this.checkId     = this.navParams.get('checkId');
    this.checkStatus = this.navParams.get('checkStatus');
    console.log(this.checkId)
    this.ref = this.navParams.get('ref');
  }

}
