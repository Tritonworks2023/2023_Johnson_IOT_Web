import { Component, OnInit,ViewChild, ElementRef} from '@angular/core';
import { DashboardService } from 'src/app/provider/dashboard.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Observable, interval, Subscription } from 'rxjs';
import { DataService } from 'src/app/provider/data.service';
// import {} from 'googlemaps';



@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],

})
export class MapsComponent implements OnInit {
  location:any;
    icon = { url: '../assets/images/blue.png', scaledSize: {height: 20, width: 20}}
    icon1 = { url: '../assets/images/red.png', scaledSize: {height: 20, width: 20}}
    icon2 = { url: '../assets/images/green.png', scaledSize: {height: 20, width: 20}}
    userLog:any;
    count: any = [];
    total_count = 0;
    bangalore:any;
    filtered: any;
    banga:any;
    updatestate:any;
    dash:boolean;
    userpopup:any;
    // initial center position for the map
  lat: number;
  lng: number;
  state: any=[];
  result:any=[];
  zoom: number;
  markers: marker[] = [];
    con: string;
    updateSubscription;
    login:any;
    user:any;
    branch_List:any;
    firstChild:any;
    adminLog:any;
  // initial center position for the map


  constructor(private dashboardservice :DashboardService,private router:Router,private dataService: DataService) { }

  ngOnInit(): void {
    this.dashboardservice.getTotalBranch().subscribe((data)=>
    {
       
      this.location=data['Data'];
   
      console.log(this.location)
      })
    this.login=JSON.parse(sessionStorage.getItem('loginStatus')|| '{}');
    if(this.login==false){
      this.router.navigateByUrl('/login')
    }
    this.user=JSON.parse(sessionStorage.getItem('userlogin'));
    if(this.user==true){
      this.userLog=true;
      var aa=JSON.parse(sessionStorage.getItem('userData'));
      this.branch_List=aa.branch_code;
      this.firstChild=this.branch_List[0];
      sessionStorage.setItem('first',JSON.stringify(this.firstChild));
      this.dashboardservice.getState().subscribe(data =>{
        this.state=data['Data'].filter((e:any)=>e.BBRCD== this.firstChild);
       
      });
      setTimeout(()=> {
        const mergeById = (array1:any, array2:any) =>
        array1.map((itm: { BBRCD: any; }) => ({
        ...array2.find((item:any) => (item.BBRCD === itm.BBRCD) && item),
        ...itm
        }));
        this.result = mergeById(this.state,this.location);
        if(this.result==''){
            this.userpopup=true;
            this.lat= 12.693933;
            this.lng = 79.975662;
            this.zoom = 6.1;
        }
          this.result.map((item: any)=>{
        this.lat=Number(item.px);
        this.lng= Number(item.py);
        this.zoom = 12.1;

        this.markers.push({
        lat: item.px,
        lng: item.py,
       
        label: "C",
        draggable: true,
        check_status : item.BRENTRAP,
        check_break:item.BRDWN2,
        content:   [ {label:"BR CODE",key:item.BBRCD},{label:"BRANCH NAME",key:item.BBRNAME},
        // {label:"UP",key:item.BRUP},
        
        {label:"TOTAL",key:item.BRTOT},
        {label:"BREAK DOWN",key:item.BRDWN2},
        {label:"ENTRAPMENT",key:item.BRENTRAP},
        {label:"ENTRAPMENT CLEARED",key:item.BRENTRAPCLEAR},
        // {label:"NC",key:item.BRNC},
        // {label:"DWN1",key:item.BRDWN1},
        
                    ]
        });
        
        
        });
        
        }, 2000);
     
     console.log(this.result)
  
      
    }
    this.adminLog=JSON.parse(sessionStorage.getItem('adminLog'));
    if(this.adminLog==true){
        this.userpopup=false;
        this.lat= 12.693933;
        this.lng = 79.975662;
        this.zoom = 6.1;
        this.dashboardservice.getCount().subscribe(data =>{
        
            this.count=data['Data'];
            this.count.forEach(element => {
              this.total_count = this.total_count + element.STATCNT;
            });
         });
         this.dashboardservice.getState().subscribe(data =>{
            this.state=data['Data'];
           
          });
    
    
    
    setTimeout(()=> {
    const mergeById = (array1:any, array2:any) =>
    array1.map((itm: { BBRCD: any; }) => ({
    ...array2.find((item:any) => (item.BBRCD === itm.BBRCD) && item),
    ...itm
    }));
    this.result = mergeById(this.state,this.location);
    
      this.result.map((item: any)=>{
    
    
    this.markers.push({
    lat: item.px,
    lng: item.py,
    label: "C",
    draggable: true,
    check_status : item.BRENTRAP,
    check_break:item.BRDWN2,
    content:   [ {label:"BR CODE",key:item.BBRCD},{label:"BRANCH NAME",key:item.BBRNAME},
    // {label:"UP",key:item.BRUP},
    
    {label:"TOTAL",key:item.BRTOT},
    {label:"BREAK DOWN",key:item.BRDWN2},
    {label:"ENTRAPMENT",key:item.BRENTRAP},
    {label:"ENTRAPMENT CLEARED",key:item.BRENTRAPCLEAR},
    // {label:"NC",key:item.BRNC},
    // {label:"DWN1",key:item.BRDWN1},
    
                ]
    });
    
    
    });
    
    }, 2000);

        this.updateSubscription = interval(60000).subscribe(
            (val) => { 
                this.getData();
                this.dashboardservice.getState().subscribe(data =>{
                    this.state=data['Data'];
               
                  });
        
        
       
        setTimeout(()=> {
          const mergeById = (array1:any, array2:any) =>
          array1.map((itm: { BBRCD: any; }) => ({
            ...array2.find((item:any) => (item.BBRCD === itm.BBRCD) && item),
            ...itm
          }));
          this.result = mergeById(this.state,this.location);
            
              this.result.map((item: any)=>{
      
    
        this.markers.push({
            lat: item.px,
            lng: item.py,
            label: "C",
            draggable: true,
            check_status : item.BRENTRAP,
            check_break:item.BRDWN2,
            content:   [ {label:"BR CODE",key:item.BBRCD},{label:"BRANCH NAME",key:item.BBRNAME},
            // {label:"UP",key:item.BRUP},
    
            {label:"TOTAL",key:item.BRTOT},
            {label:"BREAK DOWN",key:item.BRDWN2},
            {label:"ENTRAPMENT",key:item.BRENTRAP},
            
            {label:"ENTRAPMENT CLEARED",key:item.BRENTRAPCLEAR},
            // {label:"NC",key:item.BRNC},
            // {label:"DWN1",key:item.BRDWN1},
    
                        ]
        });
       
    
    });
    
        }, 2000);
    }
        
    );
    }
   

  }
  ngAfterViewInit(): void {
if(this.adminLog==true){
    this.dashboardservice.getState().subscribe(data =>{
        this.state=data['Data'];
        
      });
    this.updateSubscription = interval(60000).subscribe(
        (val) => {
            this.dashboardservice.getState().subscribe(data =>{
                this.state=data['Data'];
              
              });
         });
    }
    if(this.user==true){
        this.userLog=true;
         var aa=JSON.parse(sessionStorage.getItem('userData'));
        this.branch_List=aa.branch_code;
        this.firstChild=this.branch_List[0];
        sessionStorage.setItem('first',JSON.stringify(this.firstChild));
        this.dashboardservice.getState().subscribe(data =>{
          this.state=data['Data'].filter((e:any)=>e.BBRCD== this.firstChild);
    });
    this.updateSubscription = interval(60000).subscribe(
        (val) => {
            var aa=JSON.parse(sessionStorage.getItem('userData'));
            this.branch_List=aa.branch_code;
            this.firstChild=this.branch_List[0];
            sessionStorage.setItem('first',JSON.stringify(this.firstChild));
            this.dashboardservice.getState().subscribe(data =>{
              this.state=data['Data'].filter((e:any)=>e.BBRCD== this.firstChild);
        }); 
        })
  
    }

 }

