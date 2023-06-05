import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../layout/layout.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FooterComponent } from './component/footer/footer.component';
import { EntrapmentComponent } from './component/table/entrapment/entrapment.component';
import { Down2LiftsComponent } from './component/table/down2-lifts/down2-lifts.component';
import { StateComponent } from './component/table/state/state.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { MapsComponent } from './component/maps/maps.component';
import { AgmCoreModule } from '@agm/core';
import { AbatComponent } from './component/table/abat/abat.component';
import { EpatComponent } from './component/table/epat/epat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AddUserComponent } from './add-user/add-user.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    FooterComponent,
    EntrapmentComponent,
    Down2LiftsComponent,
    StateComponent,
    MapsComponent,
    AbatComponent,
    EpatComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    LayoutRoutingModule,
    AgmCoreModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    
  ],
  exports: [NgxSpinnerModule],
})
export class LayoutModule { }
