import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {

  constructor( private router: Router,
               private platform:Platform,
               private googlePlus: GooglePlus,
               private facebook: Facebook

                ) { }

  ngOnInit() {
    this.logout()
  }

  ionViewWillEnter() {
    
  }
  ionViewDidEnter() {
    
  }


  logout(){
    localStorage.clear();
    this.router.navigate(['login']);

    // if(this.platform.is('cordova')){
    //    this.googlePlus.disconnect();

    // }
  }
}
