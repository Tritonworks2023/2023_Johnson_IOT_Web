import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/provider/dashboard.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Observable, interval, Subscription } from 'rxjs';
import { DataService } from 'src/app/provider/data.service';
declare var $:any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  count: any = [];
  total_count = 0;
  bangalore:any;
  filtered: any;
  banga:any;
  updateSubscription:any
  dash:boolean;
  running:any;
  entrap:any;
  breadown:any;
  ebat:any;
  abat:any;
  noc:any
  error:any;
  running1:any;
  entrap1:any;
  breadown1:any;
  ebat1:any;
  abat1:any;
  noc1:any
  error1:any;
  login:any;
  adminLog:any;
  userLog:any;
  userData:any;
  constructor(private dashboardservice :DashboardService,private router:Router,private data: DataService) { }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(msg =>
      {
        let b={
          "brncd":msg
        }
        this.total_count =0;
        this.dashboardservice.user_side(b).subscribe(data =>{
     
          this.count=data['Data'];
          this.running1= this.count.filter((e:any)=>e.STAT == 'UP');
          this.running= this.running1[0]?.STATCNT;
          this.entrap1= this.count.filter((e:any)=>e.STAT == 'ENT');
          this.entrap= this.entrap1[0]?.STATCNT;
          this.breadown1=this.count.filter((e:any)=>e.STAT == 'DWN2');
          this.breadown= this.breadown1[0]?.STATCNT;
         this.abat1=this.count.filter((e:any)=>e.STAT == 'ABAT');
         this.abat= this.abat1[0]?.STATCNT;
         this.ebat1=this.count.filter((e:any)=>e.STAT == 'ENT');
         this.ebat= this.ebat1[0]?.STATCNT;
         this.noc1=this.count.filter((e:any)=>e.STAT == 'NC');
         this.noc= this.noc1[0]?.STATCNT;
         this.error1=this.count.filter((e:any)=>e.STAT == 'DWN1');
         this.error= this.error1[0]?.STATCNT;
         this.total_count =0;
          this.count.forEach(element => {
           
            this.total_count  = this.total_count+ element.STATCNT;
            
          });
       });
    });
    this.dash=true;
    this.login=JSON.parse(sessionStorage.getItem('loginStatus')|| '{}');
    if(this.login==false){
      this.router.navigateByUrl('/login')
    }
    // this.getData();
    let obj =this;
    this.adminLog=JSON.parse(sessionStorage.getItem('adminLog'));
    if(this.adminLog==true){
      this.dashboardservice.getCount().subscribe(data =>{
   
        this.count=data['Data'];
        this.running1= this.count.filter((e:any)=>e.STAT == 'UP');
        this.running= this.running1[0]?.STATCNT;
        this.entrap1= this.count.filter((e:any)=>e.STAT == 'ENT');
        this.entrap= this.entrap1[0]?.STATCNT;
        this.breadown1=this.count.filter((e:any)=>e.STAT == 'DWN2');
        this.breadown= this.breadown1[0]?.STATCNT;
       this.abat1=this.count.filter((e:any)=>e.STAT == 'ABAT');
       this.abat= this.abat1[0]?.STATCNT;
       this.ebat1=this.count.filter((e:any)=>e.STAT == 'EBAT');
       this.ebat= this.ebat1[0]?.STATCNT;
       this.noc1=this.count.filter((e:any)=>e.STAT == 'NC');
       this.noc= this.noc1[0]?.STATCNT;
       this.error1=this.count.filter((e:any)=>e.STAT == 'DWN1');
       this.error= this.error1[0]?.STATCNT;
      
        this.count.forEach(element => {
         
          this.total_count  = this.total_count+ element.STATCNT;
          
        });
     });
      this.updateSubscription = interval(60000).subscribe(
        (val) => { this.getData()
        
      }
  
  );

    }
    this.userLog=JSON.parse(sessionStorage.getItem('userlogin'));
    if(this.userLog==true){
      setTimeout(()=> {
        this.userData=JSON.parse(sessionStorage.getItem('first'));
        let b={
          "brncd":this.userData
        }
        this.total_count =0;
        this.dashboardservice.user_side(b).subscribe(data =>{
     
          this.count=data['Data'];
          this.running1= this.count.filter((e:any)=>e.STAT == 'UP');
          this.running= this.running1[0]?.STATCNT;
          this.entrap1= this.count.filter((e:any)=>e.STAT == 'ENT');
          this.entrap= this.entrap1[0]?.STATCNT;
          this.breadown1=this.count.filter((e:any)=>e.STAT == 'DWN2');
          this.breadown= this.breadown1[0]?.STATCNT;
         this.abat1=this.count.filter((e:any)=>e.STAT == 'ABAT');
         this.abat= this.abat1[0]?.STATCNT;
         this.ebat1=this.count.filter((e:any)=>e.STAT == 'ENT');
         this.ebat= this.ebat1[0]?.STATCNT;
         this.noc1=this.count.filter((e:any)=>e.STAT == 'NC');
         this.noc= this.noc1[0]?.STATCNT;
         this.error1=this.count.filter((e:any)=>e.STAT == 'DWN1');
         this.error= this.error1[0]?.STATCNT;
        
          this.count.forEach(element => {
           
            this.total_count  = this.total_count+ element.STATCNT;
            
          });
       });
      },2000);
      
     this.updateSubscription = interval(60000).subscribe(
      (val) => { 
        this.userData=JSON.parse(sessionStorage.getItem('first'));
        let b={
          "brncd":this.userData
        }
        
          this.dashboardservice.user_side(b).subscribe(data =>{
   
        this.count=data['Data'];
        this.running1= this.count.filter((e:any)=>e.STAT == 'UP');
        this.running= this.running1[0]?.STATCNT;
        this.entrap1= this.count.filter((e:any)=>e.STAT == 'ENT');
        this.entrap= this.entrap1[0]?.STATCNT;
        this.breadown1=this.count.filter((e:any)=>e.STAT == 'DWN2');
        this.breadown= this.breadown1[0]?.STATCNT;
       this.abat1=this.count.filter((e:any)=>e.STAT == 'ABAT');
       this.abat= this.abat1[0]?.STATCNT;
       this.ebat1=this.count.filter((e:any)=>e.STAT == 'ENT');
       this.ebat= this.ebat1[0]?.STATCNT;
       this.noc1=this.count.filter((e:any)=>e.STAT == 'NC');
       this.noc= this.noc1[0]?.STATCNT;
       this.error1=this.count.filter((e:any)=>e.STAT == 'DWN1');
       this.error= this.error1[0]?.STATCNT;
       this.total_count =0; 
        this.count.forEach(element => {
         
          this.total_count  = this.total_count+ element.STATCNT;
          
        });
     });
      
    });
    }
  



    let world =document.querySelectorAll('#world-map-markers1');
   
    $(world).on('click', function(e:any){
  
     
    });

  }


  getData(){
    this.total_count =0;
    this.dashboardservice.getCount().subscribe(data =>{
     
      this.count=data['Data'];
      this.running1= this.count.filter((e:any)=>e.STAT == 'UP');
      this.running= this.running1[0]?.STATCNT;
      this.entrap1= this.count.filter((e:any)=>e.STAT == 'ENT');
      this.entrap= this.entrap1[0]?.STATCNT;
      this.breadown1=this.count.filter((e:any)=>e.STAT == 'DWN2');
      this.breadown= this.breadown1[0]?.STATCNT;
     this.abat1=this.count.filter((e:any)=>e.STAT == 'ABAT');
     this.abat= this.abat1[0]?.STATCNT;
     this.ebat1=this.count.filter((e:any)=>e.STAT == 'EBAT');
     this.ebat= this.ebat1[0]?.STATCNT;
     this.noc1=this.count.filter((e:any)=>e.STAT == 'NC');
     this.noc= this.noc1[0]?.STATCNT;
     this.error1=this.count.filter((e:any)=>e.STAT == 'DWN1');
     this.error= this.error1[0]?.STATCNT;
      this.count.forEach(element => {
       
        this.total_count  = this.total_count+ element.STATCNT;
        
      });
   });

  }


}