 change(item){
    this.markers = [];
    this.dataService.changeMessage(item);
     this.firstChild=item;
     console.log( this.firstChild)
     sessionStorage.setItem('first',JSON.stringify(this.firstChild));
     this.dashboardservice.getState().subscribe(data =>{
        this.state=data['Data'].filter((e:any)=>e.BBRCD== this.firstChild);
        console.log( this.state)
      });
      
      setTimeout(()=> {
        const mergeById = (array1:any, array2:any) =>
        array1.map((itm: { BBRCD: any; }) => ({
        ...array2.find((item:any) => (item.BBRCD === itm.BBRCD) && item),
        ...itm
        }));
        this.result = mergeById(this.state,this.location);
        if(this.result==''){
            this.userpopup=true;
            this.lat= 12.693933;
            this.lng = 79.975662;
            this.zoom = 6.1;
        }
        
          this.result.map((item: any)=>{
        this.lat=Number(item.px);
        this.lng= Number(item.py);
        this.zoom = 12.1;

        this.markers.push({
        lat: item.px,
        lng: item.py,
       
        label: "C",
        draggable: true,
        check_status : item.BRENTRAP,
        check_break:item.BRDWN2,
        content:   [ {label:"BR CODE",key:item.BBRCD},{label:"BRANCH NAME",key:item.BBRNAME},
        // {label:"UP",key:item.BRUP},
        
        {label:"TOTAL",key:item.BRTOT},
        {label:"BREAK DOWN",key:item.BRDWN2},
        {label:"ENTRAPMENT",key:item.BRENTRAP},
        {label:"ENTRAPMENT CLEARED",key:item.BRENTRAPCLEAR},
        // {label:"NC",key:item.BRNC},
        // {label:"DWN1",key:item.BRDWN1},
        
                    ]
        });
        
        
        });
        
        }, 2000);
     
 }

  pervious(){
    // this.router.navigateByUrl('/dashboard')
  }
  next(){
    this.router.navigateByUrl('/entrapment')
  }
  previous:any
  clickedMarker(label: string, index: number,infowindow:any) {
    if (this.previous) {
        this.previous.close();
    }
    this.previous = infowindow;
   
  }
  close(){
    this.userpopup=false;
}


  getData(){
    this.total_count=0;
    this.dashboardservice.getCount().subscribe(data =>{
    
      this.count=data['Data'];
      this.count.forEach(element => {
        this.total_count = this.total_count + element.STATCNT;
      });
   });

  }

  
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  check_status?: string;
  check_break?:string;
  draggable: boolean;
  content: { label:string, key: any }[];

}
