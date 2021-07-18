import { Component, OnInit } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { PayeeService } from '../../../../services/payee.service';
import { BankAccountService } from '../../../../services/bankAccount.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { finalize, tap, catchError } from 'rxjs/operators';
import { CheckService } from '../../../../services/check.service';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { CheckCategoryService } from '../../../../services/check-category.service';
import { of } from 'rxjs';
import { Printer } from '@ionic-native/printer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

class Port {
  public id: number;
  public name: string;
}

class Bank {
  public id: number;
  public name: string;
}

class Category {
  public id: number;
  public name: string;
}
@Component({
  selector: 'app-new-check',
  templateUrl: './new-check.page.html',
  styleUrls: ['./new-check.page.scss'],
})

export class NewCheckPage implements OnInit {

  async presentAlert(message, title = "Oops !") {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  payees: Port[];
  payee: Port;

  banks: Bank[];
  bank: Bank;

  categories: Category[];
  category: Category;

  checkNumber: string = null;
  newCheckForm: FormGroup;
  loading: boolean = false;
  showMore: boolean = false;

  //Edit check
  editMode:boolean=false;
  checkId:any;

  //clone check
  cloneCheckId:any;
  paramsSubscription:any;

  constructor(
    private payeeService: PayeeService,
    private bankAccountService: BankAccountService,
    private fb: FormBuilder,
    private checkService: CheckService,
    private checkCategoryService: CheckCategoryService,
    public alertController: AlertController,
    private router: Router,
    public loadingController: LoadingController,
    private file:File,
    private transfer:FileTransfer,
    private printer: Printer,
    private platform:Platform,
    private route: ActivatedRoute
  ) {
    this.banks = [];
  }



  ionViewDidEnter() {
    this.showMore=false;
    this.newCheckForm.reset();
    this.newCheckForm.controls['date'].setValue((new Date()).toISOString());
    this.getBankAccounts();
    this.manageEditMode();
    this.manageCloneData();
    
  }


   manageEditMode(){
      this.checkId = this.route.snapshot.paramMap.get('id');
      if(this.checkId!=null){
        this.editMode =true;
        this.setCheckData(this.checkId);
      }
   }

   manageCloneData(){
    this.paramsSubscription = this.route.queryParams.subscribe(params => {
          this.cloneCheckId = params['clone'];
          if(this.cloneCheckId!=undefined&&this.cloneCheckId!=null){
              this.setCheckData(this.cloneCheckId);
          }
        });
       console.log(this.cloneCheckId);
   }

   setCheckData(checkId){
    this.presentLoading('Loading data..');
    this.checkService.getCheckView(checkId).pipe(finalize(() => { this.loadingController.dismiss() })).subscribe( res =>{
      let checkData  = res.data;
      this.newCheckForm.patchValue({
        bankAccountId            : {id:checkData.bankAccountId,name:checkData.bankAccountName},
        payeeId                  : {id:checkData.payeeId,name:checkData.payeeName},
        checkNumber              : this.editMode==true ?  checkData.serialNumber : parseInt(checkData.serialNumber)+1,
        amount                   : checkData.amount,
        accountNumber            : checkData.accountNumber,
        invoiceNumber            : checkData.invoiceNumber,
        categoryId               : {id:checkData.categoryId,name:checkData.categoryName},
        note                     : checkData.note,
        memo                     : checkData.memo,
        checkboxAmount           : checkData.amount==0    ? true:false,
        checkboxSign             : checkData.isNoSign==1  ? true:false,
        checkboxPayee            : checkData.isNoPayee==1 ? true:false,
        checkboxDate             : checkData.isNoDate==1  ? true:false,
        date                     :checkData.isNoDate==1 ? this.newCheckForm.controls['date'].setValue(null) :checkData.date
      });
    });
   }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }

  bankChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    // console.log('bank:', event.value);
    this.checkService.getCheckSerialNumber(event.value.id).subscribe(res => {
      const controls = this.newCheckForm.controls;
      controls['checkNumber'].setValue(res.data.checkSerialNo);
    });
  }

  onCategoryChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('bank:', event.value);
  }

  ngOnInit() {
    this.initNewCheckForm();
    this.newCheckForm.controls['date'].setValue((new Date()).toISOString());
  }

  searchPorts1($event) {
    console.log(event['detail'].value)

  }

  searchPayees(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    let portName = event.text;
    event.component.startSearch();

    // Assume that we already have some PortService that return ports
    // filtered by name from our server.
    this.payeeService.getPayeeSuggest(portName).subscribe(ports => {
      event.component.items = ports.data.payees;
      event.component.endSearch();
    });
  }

  onSearchCategory(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    let portName = event.text;
    event.component.startSearch();
    console.log("EVENT");

    // Assume that we already have some PortService that return ports
    // filtered by name from our server.

    this.checkCategoryService.get(portName).subscribe(ports => {
      event.component.items = ports.data.categories;
      event.component.endSearch();
    });
  }

  getBankAccounts() {
    this.bankAccountService.getBankAccounts().subscribe(bankAccounts => {
      this.banks = bankAccounts.data.bankAccounts;
    });
  }

  initNewCheckForm() {
    this.newCheckForm = this.fb.group({
      checkNumber: [this.checkNumber],
      bankAccountId: ['', Validators.compose([
        Validators.required,

      ])],
      payeeId: ['', Validators.compose([
        Validators.required,

      ])],
      amount: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[+-]?([0-9]*[.])?[0-9]+'),
      ])],
      date: [],
      accountNumber: [
      ],
      invoiceNumber: [],
      categoryId: [''],
      note: [],
      memo: [],
      checkboxAmount: [false],
      checkboxSign: [false],
      checkboxPayee: [false],
      checkboxDate: [false],
    });

  }

  onChangeNoAmount(state) {
    if (state.target.checked) {
      const controls = this.newCheckForm.controls;
      this.presentAlert("This will enable printing without check’s amount, producing a blank check. Please Confirm?", "Warning !");
      controls['amount'].setValue(0.00);
    }
  }

  onChangeNoSignature(state) {
    if (state.target.checked) {
      this.presentAlert("This will enable printing without a signature. Please Confirm?");
    }

  }

  onChangeNoPayee(state) {

    if (state.target.checked) {
      // const controls = this.newCheckForm.controls;
      this.presentAlert("This will enable printing without check’s payee. Please Confirm?");
      // controls['payeeId'].setValue(null);
    }

  }

  onChangeNoDate(state) {

    if (state.target.checked) {
      const controls = this.newCheckForm.controls;
      this.presentAlert("This will enable printing without check’s date. Please Confirm?");
      controls['date'].setValue(null);
    } else {
      this.newCheckForm.controls['date'].setValue((new Date()).toISOString());
    }



  }

  saveCheck() {

    const controls = this.newCheckForm.controls;
    console.log(controls['checkboxAmount'].value);

    if (!controls['checkboxAmount'].value && !controls['amount'].value) {
      this.presentAlert("The check amount field is required.");
      return;
    } else if (!controls['bankAccountId'].value) {
      this.presentAlert("Please Select a Bank Account");
      return;
    } else if (!controls['checkboxPayee'].value && !controls['payeeId'].value) {
      this.presentAlert("Please Select a Payee");
      return;
    } else if (!controls['checkboxDate'].value && !controls['date'].value) {
      this.presentAlert("Please Select a Date");
      return;
    }

    this.loading = true;
    const data = this.newCheckForm.value;
    const processedData = {
      bankAccount: data.bankAccountId.id,
      checkIssueDate: data.date,
      payee: data.payeeId!=null ? data.payeeId.id :'',
      amount: data.amount,
      accountNo: data.accountNumber,
      invoiceNo: data.invoiceNumber,
      checkSerialNo: data.checkNumber,
      memo: data.memo,
      note: data.note,
      no_amount: data.checkboxAmount,
      no_sign: data.checkboxSign,
      no_payee: data.checkboxPayee,
      no_date: data.checkboxDate,
      category: data.categoryId!=null ? data.categoryId.id:'',
    }

    this.checkService.saveCheck(processedData).pipe(
      tap(res => {
        this.newCheckForm.reset();
        this.newCheckForm.controls['date'].setValue((new Date()).toISOString());
        this.router.navigateByUrl('/tabs/list');
      }),
      finalize(() => {
        this.loading = false;
      }),
      catchError(err => {
        this.loading = false;
        return of(false);
      })
    ).subscribe(res => {
    });

  }

  emailCheck() {

    const controls = this.newCheckForm.controls;
    console.log(controls['checkboxAmount'].value);

    if (!controls['checkboxAmount'].value && !controls['amount'].value) {
      this.presentAlert("The check amount field is required.");
      return;
    } else if (!controls['bankAccountId'].value) {
      this.presentAlert("Please Select a Bank Account");
      return;
    } else if (!controls['checkboxPayee'].value && !controls['payeeId'].value) {
      this.presentAlert("Please Select a Payee");
      return;
    } else if (!controls['checkboxDate'].value && !controls['date'].value) {
      this.presentAlert("Please Select a Date");
      return;
    }

    const data = this.newCheckForm.value;
    const processedData = {
      bankAccount: data.bankAccountId.id,
      checkIssueDate: data.date,
      payee: data.payeeId!=null ? data.payeeId.id :'',
      amount: data.amount,
      accountNo: data.accountNumber,
      invoiceNo: data.invoiceNumber,
      checkSerialNo: data.checkNumber,
      memo: data.memo,
      note: data.note,
      no_amount: data.checkboxAmount,
      no_sign: data.checkboxSign,
      no_payee: data.checkboxPayee,
      no_date: data.checkboxDate,
      category: data.categoryId!=null ? data.categoryId.id:'',
    }

    this.presentLoading();
    this.checkService.saveCheck(processedData).pipe(
      tap(res => {
        this.newCheckForm.reset();
        this.newCheckForm.controls['date'].setValue((new Date()).toISOString());
        this.router.navigateByUrl('/tabs/new-check-email/' + res.data.id);
      }),
      finalize(() => {
        this.loadingController.dismiss();
      }),
      catchError(err => {
        return of(false);
      })
    ).subscribe(res => {
    });


  }


  async presentLoading(message = "Please wait...") {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: message,

    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  newCheckPrint() {

    const controls = this.newCheckForm.controls;
    console.log(controls['checkboxAmount'].value);

    if (!controls['checkboxAmount'].value && !controls['amount'].value) {
      this.presentAlert("The check amount field is required.");
      return;
    } else if (!controls['bankAccountId'].value) {
      this.presentAlert("Please Select a Bank Account");
      return;
    } else if (!controls['checkboxPayee'].value && !controls['payeeId'].value) {
      this.presentAlert("Please Select a Payee");
      return;
    } else if (!controls['checkboxDate'].value && !controls['date'].value) {
      this.presentAlert("Please Select a Date");
      return;
    }

    const data = this.newCheckForm.value;
    const processedData = {
      bankAccount: data.bankAccountId.id,
      checkIssueDate: data.date,
      payee: data.payeeId!=null ? data.payeeId.id :'',
      amount: data.amount,
      accountNo: data.accountNumber,
      invoiceNo: data.invoiceNumber,
      checkSerialNo: data.checkNumber,
      memo: data.memo,
      note: data.note,
      no_amount: data.checkboxAmount,
      no_sign: data.checkboxSign,
      no_payee: data.checkboxPayee,
      no_date: data.checkboxDate,
      category: data.categoryId!=null ? data.categoryId.id:'',
      // check_status:data,
    }

    this.presentLoading('Creating check...');
    this.checkService.saveCheck(processedData).pipe(
      tap(res => {
        this.newCheckForm.reset();
        this.newCheckForm.controls['date'].setValue((new Date()).toISOString());
        this.processNewCheckPrint(res.data.id);
      }),
      finalize(() => {
        this.loadingController.dismiss();
      }),
      catchError(err => {
        return of(false);
      })
    ).subscribe(res => {
    });
  }

  processNewCheckPrint(checkId) {
  
    let queryCheckId = '';
    let queryCheckDesignTemplate = `check_design_templete=1`;
    queryCheckId = "&check_id[]=" + checkId;   // single print
    let query = `${queryCheckDesignTemplate}${queryCheckId}`;
    this.presentLoading('Processing print..');

    var userAgent = navigator.userAgent;

    // if (/Mac|iPad|iPhone|iPod/.test(userAgent)) {

    //   var ref = window.open();
    // }
    this.checkService.printCheck(query).subscribe(res => {
      this.loadingController.dismiss();

        
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
      else if (/Mac|iPad|iPhone|iPod/.test(userAgent)) {
        // ref.location = res.data.url;
        this.presentPrintWindow(res.data.url);
      } else {
        window.open(res.data.url, '_blank');
      }
      // window.open(res.data.url, '_blank');

    });

  }


  async presentPrintWindow(url) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      message: 'Allow print...?',
      buttons: [
        {
          text: 'Decline',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Allow',
          handler: () => {
            this.openPrintWindow(url);
          }
        }
      ]
    });

    await alert.present();
  }

  openPrintWindow(url){
    window.open(url, '_blank');
  }

  mailCheck(){

      const controls = this.newCheckForm.controls;
      console.log(controls['checkboxAmount'].value);

      if (!controls['checkboxAmount'].value && !controls['amount'].value) {
        this.presentAlert("The check amount field is required.");
        return;
      } else if (!controls['bankAccountId'].value) {
        this.presentAlert("Please Select a Bank Account");
        return;
      } else if (!controls['checkboxPayee'].value && !controls['payeeId'].value) {
        this.presentAlert("Please Select a Payee");
        return;
      } else if (!controls['checkboxDate'].value && !controls['date'].value) {
        this.presentAlert("Please Select a Date");
        return;
      }

      const data = this.newCheckForm.value;
      const processedData = {
        bankAccount: data.bankAccountId.id,
        checkIssueDate: data.date,
        payee: data.payeeId!=null ? data.payeeId.id :'',
        amount: data.amount,
        accountNo: data.accountNumber,
        invoiceNo: data.invoiceNumber,
        checkSerialNo: data.checkNumber,
        memo: data.memo,
        note: data.note,
        no_amount: data.checkboxAmount,
        no_sign: data.checkboxSign,
        no_payee: data.checkboxPayee,
        no_date: data.checkboxDate,
        category: data.categoryId!=null ? data.categoryId.id:'',
        // check_status:data,
      }

      this.presentLoading();
      this.checkService.saveCheck(processedData).pipe(
        tap(res => {
          this.newCheckForm.reset();
          this.newCheckForm.controls['date'].setValue((new Date()).toISOString());
          this.router.navigateByUrl('/tabs/new-check-mail/' + res.data.id);
        }),
        finalize(() => {
          this.loadingController.dismiss();
        }),
        catchError(err => {
          return of(false);
        })
      ).subscribe(res => {
      });


  }





  updateCheck(){
     
    const controls = this.newCheckForm.controls;
    console.log(controls['checkboxAmount'].value);

    if (!controls['checkboxAmount'].value && !controls['amount'].value) {
      this.presentAlert("The check amount field is required.");
      return;
    } else if (!controls['bankAccountId'].value) {
      this.presentAlert("Please Select a Bank Account");
      return;
    } else if (!controls['checkboxPayee'].value && !controls['payeeId'].value) {
      this.presentAlert("Please Select a Payee");
      return;
    } else if (!controls['checkboxDate'].value && !controls['date'].value) {
      this.presentAlert("Please Select a Date");
      return;
    }

    this.loading = true;
    const data = this.newCheckForm.value;
    let processedData = {
      checkId    :this.checkId,
      bankAccount: data.bankAccountId.id,
      checkIssueDate: data.date,
      payee: data.payeeId!=null ? data.payeeId.id :'',
      amount: data.amount,
      accountNo: data.accountNumber,
      invoiceNo: data.invoiceNumber,
      checkSerialNo: data.checkNumber,
      memo: data.memo,
      note: data.note,
      no_amount: data.checkboxAmount,
      no_sign: data.checkboxSign,
      no_payee: data.checkboxPayee,
      no_date: data.checkboxDate,
      category: data.categoryId!=null ? data.categoryId.id:'',
    }
    
   
    this.checkService.updateCheck(processedData).pipe(
      tap(res => {
        this.newCheckForm.reset();
        this.newCheckForm.controls['date'].setValue((new Date()).toISOString());
        this.showMore=false;
        this.router.navigateByUrl('/tabs/list');
      }),
      finalize(() => {
        this.loading = false;
      }),
      catchError(err => {
        this.loading = false;
        return of(false);
      })
    ).subscribe(res => {
    });
  }


  ionViewDidLeave() {
    this.paramsSubscription.unsubscribe();
  }


  onKeyPressAmount(event){
      const pattern = /[0-9.]/;
      let inputChar = String.fromCharCode(event.charCode);
      if (!pattern.test(inputChar)) {
        return false;
        event.preventDefault();
      }

      var regexp = /^[0-9]*\.[0-9][0-9]$/;
      if(regexp.test(event.target.value)){
        return false;
      }

  }













    // numberOnlyValidation(event: any) {
  //   console.log("EV : " , event.target.value);
  //   console.log("EV : " , event.target.value);

  //   const pattern = /[0-9.]/;
  //   let inputChar = String.fromCharCode(event.charCode);

  //   if (!pattern.test(inputChar)) {
  //     // invalid character, prevent input
  //     event.preventDefault();
  //   }
  // }


   
 

}
