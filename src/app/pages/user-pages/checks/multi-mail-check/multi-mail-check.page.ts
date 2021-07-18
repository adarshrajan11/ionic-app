import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ModalController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { MailEnvelopModalComponent } from 'src/app/components/mail-envelop-modal/mail-envelop-modal.component';
import { ShipAddresModalComponent } from 'src/app/components/ship-addres-modal/ship-addres-modal.component';
import { ExistingAttachmentModalComponent } from 'src/app/components/existing-attachment-modal/existing-attachment-modal.component';
import { Router } from '@angular/router';
import { MailCheckService } from 'src/app/services/mail-check.service';
import { finalize, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PayeeUpdateModalComponent } from 'src/app/components/payee-update-modal/payee-update-modal.component';
import { CheckListPage } from '../check-list/check-list.page';

@Component({
  selector: 'app-multi-mail-check',
  templateUrl: './multi-mail-check.page.html',
  styleUrls: ['./multi-mail-check.page.scss'],
})
export class MultiMailCheckPage implements OnInit {

  @ViewChild('barChart', { static: true }) barChart;
 

  constructor(private modalCtrl: ModalController,
              private router:Router,
              private _mailCheckService:MailCheckService,
              public loadingController: LoadingController,
              public alertController:AlertController,
              private cdr: ChangeDetectorRef,
              public navController:NavController,
             ) {}


 
  slidesPerView:any=1.35;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1.35,
  };

  checkClassRef:any;
  checksId:any=[];
  uploadProgressBar:any=[];
  currentRefillBalance:any;
  mailOptions:any=[];
  customFromAddressList:any=[];
  customToAddressList:any=[];
  checksData:any=[];
  mailCheckProcessData:any={
      mailCheckData       :[],
      customFromAddress   :'',
      customToAddress     :'',
      customShippingType  :'',
      isShippingToCustomAddress :0,
      subTotal            :0,
      customShippingFee   :0,
      customTotalAmount   :0,
      isConvertedVersion  :true  // Added to convert all old  versions to new custom price mailing system.
           
  };


  showCustomAddressMode:boolean=false;
  

  ionViewDidEnter(){
     this.checksData =[]
     this.checksId = history.state.checksId;
     if(this.checksId==undefined||this.checksId.length==0){
        this.router.navigateByUrl('/tabs/list')
     }else{
        this.loadMultiMailData()
     }
  }

  loadMultiMailData(){
         this.presentLoading('Loading checks..')
         this._mailCheckService.loadMultipleCheck({ checksId:this.checksId})
          .pipe( 
               finalize(()=>{  this.loadingController.dismiss()  }),
               catchError(err => {
                this.router.navigateByUrl('/tabs/list');
                return of(false);
              })
              ).subscribe( res =>{
              if(res.data.checks.length==0){
                this.router.navigateByUrl('/tabs/list');
              }
              this.setMultiMailData(res.data);
            
         })  
  }

  async presentLoading(message ='Please wait...') {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: message,
    
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  
  }

  // set all initial value
  setMultiMailData(data){
     this.checksData                =  data.checks;
     this.mailOptions               =  data.mailOptions;
     this.customFromAddressList     =  data.customFromAddress;
     this.customToAddressList       =  data.customToAddress;
     this.currentRefillBalance      =  data.currentRefillBalance;

     this.mailCheckProcessData.mailCheckData =[];
     this.checksData.forEach(el => {
          this.mailCheckProcessData.mailCheckData.push({
                checkId                 :el.checkId,
                payeePhone              :el.payeePhone,
                payeeEmail              :el.payeeEmail,
                isSmsEnabled            :(el.payeePhone!=''&&el.payeePhone!=null) ? true :false,
                isEmailEnabled          :(el.payeeEmail!=''&&el.payeeEmail!=null) ? true :false,
                shippingType            :this.mailOptions.mailTypes[0].id.toString(),
                checkPaper              :this.mailOptions.checkPapers[0].id.toString(),
                informId                :this.mailOptions.informOptions[0].id,
                attachedDocumentsCount  :0,
                total                   :0,
                attachmentIds           :[]
          })
     });

         this.mailCheckProcessData.customToAddress    = null            // data.customToAddress[0].id
         this.mailCheckProcessData.customFromAddress  = null               //data.customFromAddress[0].id
         this.mailCheckProcessData.customShippingType = this.mailOptions.mailTypes[0].id.toString()
         this.getTotalMailingFee();

  }


  onClickShipToCustomAddress(status){

    if(status==1){
      this.showCustomAddressMode= true;
      this.mailCheckProcessData.isShippingToCustomAddress=1;
    }else{
      this.showCustomAddressMode= false;
      this.mailCheckProcessData.isShippingToCustomAddress=0;
    }
    this.calculateAmount();

  }



  async openEnvelopModal(isEdit=false,id=null) {
    const modal = await this.modalCtrl.create({
      component: MailEnvelopModalComponent,
      componentProps:{
        ref:this,
        isEdit:isEdit,
        id:id
      }
    });
    return await modal.present();
  }

  async openShipAddressModal(isEdit=false,id=null) {
    const modal = await this.modalCtrl.create({
      component: ShipAddresModalComponent,
      componentProps:{
        ref:this,
        isEdit:isEdit,
        id:id
      }
    });
    return await modal.present();
  }

  async openExistingAttachmentModal(checkId,index) {
    const modal = await this.modalCtrl.create({
      component: ExistingAttachmentModalComponent,
      componentProps:{
        ref       :this,
        checkId   :checkId,
        mailCheckIndex:index
      }
    });
    return await modal.present();
  }

  ngOnInit(){
  }

  
  async onSubmitMailCheck() {

    if(this.mailCheckProcessData.isShippingToCustomAddress==1){
      if(this.mailCheckProcessData.customToAddress==null){
          this.presentAlert('Please select any custom address')
          return;
      }
      if(this.mailCheckProcessData.customFromAddress==null){
       this.presentAlert('Please select any custom from address')
       return;
     }
   
    }

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      message: 'Are you sure...?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (res) => {
             
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.processMailCheck();
          }
        }
      ]
    });

    await alert.present();
  }

  processMailCheck(){
    
    this.presentLoading('Processing..');
    let processData = this.mailCheckProcessData;
     this._mailCheckService.createMultipleMailCheck(processData).pipe(
			tap(res => {

			}),
			finalize(() => {
        this.loadingController.dismiss() 
			}),
			catchError(err => {

        if(err.error.action&&err.error.actionId){
          if(err.error.action=='payeeUpdate'){
            this.presentRequestForUpdatePayeeConfirmAlert(err.error.errorMsg,err.error.actionId);
          }
        }
				return of(false);
			})
		).subscribe(res => {
      if(res){
        this.presentAlert('Succesfully mailed',"Done")
        // this.navController.pop();
        this.router.navigate(['/tabs/list'])
      }
     
		});


  }

   //get calculate amount from server
  getTotalMailingFee(){

      let processData = this.mailCheckProcessData;
      this._mailCheckService.getTotalMailingFee(processData).pipe(
          tap(res => {
            this.setAmount(res.data)
          }),
          finalize(() => {
          }),
          catchError(err => {
            return of(false);
          })
        ).subscribe(res => {
          if(res){
          
          }
     });

  }

  // set calculated amount values
  setAmount(data){
    this.mailCheckProcessData.subTotal          = data.subTotal;
    this.mailCheckProcessData.customTotalAmount = data.totalCost ;
    this.mailCheckProcessData.customShippingFee = data.customShippingFee;
    for(let i=0;i<this.mailCheckProcessData.mailCheckData.length;i++){
        this.mailCheckProcessData.mailCheckData[i].total = data.singleItemsPrice[i];
    }
  }
  

  saveAttachment(event,checkId,index){
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      let attachment     = event.target.files[0];
      let attachmentName = event.target.files[0].name;
      let formData = new FormData();
      formData.append('attachment', attachment, attachmentName);
      formData.append('checkId', checkId);
      formData.append('isConvertedVersion',"true"); 
     
      this.uploadProgressBar[index] =true;
      this._mailCheckService.saveAttachment(formData).pipe( finalize(()=>{  this.uploadProgressBar[index] =false; })).subscribe( res =>{
       
         this.mailCheckProcessData.mailCheckData[index].attachmentIds.push(res.data.id)
         this.mailCheckProcessData.mailCheckData[index].attachedDocumentsCount  = this.mailCheckProcessData.mailCheckData[index].attachmentIds.length;
         this.getTotalMailingFee();  
         this.checksData[index].totalAttachmentsCount = this.checksData[index].totalAttachmentsCount+1; //increment total attachment count
       
        }) 
      
    }
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


  calculateAmount(){
      this.getTotalMailingFee();  
   }

   async presentRequestForUpdatePayeeConfirmAlert(message,payeeId) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Update Payee info',
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }, {
          text: 'Update Now',
          handler: () => {
             this.presentUpdatePayeeModal(payeeId)
          }
        }
      ]
    });

    await alert.present();
  }

  
  async presentUpdatePayeeModal(payeeId) {
    const modal = await this.modalCtrl.create({
      component: PayeeUpdateModalComponent,
      componentProps:{
        ref:this,
        payeeId:payeeId
      }
    });
    return await modal.present();
  }

  // this function call from payee update modal after success
  doAfterPayeeUpdate(){
    return;
  }


}
