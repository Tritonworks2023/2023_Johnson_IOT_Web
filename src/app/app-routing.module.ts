import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layout/component/dashboard/dashboard.component';
import { MapsComponent } from './layout/component/maps/maps.component';
import { Down2LiftsComponent } from './layout/component/table/down2-lifts/down2-lifts.component';
import { EntrapmentComponent } from './layout/component/table/entrapment/entrapment.component';
import { StateComponent } from './layout/component/table/state/state.component';
import { LayoutComponent } from './layout/layout.component';
import { AbatComponent } from './layout/component/table/abat/abat.component';
import { EpatComponent } from './layout/component/table/epat/epat.component';
import {LoginComponent} from './login/login.component';
import {AddUserComponent} from './layout/add-user/add-user.component';
import {BranchComponent} from './branch/branch.component';
import { UserTypeComponent } from './user-type/user-type.component';
import { ProjectLayoutsComponent } from './project-layouts/project-layouts.component';
import { LiftStatusComponent } from './lift-status/lift-status.component';
import { ManageUserDetailsComponent } from './manage-user-details/manage-user-details.component';
import { LoginUserComponent } from './user-type/login-user/login-user.component';


const routes: Routes = [ { path: 'login/user', component: LoginUserComponent },
  {
    path:'',
    component:LoginComponent,
  },
  {
    path:'login',
    component:LoginComponent,
  },
  {
    path: 'layout',
    redirectTo: 'maps',
    pathMatch: 'full'
  },
  {
    path:'layout',
    component : LayoutComponent,


  children: [{
      path:'dashboard',
      component : DashboardComponent,

  },
  {
    path:'down2',
    component : Down2LiftsComponent,
  },
  {
    path:'entrapment',
    component : EntrapmentComponent,
  },
  {
    path:'state',
    component : StateComponent,
  },
  {
    path:'maps',
    component : MapsComponent,
  },
  {
    path:'abat',
    component : AbatComponent,
  },
  {
    path:'ebat',
    component : EpatComponent,
  },
  {
    path:'user',
    component : AddUserComponent,
  },
  {
    path:'branch',
    component:BranchComponent
  },
  {
    path: '',
    redirectTo: 'maps',
    pathMatch: 'full'
  },

  //Mani
  { path: 'user-type', component: UserTypeComponent },
  { path: 'project-layouts', component: ProjectLayoutsComponent },
  { path: 'lift-status', component: LiftStatusComponent },
  { path: 'manage-user', component: ManageUserDetailsComponent },
 
  
]
}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
