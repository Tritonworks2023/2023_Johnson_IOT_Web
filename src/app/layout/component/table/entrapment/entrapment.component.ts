import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/provider/dashboard.service';
import { Table } from "primeng/table";
import { Observable, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-entrapment',
  templateUrl: './entrapment.component.html',
  styleUrls: ['./entrapment.component.css']
})
export class EntrapmentComponent implements OnInit {
  startIndex = 0;
  endIndex = 5;
  startIndex1 = 0;
  endIndex1 = 5;
  term:string;
  term1:string;
  entrap:any
  config1:any
  config:any
  entrap2:any;
  total1:any;
  adminLog:any;
  userLog:any;
  userData:any;
  @ViewChild("tt") table: Table;
   @ViewChild("tf") table1: Table;
  // @ViewChild("td") table: Table;
    updateSubscription:any;
    constructor(private router:Router,private dashboardservice :DashboardService) { }
  
    ngOnInit(): void {
      this.adminLog=JSON.parse(sessionStorage.getItem('adminLog'));
      if(this.adminLog==true){
        this.getData2();
        this.dashboardservice.getEpart().subscribe((data)=>
        {
          this.entrap=data['Data'];
          this.total=  this.entrap.length;
         })
          this.dashboardservice.getEntrap().subscribe((data)=>
          {
            this.entrap2=data['Data'];
            this.total1=  this.entrap2.length;
            })
        this.updateSubscription = interval(60000).subscribe(
          (val) => { this.getData();
            this.getData2();
          
        }
    
    );
    this.getData();
      }
      this.userLog=JSON.parse(sessionStorage.getItem('userlogin'));
      if(this.userLog==true){
        this.userData=JSON.parse(sessionStorage.getItem('first'));
        this.dashboardservice.getEpart().subscribe((data)=>
        {
          this.entrap=data['Data'].filter((e:any)=>e.DBD_BRCODE==this.userData);
          this.total=  this.entrap.length;
         })
          this.dashboardservice.getEntrap().subscribe((data)=>
          {
            this.entrap2=data['Data'].filter((e:any)=>e.DBD_BRCODE==this.userData);
            this.total1=  this.entrap2.length;
            })
            this.updateSubscription = interval(60000).subscribe(
              (val) => {
                this.dashboardservice.getEpart().subscribe((data)=>
                {
                  this.entrap=data['Data'].filter((e:any)=>e.DBD_BRCODE==this.userData);
                  this.total=  this.entrap.length;
                 })
                  this.dashboardservice.getEntrap().subscribe((data)=>
                  {
                    this.entrap2=data['Data'].filter((e:any)=>e.DBD_BRCODE==this.userData);
                    this.total1=  this.entrap2.length;
                    })
              
            }
        
        );
      }
    

  this.config = {
    id: 'pagination1',
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.total
  }
  this.config1 = {
    id: 'pagination2',
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.total1
  }
 
    }
  
  pervious(){
    this.router.navigateByUrl('/maps')
  }
  next(){
    this.router.navigateByUrl('/down2')
  }
  total:any
  getData(){
    this.dashboardservice.getEpart().subscribe((data)=>
    {
      this.entrap=data['Data'];
      })
     
   
  }
  getData2(){
    this.dashboardservice.getEntrap().subscribe((data)=>
    {
      this.entrap2=data['Data'];
     })
     
   
  }
  selected(sel){
    this.config = {
      id: 'pagination1',
      itemsPerPage: sel,
      currentPage: 1,
      totalItems: this.total
    }
    this.endIndex=sel;
  }
  selected1(se){
    this.config1 = {
      id: 'pagination2',
      itemsPerPage: se,
      currentPage: 1,
      totalItems: this.total1
    }
    this.endIndex1=se;
  }
  pageChanged(event){
    this.config.currentPage = event;
  }
  pageChanged1(event){
    this.config1.currentPage = event;
  }
  map(){
    this.router.navigateByUrl('/layout/maps')
  }
}

