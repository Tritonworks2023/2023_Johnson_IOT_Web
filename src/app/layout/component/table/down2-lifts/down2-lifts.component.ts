import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/provider/dashboard.service';
import { element } from 'protractor';
import { Observable, interval, Subscription } from 'rxjs';
import { Table } from "primeng/table";
@Component({
  selector: 'app-down2-lifts',
  templateUrl: './down2-lifts.component.html',
  styleUrls: ['./down2-lifts.component.css']
})
export class Down2LiftsComponent implements OnInit {
  @ViewChild("tt") table: Table;
  @ViewChild("tf") table1: Table;
  startIndex = 0;
  endIndex = 5;
  config: any;
  downDta:any;
  downNull:any;
  term: string;
  term1: string;
  updateSubscription:any;
  total;
  adminLog:any;
  userLog:any;
  userData:any;
  constructor(private router:Router,private dashboardservice :DashboardService) {
    
   }

  ngOnInit(): void {
    this.adminLog=JSON.parse(sessionStorage.getItem('adminLog'));
    if(this.adminLog==true){
      this.dashboardservice.getDown().subscribe((element)=>
      {
        this.downDta=element['Data'];
        this.total= this.downDta.length;
       })
       this.dashboardservice.getDown1().subscribe((element)=>
      {
        this.downNull=element['Data'];
        
       })
        
    
      this.updateSubscription = interval(60000).subscribe(
        (val) => { this.getData();
          this.getData1();
        
      });
    }
    this.userLog=JSON.parse(sessionStorage.getItem('userlogin'));
    if(this.userLog==true){
      this.userData=JSON.parse(sessionStorage.getItem('first'));
    
      this.dashboardservice.getDown().subscribe((element)=>
      {
        this.downDta=element['Data'].filter((e:any)=>e.DBD_BRCODE==this.userData)
        this.total= this.downDta.length;
       })
       this.dashboardservice.getDown1().subscribe((element)=>
       {
         this.downNull=element['Data'].filter((e:any)=>e.DBD_BRCODE==this.userData)
     
        })
        
    
      this.updateSubscription = interval(60000).subscribe(
        (val) => { 
          this.dashboardservice.getDown().subscribe((element)=>
          {
            this.downDta=element['Data'].filter((e:any)=>e.DBD_BRCODE==this.userData)
            this.total= this.downDta.length;
           })
           this.dashboardservice.getDown1().subscribe((element)=>
           {
             this.downNull=element['Data'].filter((e:any)=>e.DBD_BRCODE==this.userData)
         
            })
        
      });

    }


   


this.config = {
  itemsPerPage: 5,
  currentPage: 1,
  totalItems: this.total
}
  }
  
  pervious(){
    this.router.navigateByUrl('/entrapment')
  }
  next(){
    
    this.router.navigateByUrl('/state')
  }
  getData(){
    this.dashboardservice.getDown().subscribe((element)=>
    {
      this.downDta=element['Data'];
     })
  }
  getData1(){
    this.dashboardservice.getDown1().subscribe((element)=>
    {
      this.downNull=element['Data'];
     })
  }
  selected(sel){
    this.config = {
      itemsPerPage: sel,
      currentPage: 1,
      totalItems: this.total
    }
    this.endIndex=sel;
  
  
;  }
pageChanged(event){
  this.config.currentPage = event;
}
map(){
  this.router.navigateByUrl('/layout/maps')
}
  
  }
  


