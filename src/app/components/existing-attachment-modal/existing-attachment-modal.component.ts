import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { MailCheckService } from 'src/app/services/mail-check.service';
import { finalize } from 'rxjs/operators';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-existing-attachment-modal',
  templateUrl: './existing-attachment-modal.component.html',
  styleUrls: ['./existing-attachment-modal.component.scss'],
})
export class ExistingAttachmentModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController,
              private fb:FormBuilder,
              public alertController: AlertController,
              public _mailCheckService:MailCheckService,
              public loadingController: LoadingController,
              private navParams: NavParams,
              private document:DocumentViewer,
              private platform:Platform,
              private file:File,
              private transfer:FileTransfer,
              public toastController: ToastController) { }

  checkId:any;   
  ref:any;
  mailCheckIndex:any;
  existingAttachments:any=[];
  selectedAttachmentIds:any=[];

  ngOnInit() {
    this.checkId         = this.navParams.get('checkId');
    this.ref             = this.navParams.get('ref');
    this.mailCheckIndex  = this.navParams.get('mailCheckIndex');
    this.loadExistingAttachments()
  }


  //deprecated from 04/11/2020 
  // this function used for push initiallly checked checkbox id to selectedAttachmentIds
  addAttachemntIdToSelectedIdsArray(){
    for(let i=0;i<this.existingAttachments.length;i++){
        if(this.existingAttachments[i].isMailDocument==1){
          this.selectedAttachmentIds.push(this.existingAttachments[i].id)
        }
    }
  }

  loadExistingAttachments(){
    this.selectedAttachmentIds =[];
    this.presentLoading('Loading documents..')
    this._mailCheckService.loadExisitngAttachments({ checkId:this.checkId}).pipe( finalize(()=>{  this.loadingController.dismiss()})).subscribe( res =>{
         this.existingAttachments = res.data
        //  this.addAttachemntIdToSelectedIdsArray();
         this.manageMailDocuments();
     }) 
  }

  manageMailDocuments(){
    let attachmentIdsCount       = this.ref.mailCheckProcessData.mailCheckData[this.mailCheckIndex].attachmentIds.length;
    let attachmentsIds           = this.ref.mailCheckProcessData.mailCheckData[this.mailCheckIndex].attachmentIds;
    let existingAttachmentsCount = this.existingAttachments.length;

     for(let i=0; i<existingAttachmentsCount;i++){
       if(attachmentsIds.indexOf(this.existingAttachments[i].id) !== -1){
          this.existingAttachments[i].isMailDocument =1;
       }
     }
  }

  //deprecated from 04/11/2020 
  updateMailDocumentsFromExistingAttachments(){
    let processData ={

          checkId       : this.checkId,
          attachmentsId : this.selectedAttachmentIds
    }
    this.presentLoading('Please wait..')
    this._mailCheckService.updateMailDocumentsFromExistingAttachments(processData).pipe( finalize(()=>{ this.loadingController.dismiss(); })).subscribe( res =>{
      //  this.loadExistingAttachments();
       this.ref.getTotalMailingFee();

        //update count 
       for(let i=0 ;i<this.ref.mailCheckProcessData.mailCheckData.length;i++){
             if(this.ref.mailCheckProcessData.mailCheckData[i].checkId==this.checkId){
               this.ref.mailCheckProcessData.mailCheckData[i].attachedDocumentsCount = processData.attachmentsId.length;
               this.dismiss();
            }
       }
       this.dismiss();
       
    }) 
  }

  openAttachment(id){

    var userAgent = navigator.userAgent;
    if (/Mac|iPad|iPhone|iPod/.test(userAgent)){
       var ref = window.open();
    }
     this.presentLoading('Loading..')
     this._mailCheckService.getAttachmentUrl(id).pipe( finalize(()=>{  this.loadingController.dismiss() })).subscribe(res =>{

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

  
  dismiss() {
    this.modalCtrl.dismiss();
  }


    //deprecated from 04/11/2020 
  multiSelectHandler(id,event)
  {
      if(event.target.checked==true){
        this.selectedAttachmentIds.push(id);
      }else{
        this.selectedAttachmentIds = this.selectedAttachmentIds.filter(el => {
                  return el!=id;
        });
      }
  }

  selectHandler(id,event)
  {
      if(event.target.checked==true){
        this.ref.mailCheckProcessData.mailCheckData[this.mailCheckIndex].attachmentIds.push(id);
        this.ref.mailCheckProcessData.mailCheckData[this.mailCheckIndex].attachedDocumentsCount =  this.ref.mailCheckProcessData.mailCheckData[this.mailCheckIndex].attachedDocumentsCount +1;
        this.presentToast('Added to mail documents')
      }else{
        this.ref.mailCheckProcessData.mailCheckData[this.mailCheckIndex].attachmentIds = this.ref.mailCheckProcessData.mailCheckData[this.mailCheckIndex].attachmentIds.filter(el => {
                  return el!=id;
        });
        this.ref.mailCheckProcessData.mailCheckData[this.mailCheckIndex].attachedDocumentsCount =  this.ref.mailCheckProcessData.mailCheckData[this.mailCheckIndex].attachedDocumentsCount -1;
        this.presentToast('Removed from mail documents')
      }
      this.ref.getTotalMailingFee();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      animated:true,
    });
    toast.present();
  }
}