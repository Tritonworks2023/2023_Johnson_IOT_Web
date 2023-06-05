import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { timer } from 'rxjs';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-project-layouts',
  templateUrl: './project-layouts.component.html',
  styleUrls: ['./project-layouts.component.css']
})
export class ProjectLayoutsComponent implements OnInit {


  timeLeft: number = 0;
  interval;
  
  timeLeft_one: number = 0;
  interval_one;


  user: any;
  liftLayoutList: any = [];

  subscription: Subscription;
  everyTenSeconds: Observable<number> = timer(0, 500000000);

  showLoop: boolean = false;
  tempValue = 0;
  sub: Subscription;
  floorDir: Subscription;
  everyOneSeconds: Observable<number> = timer(0, 40000);

  everyTwoSeconds: Observable<number> = timer(0, 10000);
  list: any[];
  imagePath: string;
  templiftLayoutList: any;
  tableList: any;
  enterliftId: any = 'L-P2909';
  floor_no: number = 0;
  tempListDetails = [];
  liftLayout: any;
  floorDiraction: any = false;
  latest_value = [
   { "floor_no": 0, 
     "floor_direction": 0,
     "floor_status" : 'Close',
     "value":"0000",
     "door_dir_txt" : 'StandBy',
     "DO" : 0,
     "DC" : 1,
     "DP" : 0,
     "liftId": 'LIFT NO',
     "Ser_time" : '-',
     "processorOutputStatusValue" : ''
   }
  ];
  
  

  latest_value_mode_event  = [
    {
      Car_attd_mode : 0,
      Car_auto : 0,
      EL_maintain_mode : 0,
      FireMan : 0,
      Power_fail : 0,
      value : 0,
      park_mode : 0,
      full_load :  0,
      over_load :0,
      error : 0,
    }
  ]
  existing_lastindex = { "floor_no": 0, 
  "floor_direction": 0,
  "floor_status" : 'Close',
  "value":"0000",
  "door_dir_txt" : 'StandBy',
  "DO" : 0,
  "DC" : 1,
  "DP" : 0,
  "liftId": 'LIFT NO',
  "Ser_time" : '1/9/2023 2:11:29 PM',
  "processorOutputStatusValue":""
};

  index = 0; 
  Datas = [];
  current_value_details = this.latest_value[0];
  current_value_mode_event = this.latest_value_mode_event[0];
  index_value = 0;

  constructor(private authService: ApiService, private router: Router) { this.user = this.authService.currentUser(); }
  
  
  ngOnInit() {
    this.pauseTimer_one();
    this.pauseTimer();
    this.timeLeft = 0;    
    this.timeLeft_one = 0;
   
    if(this.index_value == 0){
      this.latest_value = [
        { "floor_no": 0, 
          "floor_direction": 0,
          "floor_status" : 'Close',
          "value":"0000",
          "door_dir_txt" : 'StandBy',
          "DO" : 0,
          "DC" : 1,
          "DP" : 0,
          "liftId": 'LIFT NO',
          "Ser_time" : '1/9/2023 2:11:29 PM',
          "processorOutputStatusValue":""
        }
       ];
       this.latest_value_mode_event  = [
         {
           Car_attd_mode : 0,
           Car_auto : 0,
           EL_maintain_mode : 0,
           FireMan : 0,
           Power_fail : 0,
           value : 0,
           park_mode : 0,
           full_load :  0,
           over_load :0,
           error : 0,
         }
       ];
    } else {
      let temp_value = this.latest_value[this.latest_value.length - 1];
      this.latest_value = [];
      this.latest_value.push(temp_value);      
    }
       this.Datas = [];
       this.index = 0; 
       this.authService.getliftLayoutList(this.enterliftId).subscribe((data:any)=>{
       this.Datas = data.Data.Multiple;
       this.Datas.sort((a,b) => a.getTimestamp.localeCompare(b.getTimestamp));
       this.recall();
  });
 }



