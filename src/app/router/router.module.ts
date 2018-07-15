import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent} from '../homepage/homepage.component';
import {RegistrationLoginComponent} from '../registration-login/registration-login.component';
import {DashboardComponent} from '../admin/dashboard/dashboard.component';
import {LearnMoreComponent} from '../learn-more/learn-more.component';
import {NeighboursComponent} from "../neighbours/neighbours.component";
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { SearchProductsComponent } from "../search-products/search-products.component";
import { CheckoutComponent } from "../checkout/checkout.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: HomepageComponent
      },
      {
        path: 'registration',
        component: RegistrationLoginComponent
      },
      {
        path: 'login',
        component: RegistrationLoginComponent
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
      },
      {
        path:'neighbours',
        component : NeighboursComponent
      },
      {
        path: 'product/:id',
        component : ProductDetailsComponent
      },
      {
        path: 'searchproduct/:category',
        component: SearchProductsComponent
      },
      {
        path: 'checkout',
        component: CheckoutComponent
      }
      
    ], { useHash: false })
  ],
  exports: [RouterModule]
})
export class AppRouterModule { }
