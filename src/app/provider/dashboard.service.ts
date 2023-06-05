import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { 

  }
 getCount(): Observable<any>{
  
    return this.http.get(environment.baseurl+'activity/dashboard_two');
  }
  getState(): Observable<any>{
  
    return this.http.get(environment.baseurl+'activity/dashboard_one');
  }
  getDown1(): Observable<any>{
  
    return this.http.get(environment.baseurl+'activity/brdn_list_no_null');
  }
  getDown(): Observable<any>{
  
    return this.http.get(environment.baseurl+'activity/brdn_list');
  }
  getEpart(): Observable<any>{
  
    return this.http.get(environment.baseurl+'activity/entrap_list');
  }
  getEntrap(): Observable<any>{
  
    return this.http.get(environment.baseurl+'activity/entrap_list_no_null');
  }
  getabat(): Observable<any>{
  
    return this.http.get(environment.baseurl+'activity/abat_list');
  }
  
  getepat(): Observable<any>{
  
    return this.http.get(environment.baseurl+'activity/ebat_list');
  }
  // user
  addUser(data){
    return this.http.post(environment.baseurl+'iot_usermanagement/create',data);
  }
  editUser(data){
    return this.http.post(environment.baseurl+'iot_usermanagement/edit',data);
  }
  getUserList(){
    return this.http.get(environment.baseurl+'iot_usermanagement/getlist');
  }
  deleteUser(data){
    return this.http.post(environment.baseurl+'iot_usermanagement/delete',data);
  }
  user_login(data){
    return this.http.post(environment.baseurl+'iot_usermanagement/iot/login_page',data);
  }
  user_side(data){
    return this.http.post(environment.baseurl+'activity/dashboard_two_branch_wise',data);
  }
  addBranch(data){
    return this.http.post(environment.baseurl+'iot_branch_code/create',data);
  }
  editBranch(data){
    return this.http.post(environment.baseurl+'iot_branch_code/edit',data);
  }
  getBranchList(){
    return this.http.get(environment.baseurl+'iot_branch_code/getlist');
  }
  deletebranch(data){
    return this.http.post(environment.baseurl+'iot_branch_code/delete',data);
  }
  getTotalBranch(){
    return this.http.get(environment.baseurl+'iot_branch_code/getlist_custom');
  }
}
