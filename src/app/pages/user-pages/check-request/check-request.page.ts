import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController, ToastController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { CheckRequestPopoverComponent } from 'src/app/components/check-request-popover/check-request-popover.component';
import { NewCheckRequestModalComponent } from 'src/app/components/new-check-request-modal/new-check-request-modal.component';
import { CheckRequestService } from 'src/app/services/check-request.service';
import { CheckService } from 'src/app/services/check.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-check-request',
  templateUrl: './check-request.page.html',
  styleUrls: ['./check-request.page.scss'],
})
export class CheckRequestPage implements OnInit {

  constructor(
     public modalController: ModalController,
     private _checkRequestService:CheckRequestService,
     private modalCtrl: ModalController,
     public toastController: ToastController, 
     public alertController: AlertController,
     public loadingController: LoadingController,
     public popoverController: PopoverController,
     private _checkService: CheckService,
     private router: Router,
     public navController:NavController
    ) {}

    checkRequests:any=[];

    page:any=1;
    filterStatus:any='';
    searchTerm:any='';

    totalLength:any;
    disableScroll:any;
    
    showLoadingSpinner:boolean=false;
    searchQuery = '';
    expandItemControls:any=[]; 

    ionViewDidEnter(){
      this.searchQuery = '';
      this.filterStatus="";
      this.checkRequests=[];
      this.page = 1;
      this.totalLength=null;
    }

    ionViewWillEnter(){
      this.loadAllRequests();
    }

    ngOnInit(){
    }

    loadAllRequests(){
      this.page=1;
      this.showLoadingSpinner =true;
      this._checkRequestService.getAllCheckRequests(this.page,this.searchTerm,this.filterStatus).pipe(finalize(() => {  this.showLoadingSpinner =false; })).subscribe( res =>{
        this.checkRequests    = res.data.requests;
        this.totalLength      = res.data.link.total;
      });
    }

  loadMoreData(event){
    if(this.checkRequests.length >= this.totalLength){
      event.target.complete();
      return false;
    }
    this.page++;
    this._checkRequestService.getAllCheckRequests(this.page,this.searchTerm,this.filterStatus).subscribe( res =>{
      let that=this;
      res.data.requests.forEach(function(el){
        that.checkRequests.push(el);
      })
          event.target.complete();
    });   
  }

  doRefresh(event){
    this.filterStatus="";
    this.showLoadingSpinner=false;
    this.searchQuery = '';
    this.page =1;
    this._checkRequestService.getAllCheckRequests(this.page,this.searchTerm,this.filterStatus).pipe(finalize(() => { event.target.complete(); })).subscribe( res =>{
        this.checkRequests    = res.data.requests;
        this.totalLength      = res.data.link.total;
     });
  }


  searchRequest(event){
    this.searchTerm =event.target.value;
    this.checkRequests=[];
    this.page =1;
      this.showLoadingSpinner =true;
      this._checkRequestService.getAllCheckRequests(this.page,this.searchTerm,this.filterStatus).subscribe( res =>{
                    this.checkRequests = res.data.requests;
                    this.totalLength   = res.data.link.total;
                    this.showLoadingSpinner =false;
          });
  }


  async checkRequestPopover(ev: any,request) {
    const popover = await this.popoverController.create({
      component: CheckRequestPopoverComponent,
      cssClass: '',
      event: ev,
      translucent: true,
      componentProps:{
        requestId    :request.id,
        requestStatus:request.status,
        ref:this,
      },
    });
    return await popover.present();
  }

  async openNewRequestModal(requestType) {
    const modal = await this.modalController.create({
      component: NewCheckRequestModalComponent,
      componentProps:{
        ref        :this,
        requestType:requestType  // 1 -newRequest , 2-newRequestByPhone, 3-newRequestByEmail
      }
    });
    return await modal.present();
  }

  resendLink(requestId){
    this.presentLoading('Sending...')
    this._checkRequestService.resendRequest(requestId).pipe(finalize(() => { this.loadingController.dismiss();  })).subscribe( res =>{
      this.presentToast('Succesfully sent');
      this.loadAllRequests();
    });
  }

  deleteRequest(requestId){
    this.presentLoading('Deleting...')
    this._checkRequestService.deleteCheckRequest(requestId).pipe(finalize(() => { this.loadingController.dismiss();  })).subscribe( res =>{
      this.presentToast('Succesfully deleted');
      this.loadAllRequests();
    });
  }

  //item expand controll
  lastIndex:any;
  expandItem(index){
    if(index==this.lastIndex){
      this.expandItemControls[index]=!this.expandItemControls[index];
    }else{
      this.expandItemControls[this.lastIndex]=false;
      this.expandItemControls[index]=true;
    }
    this.lastIndex = index;
  }
 //end item expand controll

   // called from popover
   async presentDeleteConfirm(requestId) {
    const alert = await this.alertController.create({
      header: 'Are You Sure?',
      message: 'You want to delete this request?',
      buttons: [
        {
          text: 'No, Cancel!',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.deleteRequest(requestId);
          }
        }
      ]
    });
    await alert.present();
  }

     // called from popover
     async presentResendConfirm(requestId) {
      const alert = await this.alertController.create({
        header: 'Are You Sure?',
        message: 'You want to resend this request?',
        buttons: [
          {
            text: 'No, Cancel!',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              
            }
          }, {
            text: 'Okay',
            handler: () => {
              this.resendLink(requestId);
            }
          }
        ]
      });
      await alert.present();
    }

  async presentLoading(message = "Please wait...") {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: message,
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      animated:true,
    });
    toast.present();
  }


}
