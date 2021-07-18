import { Component, OnInit, ViewChild } from '@angular/core';
import { PopoverController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { EmailCheckService } from '../../../services/email-check.service';
import { ReceivedCheckPopoverComponent } from '../../../components/received-check-popover/received-check-popover.component';
import { CheckService } from '../../../services/check.service';
import { finalize } from 'rxjs/operators';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-received-check',
  templateUrl: './received-check.page.html',
  styleUrls: ['./received-check.page.scss'],
})
export class ReceivedCheckPage implements OnInit {
  @ViewChild(IonInfiniteScroll,{static:false}) infiniteScroll: IonInfiniteScroll;
  constructor( private file:File,
    private transfer:FileTransfer,
    private printer: Printer,
    private platform:Platform,
    public alertController: AlertController,
    public popoverController: PopoverController,
    public loadingController: LoadingController,
    private _emailCheckService:EmailCheckService,
    private _checkService:CheckService) {}

  receivedChecks:any=[];
  page:any=1;
  totalLength:any;
  disableScroll:any;
  showLoadingSpinner:boolean=false;
  searchTerm:any='';
  searchQuery:any;
  disablePrintAfterPrinted=[];

  loadData(event){
    console.log(this.receivedChecks.length);
    console.log(this.totalLength);

    if(this.receivedChecks.length >= this.totalLength){
         event.target.complete();
         return false;
     }
  
    this.page++;
    this._emailCheckService.getReceivedChecks(this.page).subscribe( res =>{
      let that=this;
      res.data.receivedChecks.forEach(function(el){
        that.receivedChecks.push(el);
      })
           event.target.complete();
      });

      console.log(this.receivedChecks);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  item: any;
  share: any;
  favorite: any;

  async presentPopover(ev: any,check) {
    const popover = await this.popoverController.create({
      component: ReceivedCheckPopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      componentProps:{
        checkId:check.id,
        checkStatus:check.checkStatus,
        ref:this,
      },
      translucent: true
    });
    return await popover.present();
  }

  async presentLoading(message="Please wait..") {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: message,
    
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  ionViewDidEnter(){
    this.searchQuery=''
    this.receivedChecks=[];
    this.page = 1;
    this.totalLength=null;
    this.loadReceivedChecks();
  }
  
  ngOnInit(){
    
  }

  loadReceivedChecks(){
    this.page =1;
    this.showLoadingSpinner =true;
    this._emailCheckService.getReceivedChecks(this.page).pipe(finalize(() => {this.showLoadingSpinner =false; })).subscribe( res =>{
      this.receivedChecks = res.data.receivedChecks;
      this.totalLength = res.data.link.total;
      
     });
  }

  searchChecks(event)
  {

    this.searchTerm =event.target.value;
    this.receivedChecks=[];
    this.page =1;
      this.showLoadingSpinner =true;
      this._emailCheckService.getReceivedChecks(this.page,this.searchTerm).subscribe( res =>{
        this.receivedChecks = res.data.receivedChecks;
        this.totalLength    = res.data.link.total;
        this.showLoadingSpinner =false;
       });

  }

  doRefresh(event){
    this.showLoadingSpinner=false;
    this.searchQuery=''
    this.page =1;
    this._emailCheckService.getReceivedChecks(this.page).pipe(finalize(() => {event.target.complete(); })).subscribe( res =>{
           this.receivedChecks      = res.data.receivedChecks;
           this.totalLength = res.data.link.total;
     });

 }

 printCheck(id=null){
    
  let  queryCheckId ='';
  let  queryCheckDesignTemplate  = `check_design_templete=1`;
  let  queryReceived_email       =  '&received_email=1'
       queryCheckId = "&check_id[]=" + id;   // single print
  let query = `${queryCheckDesignTemplate}${queryReceived_email}${queryCheckId}`;
  this.presentLoading();

    var userAgent = navigator.userAgent;
    if (/Mac|iPad|iPhone|iPod/.test(userAgent)){
       var ref = window.open();
    }

  this._checkService.printCheck(query).pipe(finalize(() => { this.loadingController.dismiss(); })).subscribe( res =>{
   
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
                        this.presentPrintedConfirmAlert(id);
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
          this.presentPrintedConfirmAlert(id);
      }
      else{
          window.open(res.data.url,'_blank');
          this.presentPrintedConfirmAlert(id);
        }

       

      // window.open(res.data.url,'_blank');
});
  

}


async presentPrintedConfirmAlert(checkId) {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Confirm',
    message: 'Did you print it Correctly??',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          let processData ={
             checkId:[checkId],
             status :0
          }
          this._emailCheckService.updateEmailCheckStatus(processData).subscribe( res =>{
           // this.loadReceivedChecks();
          });
          
        }
      }, {
        text: 'Yes',
        handler: () => {
         let processData ={
             checkId:[checkId],
             status :1
          }
          this._emailCheckService.updateEmailCheckStatus(processData).subscribe( res =>{
           //this.loadReceivedChecks();
           this.receivedChecks.forEach(el => {
              if(el.id==checkId){
                 this.disablePrintAfterPrinted[el.id]=true;
              }
            });
         });
         
        }
      }
    ]
  });

  await alert.present();
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

}
