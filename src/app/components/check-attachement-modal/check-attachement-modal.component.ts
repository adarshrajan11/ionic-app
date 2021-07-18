import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController, LoadingController, Platform } from '@ionic/angular';
import { CheckService } from 'src/app/services/check.service';
import { finalize } from 'rxjs/operators';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-check-attachement-modal',
  templateUrl: './check-attachement-modal.component.html',
  styleUrls: ['./check-attachement-modal.component.scss'],
})
export class CheckAttachementModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController,
              private navParams: NavParams,
              private _checkService:CheckService,
              public alertController: AlertController,
              public loadingController: LoadingController,
              private document:DocumentViewer,
              private platform:Platform,
              private file:File,
              private transfer:FileTransfer
             ) { }

ref:any;   //CheckList ref
checkId:any;
attachments:any=[];
loadAttachmentProgress:boolean=false;
showLoadingSpinner:boolean=false;


  dismiss() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    this.ref              = this.navParams.get('ref');
    this.checkId          = this.navParams.get('checkId');
    this.loadAllAttachments();
  }

  loadAllAttachments(){
    this.showLoadingSpinner=true;
    this._checkService.getAllCheckAttachments(this.checkId).pipe(finalize(()=>{ this.showLoadingSpinner=false})).subscribe(res =>{
           this.attachments = res.data;
           console.log(this.attachments);
    })
  }

  saveAttachment(event){

    if(event.target.files && event.target.files[0]){
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      let attachment     = event.target.files[0];
      let attachmentName = event.target.files[0].name;
      let formData = new FormData();
      formData.append('attachment', attachment, attachmentName);
      this.loadAttachmentProgress=true;
      this._checkService.addNewCheckAttachment(this.checkId,formData).pipe(finalize(()=>{ this.loadAttachmentProgress=false})).subscribe(res =>{
         this.loadAllAttachments();
      })
    }
  }

  openAttachment(attachmentId){

    var userAgent = navigator.userAgent;
    if (/Mac|iPad|iPhone|iPod/.test(userAgent)){
       var ref = window.open();
    }
     this.presentLoading('Loading..')
     this._checkService.openAttachment(this.checkId,attachmentId).pipe( finalize(()=>{  this.loadingController.dismiss() })).subscribe(res =>{

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
                   this.presentLoading('Loading..')
                   fileTransfer.download(res.data.url,path+newName).then(entry =>{
                            this.loadingController.dismiss();
                            let url= entry.toURL();
                           this.document.viewDocument(url,'application/pdf',{},null,()=>{
                              this.file.removeFile(path,newName);
                           })
                           
                   })

      }
      else if(/Mac|iPad|iPhone|iPod/.test(userAgent)){
            ref.location = res.data.url;
            }else{
            window.open(res.data.url,'_blank');
       }
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

  deleteAttachment(attachmentId){

    this.presentLoading();
    this._checkService.deleteCheckAttachment(this.checkId,attachmentId).pipe(finalize(()=>{ this.loadingController.dismiss() })).subscribe(res =>{
          this.loadAllAttachments();
    })

  }


  

  




}
