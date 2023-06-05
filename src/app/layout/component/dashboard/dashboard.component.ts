import { Component, OnInit,ViewChild, ElementRef} from '@angular/core';
import { DashboardService } from 'src/app/provider/dashboard.service';
import { ActivatedRoute,Router } from '@angular/router';
// import { Loader } from '@googlemaps/js-api-loader';

import { Observable, interval, Subscription } from 'rxjs';

declare var $:any;



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  count: any = [];
  total_count = 0;
  bangalore:any;
  filtered: any;
  banga:any;
  updateSubscription:any
  dash:boolean;




  constructor(private dashboardservice :DashboardService,private router:Router) { }

  ngOnInit(): void {
    this.dash=true;
    this.dashboardservice.getCount().subscribe(data =>{
      
      this.count=data['Data'];
      this.count.forEach(element => {
        this.total_count = this.total_count + element.STATCNT;
      });
   });

    this.getData();
    let obj =this;
    this.updateSubscription = interval(60000).subscribe(
      (val) => { this.getData()
      
    }

);




    let world =document.querySelectorAll('#world-map-markers1');
   
    $(world).on('click', function(e:any){
   
   


    });

  }

  getData(){
    this.total_count =0;
    this.dashboardservice.getCount().subscribe(data =>{
     
      this.count=data['Data'];
      this.count.forEach(element => {
        this.total_count = this.total_count + element.STATCNT;
      });
   });

  }




  next(){
    this.router.navigateByUrl('/maps')
  }


}
