import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController, LoadingController } from '@ionic/angular';
import { CheckService } from 'src/app/services/check.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-check-activiyt-modal',
  templateUrl: './check-activiyt-modal.component.html',
  styleUrls: ['./check-activiyt-modal.component.scss'],
})
export class CheckActiviytModalComponent implements OnInit {
  
  constructor(private modalCtrl: ModalController,
            private navParams: NavParams,
            private _checkService:CheckService,
            public alertController: AlertController,
            public loadingController: LoadingController
          ) { }

ref:any;   //CheckList ref
checkId:any;
checkActivities:any=[];
showLoadingSpinner:boolean=false;
newDeviceName:any='';


  dismiss() {
    this.modalCtrl.dismiss();
  }

  ngOnInit(){
    this.ref              = this.navParams.get('ref');
    this.checkId          = this.navParams.get('checkId');
    this.getCheckActivity()

  }

  getCheckActivity(){
    this.showLoadingSpinner=true;
    this._checkService.getCheckActivities(this.checkId).pipe(finalize(()=>{ this.showLoadingSpinner=false})).subscribe(res =>{
        this.checkActivities =res.data;
        console.log(this.checkActivities);
    })
     
  }

  async openUpdateDeviceNameAlert(ipAddress){
        return;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Update device name',
      inputs: [
        {
          name: 'ipAddress',
          type: 'text',
          value:ipAddress,
          placeholder: 'ip address',
        },
        {
          name: 'deviceName',
          type: 'text',
          value: '',
          placeholder: 'Device name'
        },
       
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
           
          }
        }, {
          text: 'Ok',
          handler: (data) => {
              console.log(data.deviceName)
              this.updateDeviceName(ipAddress,data.deviceName)
          }
        }
      ]
    });

    await alert.present();

  }

  updateDeviceName(ipAddress,deviceAddress){
    let data ={
      ipAddress : ipAddress,
      deviceName: deviceAddress

    }
    this._checkService.updateDeviceName(data).pipe(finalize(()=>{ })).subscribe(res =>{
      this.getCheckActivity();
    })
  }

  



}
