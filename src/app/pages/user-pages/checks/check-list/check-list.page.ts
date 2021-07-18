import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, LoadingController, AlertController, ToastController, Platform, IonRouterOutlet, NavController, ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { CheckListPopoverComponent } from '../../../../components/check-list-popover/check-list-popover.component';
import { TestService } from '../../../../services/test.service';
import { CheckService } from '../../../../services/check.service';
import { Router, NavigationExtras } from '@angular/router';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { finalize } from 'rxjs/operators';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { UserService } from 'src/app/services/user.service';
import { MultiMailCheckPage } from '../multi-mail-check/multi-mail-check.page';
import { UserVerificationPhonePage } from '../../users/user-verification-phone/user-verification-phone.page';
import { MultiMailCheckPageModule } from '../multi-mail-check/multi-mail-check.module';
import { CheckCommentsModalComponent } from 'src/app/components/check-comments-modal/check-comments-modal.component';
import { CheckAttachementModalComponent } from 'src/app/components/check-attachement-modal/check-attachement-modal.component';
import { CheckActiviytModalComponent } from 'src/app/components/check-activiyt-modal/check-activiyt-modal.component';



@Component({
  selector: 'app-check-list',
  templateUrl: 'check-list.page.html',
  styleUrls: ['check-list.page.scss']
})
export class CheckListPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  backButtonSubscription; 
  constructor(private document:DocumentViewer,
    private file:File,
    private transfer:FileTransfer,
    private printer: Printer,
    private platform:Platform,
    private modalCtrl: ModalController,
     public toastController: ToastController, 
     public alertController: AlertController,
     public loadingController: LoadingController,
     public popoverController: PopoverController,
     private _checkService: CheckService,
     private _userService: UserService,
     private router: Router,
     private sanitizer: DomSanitizer,
     private routerOutlet: IonRouterOutlet,
     public navController:NavController) {
     }

  checks:any=[];

  //check filter variables
  page:any=1;
  filterStatus:any='';
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
    this.filterStatus="";
    this.selectedCheckIds=[]
    this.checks=[];
    this.page = 1;
    this.totalLength=null;
    //this.loadChecks(); 
    this.getPendingRequestCount();
  }
  ionViewWillEnter(){
    this.loadChecks();
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

  loadChecks(){
    this.expandItemControls[this.lastIndex]=false; // close already expanded item
    this.page=1;
    this.showLoadingSpinner =true;
    this._checkService.getChecks(this.page,this.searchTerm,this.filterStatus).pipe(finalize(() => {  this.showLoadingSpinner =false; })).subscribe( res =>{
      this.checks = res.data.checks;
      this.totalLength = res.data.link.total;
       });
  }

  loadData(event){
        
    if(this.checks.length >= this.totalLength){
      event.target.complete();
      return false;
    }

    this.page++;
    this._checkService.getChecks(this.page,this.searchTerm,this.filterStatus).subscribe( res =>{
      let that=this;
      res.data.checks.forEach(function(el){
        that.checks.push(el);
      })
               event.target.complete();
      });
          
      
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  async presentPopover(ev: any,check=null) {
    const popover = await this.popoverController.create({
      component: CheckListPopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      componentProps:{
      checkId:check.id,
      checkStatus:check.status,
      check:check,
      ref:this,
      },
      translucent: true
    });
    return await popover.present();
  }

  item: any;
  share: any;
  favorite: any;

  ngOnInit() {
   
  }

  

  searchCheck(event)
  {
      this.searchTerm =event.target.value;
      this.checks=[];
      this.page =1;
        this.showLoadingSpinner =true;
        this._checkService.getChecks(this.page,this.searchTerm,this.filterStatus).subscribe( res =>{
                      this.checks = res.data.checks;
                      this.totalLength = res.data.link.total;
                      this.showLoadingSpinner =false;
                      
                    
            });
            
  }

doRefresh(event){

    //reset all selected ids and checks
    this.filterStatus="";
    this.selectedCheckIds =[];
    this.selectedChecks    = [];

    this.showLoadingSpinner=false;
    this.searchQuery = '';
    this.page =1;
     this._checkService.getChecks(this.page,this.searchTerm).pipe(finalize(() => {event.target.complete(); })).subscribe( res =>{
      this.checks = res.data.checks;
      this.showLoadingSpinner =false;
      this.totalLength = res.data.link.total;
         
    });
 }


 

  printCheck(id=null){
    
    let  queryCheckId ='';
    let  queryCheckDesignTemplate  = `check_design_templete=1`;

    // if click multiple print
    if (id==null) {

        if(this.selectedCheckIds.length==0){
          this.presentAlert('Please select atleast one item')
          return false;
        }

        this.selectedCheckIds.forEach(el => {
          queryCheckId = queryCheckId + "&check_id[]=" + el;
        });
    }
    else{  
        queryCheckId = "&check_id[]=" + id;   // single print
    }

     
    let query = `${queryCheckDesignTemplate}${queryCheckId}`;
    this.presentLoading();

    var userAgent = navigator.userAgent;
    if (/Mac|iPad|iPhone|iPod/.test(userAgent)){
       var ref = window.open();
    }

    this._checkService.printCheck(query).pipe(finalize(() => { this.loadingController.dismiss(); }))
     .subscribe( res =>{
     
       if(this.platform.is('hybrid')){
              let path=null;
                if(this.platform.is('ios')){
                  path = this.file.documentsDirectory;
                }
                else{
                  path = this.file.externalApplicationStorageDirectory;
                }
                   let newName = Date.now()+'.pdf';
                   const fileTransfer = this.transfer.create();
                   this.presentLoading('Processing print..');
                   fileTransfer.download(res.data.url,path+newName).then(entry =>{
                    let url= entry.toURL();
                    this.loadingController.dismiss();  // end download loading

                    this.presentLoading('Processing print..');
                    this.printer.isAvailable().then((onSuccess) => {
                            this.printer.print(url).then((printRes) =>{
                              this.loadingController.dismiss(); 
                              this.file.removeFile(path,newName);
                            },(printError) =>{
                                this.presentAlert('Error while printing..')
                                this.file.removeFile(path,newName);
                            });
                        },(err) => {
                          this.loadingController.dismiss(); 
                          this.presentAlert('No printer service...')
                      }) 
                   })
           
       }
      else if (/Mac|iPad|iPhone|iPod/.test(userAgent)){
        ref.location = res.data.url;
        }else{
        window.open(res.data.url,'_blank');
        }

      // window.open(res.data.url,'_blank');
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

  onClickMultipleEmail(){
    if(this.selectedCheckIds.length==0){
      this.presentAlert('Please select one item')
      return false;
    }

    if(this.selectedCheckIds.length>1){
      this.presentAlert('Only one item allowed for Email check')
      return false;
    }
    else if(this.selectedCheckIds[0]!=null&&this.selectedCheckIds[0]!=undefined&&this.selectedCheckIds[0]!=''){
      this.router.navigateByUrl('/tabs/new-check-email/'+this.selectedCheckIds[0]);
    }
  }

  // called from popover
  emailCheck(id){
    this.router.navigateByUrl('/tabs/new-check-email/'+id);
  }

  
  onClickMail(check){

    if(!this._userService.isUserVerified()){
      this.presentAccountVerifyAlert('Please verify your account to enable mail check');
      return;
    }
    else if(check.bankAccountVerified!=1){
       this.presentBankAccountVerifyAlert('Please verify bank account to enable mail check')
    }
    else if(check.status==11){
       this.presentAlert("You can't mail this check,This check already rejected")
       return;
    }
    else if(check.status!=0&&check.status!=1){
      this.presentAlert(`You are allowed to mail new checks only.`);
       return;
    }
    else if(check.amount<0.1){
      this.presentAlert(`You can't mail this check,check amount should be greater than 0.`);
      return;
    }
    else{
      this.router.navigateByUrl('/tabs/new-check-mail/'+check.id)
    }

    
  }

  onClickEmail(check){
    if(check.bankAccountVerified!=1){
      this.presentBankAccountVerifyAlert('Please verify bank account to enable Email check')
   }else{
     this.router.navigateByUrl('/tabs/new-check-email/'+check.id)
   }
  }

  onClickMultipleMail()
  {

     

      if(this.selectedCheckIds.length==0){
        this.presentAlert('Please select atleast one item')
        return false;
      }
     
      if(!this._userService.isUserVerified()){
        this.presentAccountVerifyAlert('Please verify your account to enable mail check');
        return;
      }
     
      for(let i=0;i<this.selectedChecks.length;i++)
      {
          if(this.selectedChecks[i].bankAccountVerified!=1){
            this.presentBankAccountVerifyAlert(`Your  ${this.selectedChecks[i].bankAccountName} Not verified  Please verify bank account to enable mail check`)
            return;
          }
          if(this.selectedChecks[i].status==11){
            this.presentAlert(` You can't mail this check because Check number ${this.selectedChecks[i].checkSerialNo} already rejected `);
            return;
          }
          if(this.selectedChecks[i].status==4||this.selectedChecks[i].status==5||this.selectedChecks[i].status==6||this.selectedChecks[i].status==7||this.selectedChecks[i].status==8){
            this.presentAlert(`Check number ${this.selectedChecks[i].checkSerialNo} is already mailed`);
            return;
          }
          if(this.selectedChecks[i].status!=0&&this.selectedChecks[i].status!=1){
            this.presentAlert(`You are allowed to mail new checks only.`);
            return;
          }
          if(this.selectedChecks[i].amount<0.1){
            this.presentAlert(` Check amount should be greater than 0 on check no ${this.selectedChecks[i].checkSerialNo}  `);
            return;
          }
      }       

      // let navigationExtras: NavigationExtras = {
      //   queryParams: {
      //       ref: this,
      //      checksId :this.selectedCheckIds
      //   }
      // };
   
      //  this.navController.navigateForward('/multi-mail-check',navigationExtras)
        this.router.navigateByUrl('/multi-mail-check',{state : { checksId :this.selectedCheckIds }});
    
  }

  
  deleteCheck(checkId){
    this.checkDeleting =true;
    this._checkService.deleteCheck({checkId :checkId  }).pipe(
      finalize(() => {
         this.checkDeleting=false ; 
          this.popoverController.dismiss(); 
       })).subscribe( res =>{
          this.loadChecks();
    });
  }

  voidCheck(checkId){
    this.popoverController.dismiss();
    this._checkService.voidCheck({checkId :checkId  }).pipe(finalize(() => {  })).subscribe( res =>{
      this.loadChecks();
    });
  }

  cloneCheck(checkId){
       this.router.navigateByUrl(`/tabs/new-check?clone=${checkId}`);
       this.popoverController.dismiss(); 
  }


  async presentAccountVerifyAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Account Not Verified',
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Verify Now',
          handler: () => {
            this.router.navigateByUrl('user-verification-email');
          }
        }
      ]
    });

    await alert.present();
  }


  async presentBankAccountVerifyAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Bank Account Not Verified',
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Verify Now',
          handler: () => {
            this.router.navigateByUrl('/bank-verification/bank-verification-step2');
          }
        }
      ]
    });

    await alert.present();
  }

  // called from popover
  async presentCheckDeleteConfirm(checkId) {
    const alert = await this.alertController.create({
      header: 'Are You Sure?',
      message: 'You want to delete this check?',
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
            this.deleteCheck(checkId);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentCheckVoidConfirm(checkId){
    const alert = await this.alertController.create({
      header: 'Are You Sure?',
      message: 'You want to void this check?',
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
            this.voidCheck(checkId);
          }
        }
      ]
    });

    await alert.present();
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



 /******************************Check approval******************************************** */
 async presentApprovalCheckRequestToaster(count=1) {
  const toast = await this.toastController.create({
    header: 'Approval Request',
    message: `You have ${count} check approval request`,
    position:'top',
    buttons: [
      {
        text: 'View',
        handler: () => {
          this.router.navigateByUrl('/tabs/approval-list');
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          
        }
      }
    ]
  });
  toast.present();
}


getPendingRequestCount(){
  this._checkService.getPendingRequestCount().pipe(finalize(() => { })).subscribe( res =>{
   
    if(res.data.totalCount>0){
       this.presentApprovalCheckRequestToaster(res.data.totalCount);
    }
       
  });
}

async openCheckCommentModal(checkId) {
  const modal = await this.modalCtrl.create({
    component: CheckCommentsModalComponent,
    componentProps:{
      ref:this,
      checkId:checkId
    }
  });
  return await modal.present();
}


async openCheckAttachementModal(checkId) {
  const modal = await this.modalCtrl.create({
    component: CheckAttachementModalComponent,
    componentProps:{
      ref:this,
      checkId:checkId
    }
  });
  return await modal.present();
}

async openCheckActivityModal(checkId) {
  const modal = await this.modalCtrl.create({
    component: CheckActiviytModalComponent,
    componentProps:{
      ref:this,
      checkId:checkId
    }
  });
  return await modal.present();
}
  
}


