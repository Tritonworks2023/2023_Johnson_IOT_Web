import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/provider/dashboard.service';
import { element } from 'protractor';
import { Observable, interval, Subscription } from 'rxjs';
import { Table } from "primeng/table";
@Component({
  selector: 'app-epat',
  templateUrl: './epat.component.html',
  styleUrls: ['./epat.component.css']
})
export class EpatComponent implements OnInit {
  @ViewChild("tt") table: Table;
  term:string;
  epatDta:any;
  startIndex = 0;
  endIndex = 5;
  updateSubscription:any;
  total:any;
  config:any;
  adminLog:any;
  userLog:any;
  userData:any;
    constructor(private router:Router,private dashboardservice :DashboardService) { }

  ngOnInit(): void {
    this.adminLog=JSON.parse(sessionStorage.getItem('adminLog'));
    if(this.adminLog==true){
      this.dashboardservice.getepat().subscribe((data)=>
      {
        this.epatDta=data['Data'];
        this.total=this.epatDta.length;
       })
  
      this.updateSubscription = interval(60000).subscribe(
        (val) => { this.getData()
        
      });
    }
    this.userLog=JSON.parse(sessionStorage.getItem('userlogin'));
    if(this.userLog==true){
      this.userData=JSON.parse(sessionStorage.getItem('first'));
      this.dashboardservice.getepat().subscribe((data)=>
      {
        this.epatDta=data['Data'].filter((e:any)=>e.DBD_BRCODE==this.userData);
        this.total=this.epatDta.length;
       })
  
      this.updateSubscription = interval(60000).subscribe(
        (val) => { 
          
          this.dashboardservice.getepat().subscribe((data)=>
          {
            this.epatDta=data['Data'].filter((e:any)=>e.DBD_BRCODE==this.userData);
            this.total=this.epatDta.length;
           })
        
      });
    }
   
    


this.config = {
  itemsPerPage: 5,
  currentPage: 1,
  totalItems: this.total
}


  }
  
 
  getData(){
    this.dashboardservice.getepat().subscribe((data)=>
    {
      this.epatDta=data['Data'];
      })
  }
  selected(sel){
    this.config = {
      itemsPerPage: sel,
      currentPage: 1,
      totalItems: this.total
    }
    this.endIndex=sel;
  }
  getIndex(pageIndex){
    this.startIndex = pageIndex * 5;
   this.endIndex = this.startIndex + 5;
 
  }
  prevIndex(length){
    this.startIndex = length * 0;

  }
  nextIndex(endIndex){
    this.endIndex+=this.endIndex
  
  }
  pageChanged(event){
    this.config.currentPage = event;
  }
  map(){
    this.router.navigateByUrl('/layout/maps')
  }
  
  }
  


