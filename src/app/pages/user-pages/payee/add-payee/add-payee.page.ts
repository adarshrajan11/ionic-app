import { Component, OnInit } from '@angular/core';
import { PayeeService } from '../../../../services/payee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { tap, finalize, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
	selector: 'app-add-payee',
	templateUrl: './add-payee.page.html',
	styleUrls: ['./add-payee.page.scss'],
})
export class AddPayeePage implements OnInit {

	payeeForm: FormGroup;
	loading: boolean = false;
	isUpdate: boolean = false;
	payeeId: string = null;

	async presentAlert(message, title = "Oops !") {
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			header: title,
			message: message,
			buttons: ['OK']
		});
		await alert.present();
	}

	constructor(
		private _payeeService: PayeeService,
		private fb: FormBuilder,
		public alertController: AlertController,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) { }

	ngOnInit() {
		this.initPayeeForm();
		this.payeeId = this.activatedRoute.snapshot.paramMap.get('id');
	}

	ionViewDidEnter() {
		this.setPayeeForm();
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

	onSave() {
		const controls = this.payeeForm.controls;
		const data = this.payeeForm.value;
		

		if(data.name==''||data.name==undefined){
			this.presentAlert('Please enter name');
			return;
		}
         

		this.loading = true;
		this._payeeService.save(data).pipe(
			tap(res => {

			}),
			finalize(() => {
				this.loading = false;
			}),
			catchError(err => {
				this.loading = false;
				return of(false);
			})
		).subscribe(res => {
			if(res){
				this.payeeForm.reset();
				this.router.navigateByUrl('/tabs/payee-list');
			}
		});

	}

	setPayeeForm() {
		const controls = this.payeeForm.controls;
		let payee = this.activatedRoute.snapshot.params;

		controls['id'].setValue(payee.id != 'null' ? payee.id : '');
		controls['name'].setValue(payee.name != 'null' ? payee.name : '');
		controls['nick_name'].setValue(payee.nickName != 'null' ? payee.nickName : '');
		controls['company_name'].setValue(payee.company != 'null' ? payee.company : '');
		controls['email'].setValue(payee.email != 'null' ? payee.email : '');
		controls['phone'].setValue(payee.phone != 'null' ? payee.phone : '');
		controls['address1'].setValue(payee.address1 != 'null' ? payee.address1 : '');
		controls['address2'].setValue(payee.address2 != 'null' ? payee.address2 : '');
		controls['city'].setValue(payee.city != 'null' ? payee.city : '');
		controls['state'].setValue(payee.state != 'null' ? payee.state : '');
		controls['zip'].setValue(payee.zip != 'null' ? payee.zip : '');
		controls['country'].setValue(payee.country != 'null' ? payee.country : '');
	}

	onUpdate() {
		const data = this.payeeForm.value;
		if(data.name==''||data.name==undefined){
			this.presentAlert('Please enter name');
			return;
		}
		this.loading = true;
		const message = "Added New Payee";
		this._payeeService.update(data).pipe(
			tap(res => {

			}),
			finalize(() => {
				this.loading = false;
			}),
			catchError(err => {
				this.loading = false;
				return of(false);
			})
		).subscribe(res => {
			if (res) {
				this.payeeForm.reset();
				this.router.navigateByUrl('/tabs/payee-list');
			}
		});

	}

}
