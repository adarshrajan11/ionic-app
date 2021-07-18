import { Component, OnInit } from '@angular/core';
import { PayeeService } from '../../services/payee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, NavParams, LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { tap, finalize, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-payee-update-modal',
  templateUrl: './payee-update-modal.component.html',
  styleUrls: ['./payee-update-modal.component.scss'],
})
export class PayeeUpdateModalComponent implements OnInit {

  constructor(
          private _payeeService: PayeeService,
          private fb: FormBuilder,
          public alertController: AlertController,
          private router: Router,
		  private activatedRoute: ActivatedRoute,
		  private modalCtrl: ModalController,
		  private navParams: NavParams,
		  public loadingController: LoadingController,
        ) { }
  

payeeForm: FormGroup;
ref:any; 
payeeId: string = null;

ngOnInit(){
		this.initPayeeForm();
		this.payeeId = this.navParams.get('payeeId');
		this.loadPayeeData(this.payeeId);
  }

ionViewDidEnter() {
	
}
  loadPayeeData(payeeId){
    this._payeeService.showPayee(payeeId).pipe(finalize(() => {})).subscribe( res =>{
      this.setPayeeFormValue(res.data)
   });
  }

  
  dismiss() {
    this.modalCtrl.dismiss();
  }


  setPayeeFormValue(data){

    const controls = this.payeeForm.controls;
		let payee = this.activatedRoute.snapshot.params;

		controls['id'].setValue(data.id != 'null' ? data.id : '');
		controls['name'].setValue(data.name != 'null' ? data.name : '');
		controls['nick_name'].setValue(data.nickName != 'null' ? data.nickName : '');
		controls['company_name'].setValue(data.company != 'null' ? data.company : '');
		controls['email'].setValue(data.email != 'null' ? data.email : '');
		controls['phone'].setValue(data.phone != 'null' ? data.phone : '');
		controls['address1'].setValue(data.address1 != 'null' ? data.address1 : '');
		controls['address2'].setValue(data.address2 != 'null' ? data.address2 : '');
		controls['city'].setValue(data.city != 'null' ? data.city : '');
		controls['state'].setValue(data.state != 'null' ? data.state : '');
		controls['zip'].setValue(data.zip != 'null' ? data.zip : '');
		controls['country'].setValue(data.country != 'null' ? data.country : '');

  }


	initPayeeForm() {
		this.payeeForm = this.fb.group({
			name: ['', Validators.compose([
				Validators.required,
				Validators.maxLength(255)
			])],
			id: null,
			nick_name: ['', Validators.compose([
				// Validators.required,
				// Validators.minLength(3),
				Validators.maxLength(255)
			])],
			company_name: ['', Validators.compose([
				// Validators.required,
				// Validators.minLength(3),
				Validators.maxLength(255)
			])],
			phone: ['', Validators.compose([
				// Validators.required,
				Validators.maxLength(15),
				Validators.pattern('^[0-9]*$'),
			])],
			email: [null, Validators.compose([
				// Validators.required,
				Validators.email,
				// Validators.minLength(3),
				// Validators.maxLength(255),
			])],
			address1: ['', Validators.compose([
				// Validators.required,
				// Validators.minLength(3),
				Validators.maxLength(255)
			])],
			address2: ['', Validators.compose([
				// Validators.required,
				// Validators.minLength(3),
				Validators.maxLength(255)
			])],
			city: ['', Validators.compose([
				// Validators.required,
				// Validators.minLength(3),
				Validators.maxLength(255)
			])],
			state: ['', Validators.compose([
				// Validators.required,
				// Validators.minLength(3),
				Validators.maxLength(255)
			])],
			zip: ['', Validators.compose([
				// Validators.required,
				Validators.maxLength(5),
				Validators.pattern('^[0-9]*$'),
			])],
			country: ['', Validators.compose([
				// Validators.required,
			])],
		});
	}


	
	onUpdate(){
		const data = this.payeeForm.value;
        if(data.name==undefined||data.name==''){
			this.presentAlert('Please enter name');
			return;
		}

		this.presentLoading('Updating..')
		this._payeeService.update(data).pipe(
			tap(res => {

			}),
			finalize(() => {
			  this.loadingController.dismiss();
			}),
			catchError(err => {
				return of(false);
			})
		).subscribe(res => {
			if (res){
				this.ref.doAfterPayeeUpdate();
				this.payeeForm.reset();
				this.dismiss();
			}
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


}
