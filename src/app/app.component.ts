import { Component, QueryList, ViewChildren } from '@angular/core';

import { Platform, IonRouterOutlet, NavController, LoadingController, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { CompanyManagementService } from './services/company-management.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {


  public appPages = [
    // {
    //   title: 'Dashboard',
    //   url: '/tabs/home',
    //   icon: 'home'
    // },
    {
      title: 'Check List',
      url: '/tabs/list',
      icon: 'list'
    },
    {
      title: 'New Check',
      url: '/tabs/new-check',
      icon: 'add-circle'
    },
    {
      title: 'Request a check',
      url: '/tabs/check-request',
      icon: 'play-circle'
    },
    {
      title: 'Approve check',
      url: '/tabs/received-check-request',
      icon: 'checkmark-circle'
    },
    {
      title: 'Received Check',
      url: '/tabs/received-check',
      icon: 'return-left'
    },
    {
      title: 'Payee List',
      url: '/tabs/payee-list',
      icon: 'contact'
    },
    {
      title: 'Bank Accounts',
      url: '/tabs/bank-account',
      icon: 'filing'
    },
    {
      title: 'Switch company',
      url: '/company-switch',
      icon: 'sync'
    },
    {
      title: 'Verify Bank Account',
      url: '/bank-verification',
      icon: 'done-all'
    },
  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authService: AuthService,
    public userService: UserService,
    public router: Router,
    public navController:NavController,
    public _companyManagementService:CompanyManagementService,
    public loadingController: LoadingController, 
    private modalController: ModalController
  ) {
    this.initializeApp();
   
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
        this.platform.backButton.subscribe( () => {
          this.backButtonAction();
        });

    });

  }

  async backButtonAction(){
      const element =await this.modalController.getTop();
      this.platform.backButton.subscribe( () => {
        if (element) {
            element.dismiss();
          return;
        }
      if (this.router.url == "/tabs/list"||this.router.url == "/login") {
        if(window.confirm('Are you sure you want to exit the app?')){
          navigator['app'].exitApp();
        }
      }else{
        this.navController.back();
      }
    });
  }

  
getUserVerificationStatus(){
    this.userService.getUserVerificationStatus().subscribe( res =>{
      if(res.data.emailVerified&&res.data.phoneVerified){
        this.userService.userVerified =true;
      }

   });
}

logout(){
  this.presentLoading();
  this.authService.logout().subscribe( res =>{
     this.authService.logoutApp();
     this.loadingController.dismiss();
  });
}

async presentLoading(message ='Please wait...') {
  const loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: message,
  
  });
  await loading.present();

  const { role, data } = await loading.onDidDismiss();
}

  
}
