import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public actionSheetController: ActionSheetController, private router: Router) {}

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'New Check',
        icon: 'create',
        handler: () => {

          console.log('New Check clicked');
          this.router.navigateByUrl('/tabs/new-check')
        }
      }, 
      {
        text: 'New Bank Account',
        icon: 'filing',
        handler: () => {
          console.log('New Bank Account clicked');
          this.router.navigateByUrl('/tabs/check-model')
        }
      }, 
      {
        text: 'New Payee',
        icon: 'person-add',
        handler: () => {
          console.log('New Payee clicked');
          this.router.navigateByUrl('/tabs/add-payee')
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
