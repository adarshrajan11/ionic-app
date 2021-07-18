import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-check-list-popover',
  templateUrl: './check-list-popover.component.html',
  styleUrls: ['./check-list-popover.component.scss'],
})
export class CheckListPopoverComponent implements OnInit {
  ref : any;
  checkId:any;
  checkStatus:any;
  check:any;
  constructor(private navParams: NavParams) { }
 

  ngOnInit() {
    this.checkId = this.navParams.get('checkId');
    this.checkStatus = this.navParams.get('checkStatus');
    this.check = this.navParams.get('check');
    console.log(this.checkId)
    this.ref = this.navParams.get('ref');
  }



}
