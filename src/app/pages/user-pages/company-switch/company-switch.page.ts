import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CompanyManagementService } from 'src/app/services/company-management.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-company-switch',
  templateUrl: './company-switch.page.html',
  styleUrls: ['./company-switch.page.scss'],
})
export class CompanySwitchPage implements OnInit {


  segment:any=this.companyManagementService.getActiveCompanyType()=='owncmp' ||
              this.companyManagementService.getActiveCompanyType()=='invcomp' ?
              this.companyManagementService.getActiveCompanyType() :'owncmp';
  allCompanies:any=[]; 
  activeCompanyId:any;
  
  constructor(public alertController: AlertController,
              public companyManagementService: CompanyManagementService,
              private router:Router
              ) {

                console.log(this.companyManagementService.getActiveCompanyType())
              }

  async companySwitchOkay() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Company Change',
      message: 'Do you agree to change this company?',
      buttons: ['Disagree', 'Agree']
    });

    await alert.present();
  }

  ionViewDidEnter(){
    this.loadAllCompanies();
  }

  loadAllCompanies(){
    this.companyManagementService.getAllCompanies().subscribe(res =>{
       this.allCompanies = res.data;
    })
  }

  onChangeCompany(event,companyName,type){
    console.log(event.target.value)
    this.companyManagementService.setActiveCompanyInfo(event.target.value,companyName,type);
    this.router.navigateByUrl('/tabs/list');

  }


  ngOnInit() {
   
  }

}