 recall(){
  if(this.index < this.Datas.length){
  if(this.Datas[this.index].Code == "40002"){     
    var DO = +this.Datas[this.index].Door_Full_Open;
    var DC = +this.Datas[this.index].Door_Full_close;
    var DP = +this.Datas[this.index].Door_parti_Open;
    var door_status = 'Close';
    if(DO == 1 && DP == 0 && DC == 0){
      door_status = 'Open';
    }else if(DO == 1 && DP == 1 && DC == 0){
      door_status = 'Open';
    }
    else if(DO == 0 && DP == 0 && DC == 1){
      door_status = 'Close';
    }
    else if(DO == 0 && DP == 0 && DC == 0){
      door_status = 'Close';
    }
    else if(DO == 0 && DP == 1 && DC == 0){
      door_status = 'Par';
    } 
    
  
    var door_dir_txt = 'StandBy';
    if(this.latest_value[this.latest_value.length - 1].floor_no < this.Datas[this.index].Floor_position - 1){
      var door_dir_txt = 'Up';
    } else if (this.latest_value[this.latest_value.length - 1].floor_no == this.Datas[this.index].Floor_position - 1){
      var door_dir_txt = 'StandBy';
    } else if (this.latest_value[this.latest_value.length - 1].floor_no > this.Datas[this.index].Floor_position - 1){
      var door_dir_txt = 'Down';
    }
    
  


    this.latest_value.push({ "floor_no": this.Datas[this.index].Floor_position - 1, 
    "floor_direction": 1,
    "floor_status" : door_status,
    "value":  this.Datas[this.index].Code ,
    "door_dir_txt" : door_dir_txt,
    "DO" : DO,
    "DC" : DC,
    "DP" : DP,
    "liftId": this.Datas[this.index].liftId, 
    "Ser_time" : this.Datas[this.index].scheduleServerTimestamp, 
    "processorOutputStatusValue": this.Datas[this.index].processorOutputStatusValue
     });

     this.existing_lastindex = this.latest_value[this.latest_value.length - 1];
     this.index = this.index + 1;
     this.recall();

}
else if(this.Datas[this.index].Code == "40005"){
  this.latest_value_mode_event.push( {
    Car_attd_mode : this.Datas[this.index].Car_attd_mode,
    Car_auto : this.Datas[this.index].Car_auto,
    EL_maintain_mode : this.Datas[this.index].EL_maintain_mode,
    FireMan : this.Datas[this.index].FireMan,
    Power_fail : this.Datas[this.index].Power_fail,
    value : this.Datas[this.index].Code,
    park_mode : this.Datas[this.index].park_mode,
    full_load :  this.Datas[this.index].full_load,
    over_load : this.Datas[this.index].over_load,
    error : this.Datas[this.index].error,
  } );
  this.index = this.index + 1
  this.recall();
} else {
  this.index = this.index + 1
  this.recall();
}
  } else {
    this.startTimer();
    this.startTimer_two();
    this.timeLeft = 0;
  }
 }



 startTimer() {
  this.interval = setInterval(() => {
    if(this.latest_value.length > this.timeLeft) {       
      if(this.timeLeft !== 0){
        this.current_value_details = this.latest_value[this.timeLeft];
      } else {
        this.current_value_details = this.latest_value[this.timeLeft];
      }
      this.timeLeft++;
    } else {
      var counts  = this.latest_value.length - 1;
      for(let a  = 0 ; a < counts; a++){
        this.latest_value.splice(0,1);
        if(a == counts - 1){ 

          this.fetch_data_again();
          console.log("API RECALL");
          
        } 
      }
      this.pauseTimer();
    }
  },1500)
}


startTimer_two() {

  // this.latest_value_mode_event.push( {
  //   Car_attd_mode : '-',
  //   Car_auto : '-',
  //   EL_maintain_mode : '-',
  //   FireMan : '-',
  //   Power_fail : '-',
  //   value : '-',
  //   park_mode : '01',
  //   full_load :  '-',
  //   over_load : '-',
  //   error : '-',
  // } );

 this.current_value_mode_event = this.latest_value_mode_event[this.latest_value_mode_event.length - 1];


}


pauseTimer_one() {
  clearInterval(this.interval_one);
}



pauseTimer() {
  clearInterval(this.interval);
}

fetch_data_again(){
  this.authService.getliftLayoutList(this.enterliftId).subscribe((data:any)=>{
    this.Datas = data.Data.Multiple;
    console.log(this.Datas);
    this.Datas.sort((a,b) => a.getTimestamp.localeCompare(b.getTimestamp));
    if(this.Datas.length !== 0 ){
      let DO = +this.Datas[this.Datas.length - 1].Door_Full_Open;
      let DC = +this.Datas[this.Datas.length - 1].Door_Full_close;
      let DP = +this.Datas[this.Datas.length - 1].Door_parti_Open;
      let door_status = 'Close';
      if(DO == 1 && DP == 0 && DC == 0){
        door_status = 'Open';
      }else if(DO == 1 && DP == 1 && DC == 0){
        door_status = 'Open';
      }
      else if(DO == 0 && DP == 0 && DC == 1){
        door_status = 'Close';
      }
      else if(DO == 0 && DP == 0 && DC == 0){
        door_status = 'Close';
      }
      else if(DO == 0 && DP == 1 && DC == 0){
        door_status = 'Par';
      } 

      var check_floor_value = this.latest_value[0];
    
   


     console.log("Floor",check_floor_value.floor_no,this.Datas[this.Datas.length - 1].Floor_position - 1);
     console.log("Ser Time",check_floor_value.Ser_time, this.Datas[this.Datas.length - 1].scheduleServerTimestamp);
     console.log("Status",check_floor_value.floor_status, door_status);
     if(check_floor_value.floor_no  == this.Datas[this.Datas.length - 1].Floor_position - 1
     && check_floor_value.Ser_time == this.Datas[this.Datas.length - 1].scheduleServerTimestamp
     && check_floor_value.floor_status == door_status
     ){
      var tracking = setInterval(() => {
        this.fetch_data_again();
        console.log("DATA MATCH API RECALL");
          clearInterval(tracking);
       }, 5000);


 
      } else {
       this.index = 0; 
       console.log("First Recall value");
       this.recall();
      }
     } else {

    var tracking = setInterval(() => {
      this.fetch_data_again();
      console.log("DATA NULL API RECALL");
        clearInterval(tracking);
     }, 5000);

      

     }

    // this.index = 0;
    // this.recall();
});
}





  map(){

 }
}

