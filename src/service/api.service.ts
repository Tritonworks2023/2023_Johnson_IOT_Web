import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
  apiUrl = environment.apiUrl;
  // imgUrl = environment.imageURL;
  user: any;

    constructor(private router: Router,private http: HttpClient, private cookieService: CookieService) {
    }

    /**
     * Returns the current user
     */
    public currentUser(): any {
        if (!this.user) {
            this.user = JSON.parse(this.cookieService.getCookie('currentUser'));
        }
        return this.user;
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(email: string, password: string,ipAddress:any) {
        return this.http.post<any>(this.apiUrl +`/users/authenticate`, { email, password,ipAddress })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user) {
                    this.user = user;
                    // store user details and jwt in cookie
                    this.cookieService.setCookie('currentUser', JSON.stringify(user), 1);
                }
                return user;
            }));
    }

    /**
     * Logout the user
     */
    logout() {
        // remove user from local storage to log user out
        this.cookieService.deleteCookie('currentUser');
        this.user = null;
        this.router.navigate(['/account/login']);
    }




     /**
     * Performs the Admin Validation
     * @param email email of admin
     * @param password password of admin
     */
      adminLogin(email: string, password: string) {
        return this.http.post<any>(this.apiUrl +`/users/admin_authenticate`, { email, password })
            .pipe(map(user => {              
                return user;
            }));
    }


    createUserDetails(enteredData:any){
        return this.http.post<any>(this.apiUrl + "/users/createUserDetails",enteredData)
        .pipe(map(response => {
          return response;
        }));
      } 


      updateUserDetails(updateUserDetails:any){
        return this.http.post<any>(this.apiUrl + "/users/updateUserDetails",updateUserDetails)
        .pipe(map(response => {
          return response;
        }));
      } 
      
      
      getUserList(){
        return this.http.get<any>(this.apiUrl + "/users/getUserList")
        .pipe(map(response => {
          return response;
        }));
      }  

      getUserbyId(id:any){
        return this.http.post<any>(this.apiUrl + "/users/findUserDetails",{id})
        .pipe(map(response => {
          return response;
        }));
      } 


      deleteUser(id:any){
        return this.http.post<any>(this.apiUrl + "/users/deleteUser",{id})
        .pipe(map(response => {
          return response;
        }));
      } 


      getliftLayoutList_count(enterliftId:any){
        
        var obj =  {
        "job_id":enterliftId ? enterliftId: "L-P2909",
        }
        console.log(obj);
        return this.http.post<any>("http://smart.johnsonliftsltd.com:3000/api/activity/iot/get_data_by_job_fetch_count",obj)
        .pipe(map(response => {
          return response;
        }));
      }  

      getliftLayoutList_detail(obj){
        console.log(obj);
        return this.http.post<any>("http://smart.johnsonliftsltd.com:3000/api/activity/iot/get_data_by_job",obj)
        .pipe(map(response => {
          return response;
        }));
      }  

      deleteUserDetails(id:any){
        return this.http.post<any>(this.apiUrl + "/users/deleteUserDetails",{id})
        .pipe(map(response => {
          return response;
        }));
      } 

}


