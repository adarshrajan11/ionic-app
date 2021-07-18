import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// installed modules
import { IonicSelectableModule } from 'ionic-selectable';

import { CheckListPopoverComponent } from './components/check-list-popover/check-list-popover.component';
import { BankAccountListPopoverComponent } from './components/bank-account-list-popover/bank-account-list-popover.component';
import { PayeeListPopoverComponent } from './components/payee-list-popover/payee-list-popover.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './auth/logout/logout.component';
import { ReceivedCheckPopoverComponent } from './components/received-check-popover/received-check-popover.component';
import { IonicStorageModule } from '@ionic/storage';
import { Printer } from '@ionic-native/printer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { MailEnvelopModalComponent } from './components/mail-envelop-modal/mail-envelop-modal.component';
import { ShipAddresModalComponent } from './components/ship-addres-modal/ship-addres-modal.component';
import { ExistingAttachmentModalComponent } from './components/existing-attachment-modal/existing-attachment-modal.component';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { BankAccountUpdateModalComponent } from './components/bank-account-update-modal/bank-account-update-modal.component';
import { BankUpdateModalComponent } from './components/bank-update-modal/bank-update-modal.component';
import { PayeeUpdateModalComponent } from './components/payee-update-modal/payee-update-modal.component';
import { CheckCommentsModalComponent } from './components/check-comments-modal/check-comments-modal.component';
import { CheckAttachementModalComponent } from './components/check-attachement-modal/check-attachement-modal.component';
import { CheckActiviytModalComponent } from './components/check-activiyt-modal/check-activiyt-modal.component';
import { CheckRequestPopoverComponent } from './components/check-request-popover/check-request-popover.component';
import { NewCheckRequestModalComponent } from './components/new-check-request-modal/new-check-request-modal.component';
import { ReceivedCheckRequestPopoverComponent } from './components/received-check-request-popover/received-check-request-popover.component';
import { ApproveCheckRequestModalComponent } from './components/approve-check-request-modal/approve-check-request-modal.component';




@NgModule({
  declarations: [
    AppComponent,
    CheckListPopoverComponent,
    PayeeListPopoverComponent,
    ReceivedCheckPopoverComponent,
    BankAccountListPopoverComponent,
    LogoutComponent,
    MailEnvelopModalComponent,
    ShipAddresModalComponent,
    ExistingAttachmentModalComponent,
    BankAccountUpdateModalComponent,
    BankUpdateModalComponent,
    PayeeUpdateModalComponent,
    CheckCommentsModalComponent,
    CheckAttachementModalComponent,
    CheckActiviytModalComponent,
    CheckRequestPopoverComponent,
    NewCheckRequestModalComponent,
    ReceivedCheckRequestPopoverComponent,
    ApproveCheckRequestModalComponent,
  ],

  entryComponents: [
    CheckListPopoverComponent,
    PayeeListPopoverComponent,
    ReceivedCheckPopoverComponent,
    BankAccountListPopoverComponent,
    MailEnvelopModalComponent,
    ShipAddresModalComponent,
    ExistingAttachmentModalComponent,
    BankAccountUpdateModalComponent,
    BankUpdateModalComponent,
    PayeeUpdateModalComponent,
    CheckCommentsModalComponent,
    CheckAttachementModalComponent,
    CheckActiviytModalComponent,
    CheckRequestPopoverComponent,
    NewCheckRequestModalComponent,
    ReceivedCheckRequestPopoverComponent,
    ApproveCheckRequestModalComponent,
  ],
  
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    BrowserAnimationsModule, 
    IonicSelectableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Printer,
    DocumentViewer,
    FileTransfer,
    File,
    GooglePlus,
    Facebook,
   
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
