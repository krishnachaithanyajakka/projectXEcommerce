import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent} from '../homepage/homepage.component';
import {RegistrationComponent} from '../registration/registration.component';
import {DashboardComponent} from '../admin/dashboard/dashboard.component';
import {LearnMoreComponent} from '../learn-more/learn-more.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: HomepageComponent
      },
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: 'admin',
        component : DashboardComponent
      },
      {
        path: 'learn-more',
        component : LearnMoreComponent,
        children: [
          {
            path: '', 
            component: LearnMoreComponent
          }
        ]
      }
      
    ], { useHash: false })
  ],
  exports: [RouterModule]
})
export class AppRouterModule { }
