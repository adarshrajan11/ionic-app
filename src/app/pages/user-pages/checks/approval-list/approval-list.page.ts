import { Component, OnInit, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { IonInfiniteScroll, ToastController, AlertController, LoadingController, PopoverController, IonRouterOutlet, NavController } from '@ionic/angular';
import { CheckService } from 'src/app/services/check.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approval-list',
  templateUrl: './approval-list.page.html',
  styleUrls: ['./approval-list.page.scss'],
})
export class ApprovalListPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  backButtonSubscription; 
  constructor(
   
     public toastController: ToastController, 
     public alertController: AlertController,
     public loadingController: LoadingController,
     public popoverController: PopoverController,
     private _checkService: CheckService,
     private _userService: UserService,
     private router: Router,
     private routerOutlet: IonRouterOutlet,
     public navController:NavController) {
     }

  checks:any=[];
  searchTerm:any='';


  totalLength:any;
  disableScroll:any;
  
  showLoadingSpinner:boolean=false;
  selectedCheckIds:any=[];
  selectedChecks:any=[];
  searchQuery = '';
  checkDeleting:boolean=false;
  expandItemControls:any=[]; 
  

  

  ionViewDidEnter(){
    this.searchQuery = '';
    this.selectedCheckIds=[]
    this.checks=[];
    this.totalLength=null;
  
  }
  ionViewWillEnter(){
    this.loadChecks();
  }

  ngOnInit(){
  }


 
  loadChecks(){
    this.expandItemControls[this.lastIndex]=false; // close already expanded item
    this.showLoadingSpinner =true;
    this._checkService.getPendingApprovalCheckList().pipe(finalize(() => {  this.showLoadingSpinner =false; })).subscribe( res =>{
      this.checks = res.data.checks;
      this.totalLength = res.data.link.total;
       });
  }

 
  
  multiSelectHandler(id,event,check){

    // all selected ids push to array
    if(event.target.checked==true){
      this.selectedCheckIds.push(id);
     }else{
       this.selectedCheckIds = this.selectedCheckIds.filter(el => {
                 return el!=id;
       });
    }

   //added on 21-07-2020
    if(event.target.checked==true){
      this.selectedChecks.push(check);
     }else{
       this.selectedChecks = this.selectedChecks.filter(el => {
                 return el.id!=id;
       });
    }

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



approve(){

  if(this.selectedCheckIds.length==0){
    this.presentAlert('Please select one item')
    return false;
  }

  this.presentCheckApproveConfirm();

}

reject(){

  if(this.selectedCheckIds.length==0){
    this.presentAlert('Please select one item')
    return false;
  }

  this.presentCheckRejectConfirm();
 
}

processApprove(){
  
    let  data = {
        checkIds : this.selectedCheckIds
    }
    this.presentLoading();
    this._checkService.approveCheckForPrint(data).pipe(finalize(() => { this.loadingController.dismiss()  })).subscribe( res =>{
          this.selectedCheckIds =[];
          this.selectedChecks  =[];
          this.presentSuccessToast('Successfully approved');
          this.router.navigateByUrl('/tabs/list');
      });
}

processReject(){

  let  data = {
    checkIds : this.selectedCheckIds
  }
  this.presentLoading();
  this._checkService.rejectCheckForPrint(data).pipe(finalize(() => { this.loadingController.dismiss()   })).subscribe( res =>{
        this.selectedCheckIds =[];
        this.selectedChecks  =[];
        this.presentSuccessToast('Successfully rejected');
        this.router.navigateByUrl('/tabs/list');
  });

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



async presentLoading(message ='Please wait...') {
  const loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: message,
  
  });
  await loading.present();

  const { role, data } = await loading.onDidDismiss();
}

 
 async presentCheckApproveConfirm() {
  const alert = await this.alertController.create({
    header: 'Are You Sure?',
    message: 'You want to approve',
    buttons: [
      {
        text: 'No, Cancel!',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          
        }
      }, {
        text: 'Approve',
        handler: () => {
           this.processApprove();
        }
      }
    ]
  });

  await alert.present();
}

async presentCheckRejectConfirm() {
  const alert = await this.alertController.create({
    header: 'Are You Sure?',
    message: 'You want to reject',
    buttons: [
      {
        text: 'No, Cancel!',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          
        }
      }, {
        text: 'Reject',
        handler: () => {
          this.processReject();
        }
      }
    ]
  });

  await alert.present();
}

async presentSuccessToast(message) {
  const toast = await this.toastController.create({
    message: message,
    duration: 2000
  });
  toast.present();
}


}
