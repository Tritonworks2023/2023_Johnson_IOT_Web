import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/provider/dashboard.service';
import { element } from 'protractor';
import { Observable, interval, Subscription } from 'rxjs';
import { Table } from "primeng/table";
@Component({
  selector: 'app-abat',
  templateUrl: './abat.component.html',
  styleUrls: ['./abat.component.css']
})
export class AbatComponent implements OnInit {
  @ViewChild("tt") table: Table;
  startIndex = 0;
  endIndex = 5;
  abatDta:any;
  term: string;
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
      this.dashboardservice.getabat().subscribe((element)=>
      {
        this.abatDta=element['Data'];
  this.total= this.abatDta.length;
       })
      this.updateSubscription = interval(60000).subscribe(
        (val) => { this.getData()
        
      }
  );

    }
    this.userLog=JSON.parse(sessionStorage.getItem('userlogin'));
    if(this.userLog==true){
      this.userData=JSON.parse(sessionStorage.getItem('first'));
      this.dashboardservice.getabat().subscribe((element)=>
      {
        this.abatDta=element['Data'].filter((e:any)=>e.DBD_BRCODE==this.userData)
  this.total= this.abatDta.length;
       })
      this.updateSubscription = interval(60000).subscribe(
        (val) => { 
          this.dashboardservice.getabat().subscribe((element)=>
          {
            this.abatDta=element['Data'].filter((e:any)=>e.DBD_BRCODE==this.userData)
      this.total= this.abatDta.length;
           })
      }
  );
    }



this.config = {
  itemsPerPage: this.endIndex,
  currentPage: 1,
  totalItems: this.total
}
  }
  

  getData(){
    this.dashboardservice.getabat().subscribe((element)=>
    {
      this.abatDta=element['Data'];
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
  pageChanged(event){
    
    this.config.currentPage = event;
  }
  map(){
    this.router.navigateByUrl('/layout/maps')
  }
  
  }
  


