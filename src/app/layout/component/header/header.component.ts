import { Component, OnInit,HostListener,ViewChild,ElementRef } from '@angular/core';
import { DashboardService } from 'src/app/provider/dashboard.service';
import { Observable, interval, Subscription } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
 
})
export class HeaderComponent implements OnInit {
  updateSubscription;
  count;
  currentDate;
  profile:boolean=false;
  adminlog:boolean=true;
  changePass:boolean=false;
  login:any;
  eye:boolean;
  neweye:boolean;
  reeye:boolean;
  old_password:any;
  new_password:any;
  re_password:any;
  password:any;
  olpass:boolean=false;
  id:any;
  userLog:any;
  repass:boolean=false;
  username:any;
  public showPassword: boolean;
  public showPassword2:boolean;
  public showPassword3:boolean;
  constructor(private dashboardservice :DashboardService,private toastr:ToastrManager,) { }
  @ViewChild('closeBtn') closeBtn: ElementRef;
  ngOnInit(): void {
    var aa=JSON.parse(sessionStorage.getItem('userData'));
    this.userLog=JSON.parse(sessionStorage.getItem('userlogin'));
    if(this.userLog==true){
      this.password=aa.password;
      this.id=aa._id;
      this.username=aa.name;
      console.log(this.username)
    }
   
    this.getData();
    this.updateSubscription = interval(60000).subscribe(
      (val) => { this.getData()
    });
    this.login=JSON.parse(sessionStorage.getItem('userlogin'));
    if(this.login==true){
      this.adminlog=false;
    }
  }
  getData(){

    this.dashboardservice.getCount().subscribe(data =>{
  
      this.count=data['Data'];
      this.currentDate=new Date();
      
    
   });

  }
  profi($event){
    $event.stopPropagation();
    this.profile=!this.profile
 
  
  }
  unprofile()
{
  this.profile = false;
}
@HostListener('document:click', ['$event']) onDocumentClick(event) {
  this.profile = false;

}
data(){
  this.profile = false;
  this.olpass=false;
  this.repass=false;
  this.old_password='';
  this.new_password='';
  this.re_password='';
}
showSuccess(msg) {
  this.toastr.successToastr(msg);
}
update(){
  
  console.log(this.password)
  if(this.password==this.old_password){
    this.olpass=false;
    if(this.new_password==this.re_password){
      let a={
        _id:this.id,
        password:this.new_password
      }
      this.dashboardservice.editUser(a).subscribe((data:any)=>{
        this.showSuccess(data['Message'])
        this.closeBtn.nativeElement.click();
        this.repass=false;
    })
    }
    else{
      this.repass=true;
    }
  }
  else{
    this.olpass=true;
  }
}
pass(){
  this.olpass=false;
 
}
pass1(){
  this.repass=false;
 
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
     onKeypressEvent1(event: any){
      if(event.target.value==''){
      this.neweye=false;
      
      }else{
        this.neweye=true;
      
      }
        
      
       
       }
       onKeypress1(event: any){
        if(event.target.value==''){
        this.neweye=false;
        
        }else{
          this.neweye=true;
          
        }
          
        
         
         }
         onKeypressEvent2(event: any){
          if(event.target.value==''){
          this.reeye=false;
          
          }else{
            this.reeye=true;
          
          }
            
          
           
           }
           onKeypress2(event: any){
            if(event.target.value==''){
            this.reeye=false;
            
            }else{
              this.reeye=true;
              
            }
              
            
             
             }
}
