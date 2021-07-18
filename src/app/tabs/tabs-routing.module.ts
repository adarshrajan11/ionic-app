import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { CompanySwitchingGuardService as CompanySwitchingGuard  } from '../services/company-switching-guard.service';
import { AuthGuardService as AuthGuard } from '../auth/auth-guard.service';

const routes: Routes = [
  {
    path: '', canActivate:[AuthGuard,CompanySwitchingGuard],
    component: TabsPage,
    children: [
      {
        path: 'home', canActivate:[AuthGuard,CompanySwitchingGuard],
        loadChildren: () => import('../pages/user-pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'list', canActivate:[CompanySwitchingGuard,AuthGuard],
        loadChildren: () => import('../pages/user-pages/checks/check-list/check-list.module').then(m => m.CheckListPageModule)
      },
      {
        path: 'bank-account', canActivate:[AuthGuard,CompanySwitchingGuard],
        loadChildren: () => import('../pages/user-pages/bank-accounts/bank-account/bank-account.module').then( m => m.BankAccountPageModule)
      },
      {
        path: 'new-check', canActivate:[AuthGuard,CompanySwitchingGuard],
        loadChildren: () => import('../pages/user-pages/checks/new-check/new-check.module').then( m => m.NewCheckPageModule)
      },
      {
        path: 'edit-check/:id', canActivate:[AuthGuard,CompanySwitchingGuard],
        loadChildren: () => import('../pages/user-pages/checks/new-check/new-check.module').then( m => m.NewCheckPageModule)
      },
      {
        path: 'payee-list', canActivate:[AuthGuard,CompanySwitchingGuard],
        loadChildren: () => import('../pages/user-pages/payee/payee-list/payee-list.module').then( m => m.PayeeListPageModule)
      },
      {
        path: 'received-check', canActivate:[AuthGuard,CompanySwitchingGuard],
        loadChildren: () => import('../pages/user-pages/received-check/received-check.module').then( m => m.ReceivedCheckPageModule)
      },
      {
        path: 'company-switch', canActivate:[AuthGuard,CompanySwitchingGuard],
        loadChildren: () => import('../pages/user-pages/company-switch/company-switch.module').then( m => m.CompanySwitchPageModule)
      },
      {
        path: 'add-payee', canActivate:[AuthGuard,CompanySwitchingGuard],
        loadChildren: () => import('../pages/user-pages/payee/add-payee/add-payee.module').then( m => m.AddPayeePageModule)
      },
      {
        path: 'add-payee/:id', canActivate:[AuthGuard,CompanySwitchingGuard],
        loadChildren: () => import('../pages/user-pages/payee/add-payee/add-payee.module').then( m => m.AddPayeePageModule)
      },
      {
        path: 'check-model', canActivate:[AuthGuard,CompanySwitchingGuard],
        loadChildren: () => import('../pages/user-pages/bank-accounts/check-model/check-model.module').then( m => m.CheckModelPageModule)
      },
      {
        path: 'check-single-design', canActivate:[AuthGuard,CompanySwitchingGuard],
        loadChildren: () => import('../pages/user-pages/bank-accounts/check-single-design/check-single-design.module').then( m => m.CheckSingleDesignPageModule)
      },
      {
        path: 'new-check-email/:checkId', canActivate:[AuthGuard,CompanySwitchingGuard],
        loadChildren: () => import('../pages/user-pages/checks/new-check-email/new-check-email.module').then( m => m.NewCheckEmailPageModule)
      },
      {
        path: 'new-check-mail/:checkId', canActivate:[AuthGuard,CompanySwitchingGuard],
        loadChildren: () => import('../pages/user-pages/checks/new-check-mail/new-check-mail.module').then( m => m.NewCheckMailPageModule)
      },
      {
        path: 'check-request',  canActivate:[AuthGuard,CompanySwitchingGuard],
        loadChildren: () => import('../pages/user-pages/check-request/check-request.module').then( m => m.CheckRequestPageModule)
      },
      {
        path: 'received-check-request',canActivate:[AuthGuard,CompanySwitchingGuard],
        loadChildren: () => import('../pages/user-pages/check-request/received-check-request/received-check-request.module').then( m => m.ReceivedCheckRequestPageModule)
      },
      // {
      //   path: 'tab3',
      //   loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      // },
      {
        path: '',
        redirectTo: '/home', canActivate:[AuthGuard,CompanySwitchingGuard],
        pathMatch: 'full'
      },

      {
        path: 'approval-list', canActivate:[AuthGuard,CompanySwitchingGuard],
        loadChildren: () => import('../pages/user-pages/checks/approval-list/approval-list.module').then( m => m.ApprovalListPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: '/home', canActivate:[AuthGuard,CompanySwitchingGuard],
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
