import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent} from '../homepage/homepage.component';
import {RegistrationComponent} from '../registration/registration.component';

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
      }
    ], { useHash: false })
  ],
  exports: [RouterModule]
})
export class AppRouterModule { }
