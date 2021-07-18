import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController, LoadingController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { ReceivedCheckRequestPopoverComponent } from 'src/app/components/received-check-request-popover/received-check-request-popover.component';
import { Router } from '@angular/router';
import { CheckService } from 'src/app/services/check.service';
import { CheckRequestService } from 'src/app/services/check-request.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-received-check-request',
  templateUrl: './received-check-request.page.html',
  styleUrls: ['./received-check-request.page.scss'],
})
export class ReceivedCheckRequestPage implements OnInit {

  constructor(public popoverController: PopoverController,
              public modalController: ModalController,
              private _checkRequestService:CheckRequestService,
              private modalCtrl: ModalController,
              public toastController: ToastController, 
              public alertController: AlertController,
              public loadingController: LoadingController,
              private _checkService: CheckService,
              private router: Router,
              public navController:NavController) {}
                   

    checkRequests:any=[];

    page:any=1;
    filterStatus:any='';
    searchTerm:any='';

    totalLength:any;
    disableScroll:any;
    
    showLoadingSpinner:boolean=false;
    searchQuery = '';
    expandItemControls:any=[]; 



  ngOnInit() {
  }

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

  loadAllRequests(){
    this.page=1;
    this.showLoadingSpinner =true;
    this._checkRequestService.getAllReceivedCheckRequest(this.page,this.searchTerm,this.filterStatus).pipe(finalize(() => {  this.showLoadingSpinner =false; })).subscribe( res =>{
      this.checkRequests    = res.data.receivedRequests;
      this.totalLength      = res.data.link.total;
    });
  }

  doRefresh(event){
    this.filterStatus="";
    this.showLoadingSpinner=false;
    this.searchQuery = '';
    this.page =1;
    this._checkRequestService.getAllReceivedCheckRequest(this.page,this.searchTerm,this.filterStatus).pipe(finalize(() => { event.target.complete(); })).subscribe( res =>{
        this.checkRequests    = res.data.receivedRequests;
        this.totalLength      = res.data.link.total;
     });
  }

  searchRequest(event){
    this.searchTerm =event.target.value;
    this.checkRequests=[];
    this.page =1;
      this.showLoadingSpinner =true;
      this._checkRequestService.getAllReceivedCheckRequest(this.page,this.searchTerm,this.filterStatus).subscribe( res =>{
                    this.checkRequests    = res.data.receivedRequests;
                    this.totalLength   = res.data.link.total;
                    this.showLoadingSpinner =false;
          });
  }

  loadMoreData(event){
    if(this.checkRequests.length >= this.totalLength){
      event.target.complete();
      return false;
    }
    this.page++;
    this._checkRequestService.getAllReceivedCheckRequest(this.page,this.searchTerm,this.filterStatus).subscribe( res =>{
      let that=this;
      res.data.receivedRequests.forEach(function(el){
        that.checkRequests.push(el);
      })
          event.target.complete();
      });
          
  }

  async openReceivedCheckRequestPopover(ev: any,request) {
    const popover = await this.popoverController.create({
      component: ReceivedCheckRequestPopoverComponent, 
      cssClass: '',
      event: ev,
      translucent: true,
      componentProps:{
        requestId  :request.id,
        requestStatus:request.status,
        ref:this,
      },
    });
    return await popover.present();
  }

  rejectRequest(requestId){
    this._checkRequestService.rejectCheckRequest(requestId).pipe(finalize(() => {  })).subscribe( res =>{
         this.loadAllRequests();
    });
  }
  


  
}
