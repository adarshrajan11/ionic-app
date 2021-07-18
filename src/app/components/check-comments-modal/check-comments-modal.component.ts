import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController, AlertController } from '@ionic/angular';
import { CheckService } from 'src/app/services/check.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-check-comments-modal',
  templateUrl: './check-comments-modal.component.html',
  styleUrls: ['./check-comments-modal.component.scss'],
})
export class CheckCommentsModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController,
               private navParams: NavParams,
               private _checkService:CheckService,
               public alertController: AlertController,
               public loadingController: LoadingController) { }

  
ref:any;   //CheckList ref
checkId:any;
comments:any=[];
newComment:any='';
showLoadingSpinner:boolean=false;


  dismiss(){
     this.modalCtrl.dismiss();
  }

  ngOnInit(){
    this.ref              = this.navParams.get('ref');
    this.checkId          = this.navParams.get('checkId');
    this.loadAllComments();
  }

  loadAllComments(){
     this.showLoadingSpinner=true;
     this._checkService.getAllCheckComments(this.checkId).pipe(finalize(()=>{ this.showLoadingSpinner =false})).subscribe(res =>{
           this.comments = res.data.comments;
     })
  }

  addNewComment(){

     if(this.newComment==''){
       this.presentAlert('Please enter your comment')
       return;
     }

    let data ={
      comment :this.newComment
    }
    this.presentLoading();
    this._checkService.addNewCheckComment(this.checkId,data).pipe(finalize(()=>{ this.loadingController.dismiss() })).subscribe(res =>{
         this.newComment='';
         this.loadAllComments();
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
