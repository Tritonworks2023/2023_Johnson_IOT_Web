import { Component, OnInit, Inject,ViewChild,ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { DashboardService } from 'src/app/provider/dashboard.service';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild("user") focusField: ElementRef;
  email_id: string;
  passwords: string;
  phone_number: number;
  data: any;
  selectedAudio1: any;
  Pic: any;
  singn:boolean=false;

  LoginForm: FormGroup;
userLog:any;
  loginDetails: any;
  userData: any;
  validation = false;
  adminLog:any;
  loginError = false;
  loginErrorMsg: any;
  eye:any;

  email: any;
  emailError = false;
  emailErrorMsg: any;
  checkbox:any;
show:boolean;
  password: any;
  passwordError = false;
  passwordErrorMsg: any;
   isChecked :any =false;
   public showPassword: boolean;
rember: boolean
  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private loginservice:DashboardService,
    private toastr:ToastrManager
    
  ) {
    this.LoginForm = this.formBuilder.group({
      email_id: ['', Validators.required],
      password: ['', Validators.required,]
    })
  }
admin={email_id:"555555",password:"123456"}
  ngOnInit() {
  this.singn=false;
  this.checkbox=false;
  this.isChecked=sessionStorage.getItem('rem');
  var aa=sessionStorage.getItem('user');
  sessionStorage.removeItem('first')
 
  if(this.isChecked == "true"){
    var aa=sessionStorage.getItem('user');
    var parsedJson = JSON.parse(aa);  
    this.LoginForm.patchValue({
      "email_id":parsedJson.email_id,
      "password":parsedJson.password

    })
    this.checkbox=true;
  
  }

  sessionStorage.removeItem('userData');
  sessionStorage.removeItem('userlogin');
  sessionStorage.removeItem('adminLog');
  sessionStorage.setItem('loginStatus',JSON.stringify(this.singn));
 
   
   
 
  
    setTimeout(()=>{
      this.focusField.nativeElement.focus();
      },500)

  }
 


  
  focusUser(){
    this.emailError = false;
  }





  remChange(data){
  if(data.target.checked==false){
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('rem');
  }
  
    this.checkbox=data.target.checked;

  }
  logintest1() {
    // if(this.isChecked == false){
    //   localStorage.removeItem('user');

    // localStorage.removeItem('rem');
    // }
  
if(this.LoginForm.valid){
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('rem');
 
  if((this.LoginForm.controls.email_id.value===this.admin.email_id )&& (this.LoginForm.controls.password.value==this.admin.password)){
    this.router.navigateByUrl('/layout')
    this.singn=true;
    this.adminLog=true;
    sessionStorage.setItem('loginStatus',JSON.stringify(this.singn));
    sessionStorage.setItem('adminLog',JSON.stringify(this.adminLog));
    console.log(this.LoginForm.value)
 if( this.checkbox==true)
 {
  sessionStorage.setItem('user',JSON.stringify(this.LoginForm.value));
  sessionStorage.setItem('rem',JSON.stringify(this.checkbox));
 }
     
    
  }
  else if(this.LoginForm.valid){
    this.loginservice.user_login(this.LoginForm.value).subscribe((data:any)=>{
      console.log(data['Status'])
      if(data['Status']=="Success"){
        this.router.navigateByUrl('/layout')
        this.singn=true;
        this.userLog=true;
       var log= data['Data']
        sessionStorage.setItem('loginStatus',JSON.stringify(this.singn));
        sessionStorage.setItem('userData',JSON.stringify(log));
        sessionStorage.setItem('userlogin',JSON.stringify(this.userLog));
        if( this.checkbox==true)
        {
         sessionStorage.setItem('user',JSON.stringify(this.LoginForm.value));
         sessionStorage.setItem('rem',JSON.stringify(this.checkbox));
        }

      }
      else{
        this.showError('Invalid Account');
      }
    })

  }
 
}
    
   
  }
  onKeypressEvent(event: any){
    if(event.target.value==''){
    this.eye=false;
    
    }else{
      this.eye=true;
    
    }
      
    
     
     }
     onKeypress(event: any){
      if(event.target.value==''){
      this.eye=false;
      
      }else{
        this.eye=true;
        
      }
        
      
       
       }
  
  toogle(){
    this.show=!this.show;
  }
  showError(msg) {
    this.toastr.warningToastr(msg);
}
  
}



