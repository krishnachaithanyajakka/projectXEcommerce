import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent} from '../homepage/homepage.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: HomepageComponent
      }
    ], { useHash: false })
  ],
  exports: [RouterModule]
})
export class AppRouterModule { }
