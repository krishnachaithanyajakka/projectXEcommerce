import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './homepage/navbar/navbar.component';
import { AppRouterModule } from './router/router.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CarouselComponent } from './homepage/carousel/carousel.component';
import { ImageSliderComponent } from './homepage/image-slider/image-slider.component';
import { VerticalSliderComponent } from './homepage/vertical-slider/vertical-slider.component';
import { ItemlistComponent } from './homepage/itemlist/itemlist.component';
import { FavBrandsComponent } from './homepage/fav-brands/fav-brands.component';
import { CategoryTabsComponent } from './homepage/category-tabs/category-tabs.component';
import {MatTabsModule} from '@angular/material/tabs';
import { BigSalesTabsComponent } from './homepage/big-sales-tabs/big-sales-tabs.component';
import { ApplicantColouselComponent } from './homepage/applicant-colousel/applicant-colousel.component';
import { FooterComponent } from './footer/footer.component';
import { LocationautocompleteDirective} from './homepage/locationautocomplete/locationautocomplete.component';
import { RegistrationComponent } from './registration/registration.component';
import { CustomValidators } from './validator/customValidator';
import {RegistrationService} from './registration/registration.service';
import { DocUploadComponent } from './doc-upload/doc-upload.component';
import { UploadserviceService } from './doc-upload/uploadservice.service';
import { LoginService } from './homepage/navbar/service/login.service';
import {LoginemitterService} from './utility/loginemitter.service';
import {Customer} from './pojo/Customer';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SidebarComponent } from './admin/dashboard/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    NavbarComponent,
    CarouselComponent,
    ImageSliderComponent,
    VerticalSliderComponent,
    ItemlistComponent,
    FavBrandsComponent,
    CategoryTabsComponent,
    BigSalesTabsComponent,
    ApplicantColouselComponent,
    FooterComponent,
    LocationautocompleteDirective,
    RegistrationComponent,
    DocUploadComponent,
    DashboardComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatTabsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAMUoLtPjDAaRuqGkLCGRdwuvIo-JcVUVQ'
    })
  ],
  providers: [
    RegistrationService,
    CustomValidators,
    UploadserviceService,
    LoginemitterService,
    LoginService,
    Customer
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
