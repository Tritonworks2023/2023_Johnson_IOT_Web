import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AgmOverlays } from 'agm-overlays';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ng6-toastr-notifications';
import * as $ from 'jquery';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoginComponent } from './login/login.component'
import { DataService } from './provider/data.service';
import { BranchComponent } from './branch/branch.component';
import { TableModule } from 'primeng/table';
import { ManageUserDetailsComponent } from './manage-user-details/manage-user-details.component';
import { LiftStatusComponent } from './lift-status/lift-status.component';
import { ProjectLayoutsComponent } from './project-layouts/project-layouts.component';
import { UserTypeComponent } from './user-type/user-type.component';
import { AppMaterialModules } from './material.module';
import { LoginUserComponent } from './user-type/login-user/login-user.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    LoginComponent,
    BranchComponent,
    LoginUserComponent,
    ManageUserDetailsComponent,
    LiftStatusComponent,
    ProjectLayoutsComponent,
    UserTypeComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,AppMaterialModules,
    LayoutModule,
    HttpClientModule,
    AgmOverlays,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    TableModule,
    ToastrModule.forRoot(),
    // AgmCoreModule.forRoot({
    //   // please get your own API key here:
    //   // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
    //   apiKey: 'AIzaSyC3v_a-fCIXOhPdCdmYBY6DVKw59CvwIJ8'
    // })
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDap8qav1flUsql0VWUYkjgB0noN0o_U1Y'
    })
  ],
  providers: [DataService,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
