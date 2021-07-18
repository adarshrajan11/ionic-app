import { Component, OnInit } from '@angular/core';
import { AlertController, NavParams } from '@ionic/angular';
import { PayeeService } from '../../services/payee.service';

@Component({
  selector: 'app-payee-list-popover',
  templateUrl: './payee-list-popover.component.html',
  styleUrls: ['./payee-list-popover.component.scss'],
})
export class PayeeListPopoverComponent implements OnInit {

  ref : any;

  constructor(private navParams: NavParams) { }
  payee: any;

  ngOnInit() {
    this.payee = this.navParams.get('payee');
    this.ref = this.navParams.get('ref');
  }

}
