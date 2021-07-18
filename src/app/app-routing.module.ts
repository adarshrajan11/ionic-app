import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './auth/logout/logout.component';
import { AuthGuardService as AuthGuard, AuthGuardService} from './auth/auth-guard.service';
import { GuestGuardService as GuestGuard } from './auth/guest-guard.service';
import { CompanySwitchingGuardService as CompanySwitchingGuard } from './services/company-switching-guard.service';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', canActivate:[GuestGuard],  loadChildren: () => import('./pages/auth-pages/login/login.module').then( m => m.LoginPageModule)},
  {
    path: 'register', canActivate:[GuestGuard],
    loadChildren: () => import('./pages/auth-pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forget-password', canActivate:[GuestGuard],
    loadChildren: () => import('./pages/auth-pages/forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'submit-otp', canActivate:[GuestGuard],
    loadChildren: () => import('./pages/auth-pages/submit-otp/submit-otp.module').then( m => m.SubmitOtpPageModule)
  },
  {
    path: 'reset-password', canActivate:[GuestGuard],
    loadChildren: () => import('./pages/auth-pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  // },
  {
    path: 'logout', canActivate:[AuthGuard],
    component: LogoutComponent,
  },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  {
    path: 'tabs', 
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  // {
  //   path: 'list',
  //   loadChildren: () => import('./list/list.module').then( m => m.ListPageModule)
  // },
  {
    path: 'notifications',  canActivate:[AuthGuard],
    loadChildren: () => import('./pages/user-pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'view-check/:id', canActivate:[AuthGuard,CompanySwitchingGuard],
    loadChildren: () => import('./pages/user-pages/checks/view-check/view-check.module').then( m => m.ViewCheckPageModule)
  },
  {
    path: 'bank-check-preview', canActivate:[AuthGuard,CompanySwitchingGuard],
    loadChildren: () => import('./pages/user-pages/bank-accounts/bank-check-preview/bank-check-preview.module').then( m => m.BankCheckPreviewPageModule)
  },
  {
    path: 'company-switch', canActivate:[AuthGuard],
    loadChildren: () => import('./pages/user-pages/company-switch/company-switch.module').then( m => m.CompanySwitchPageModule)
  },
  {
    path: 'user-verification-email', canActivate:[AuthGuard],
    loadChildren: () => import('./pages/user-pages/users/user-verification/user-verification.module').then( m => m.UserVerificationPageModule)
  },
  {
    path: 'user-verification-phone',  canActivate:[AuthGuard],
    loadChildren: () => import('./pages/user-pages/users/user-verification-phone/user-verification-phone.module').then( m => m.UserVerificationPhonePageModule)
  },
  {
    path: 'bank-verification', canActivate:[AuthGuard,CompanySwitchingGuard],
    loadChildren: () => import('./pages/user-pages/bank-accounts/bank-verification/bank-verification.module').then( m => m.BankVerificationPageModule)
  },
  {
    path: 'multi-mail-check',
    loadChildren: () => import('./pages/user-pages/checks/multi-mail-check/multi-mail-check.module').then( m => m.MultiMailCheckPageModule)
  },
  {
    path: 'welcome-slide',
    loadChildren: () => import('./pages/outside-pages/welcome-slide/welcome-slide.module').then( m => m.WelcomeSlidePageModule)
  },
  {
    path: 'user-profile', canActivate:[AuthGuard],
    loadChildren: () => import('./pages/user-pages/users/user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },


 




  // {
  //   path: 'received-check',
  //   loadChildren: () => import('./received-check/received-check.module').then( m => m.ReceivedCheckPageModule)
  // },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
