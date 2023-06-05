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

  Breakdown_color = '';
  Entrapment_color = '';
  current_value_details = { "floor_no": 0, 
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



  latest_value = []
  latest_value_mode_event:any



  current_value_mode_event = {
    SAUTOMODE5 : 0,
    SLOCREMOTE5 : 0,
    SPARKMODE5 : 0,
    SFIREMAN5 : 0,
    SMAINTMODE5 : 0,
    SARDMODE5 : 0,
    SCARALARM5 : 0,
    SPOWERSUP5 :  0,
    SOVERLOAD5 :0,
    SFULLLOAD5 : 0,
    SFAULTEVENT5 : 0,
    SNEXTLAND5 : 0,
    SSAFELAND5 : 0,
    SEXTINPUT5 : 0,
  }

  enterliftId = 'L1603-M01'

  timeLeft: number = 0;
  interval;

  last_count_value = 0;

  start_value = 0;
  end_value = 0;

constructor(private authService: ApiService, private router: Router) {
  this.pauseTimer();
  
  var latest_value_mode_event = sessionStorage.getItem('latest_value_mode_event');
  console.log(latest_value_mode_event);
  latest_value_mode_event  = JSON.parse(latest_value_mode_event);
  console.log(latest_value_mode_event);
  var latest_value_mode_event_arry = latest_value_mode_event;
  if(latest_value_mode_event == null || latest_value_mode_event == undefined || latest_value_mode_event == ""){
    this.latest_value_mode_event = [];
  } else {
    this.latest_value_mode_event = latest_value_mode_event_arry;
  }
 }
  
  
ngOnInit() {
  this.pauseTimer();
  this.authService.getliftLayoutList_count(this.enterliftId).subscribe((data:any)=>{
   console.log(data);
   if(data.Data[0].TOTCNT == 0){
    alert("No Record Found Today");
   }else {
    let last_value = data.Data[0].TOTCNT;
    this.start_value = last_value;
    this.end_value = this.start_value + 5;
    console.log(this.start_value,this.end_value);
    this.get_data(this.start_value,this.end_value);
   }


   });


}

get_data(start_value,end_value){
console.log(start_value,end_value);
let datass = {
  FROMREC : start_value,
  TOREC : end_value,
  job_id : this.enterliftId
}
this.authService.getliftLayoutList_detail(datass).subscribe((data:any)=>{
  console.log(data);
  
  this.Breakdown_color = data.Breakdown.color;
  this.Entrapment_color = data.Entrapment.color;
  
  console.log(this.Breakdown_color,this.Entrapment_color);

  if(data.Data.length == 0){
  
    var tracking = setInterval(() => {
      this.get_data(this.start_value,this.end_value);
      console.log("DATA MATCH API RECALL");
        clearInterval(tracking);
     }, 10000);


  }else {
    this.start_value = this.start_value + data.Data.length;
    this.latest_value = data.Data;
    this.startTimer();
  }
});

}



startTimer() {
  this.interval = setInterval(() => {
    console.log(this.timeLeft);
    if(this.latest_value.length > this.timeLeft) {   
     if(this.latest_value[this.timeLeft].SFDSTATUS == null){
       this.latest_value_mode_event = [];
       sessionStorage.setItem('latest_value_mode_event',JSON.stringify(this.latest_value_mode_event));
      this.current_value_mode_event = {
        SAUTOMODE5 :  this.latest_value[this.timeLeft].SAUTOMODE5,
        SLOCREMOTE5 : this.latest_value[this.timeLeft].SLOCREMOTE5,
        SPARKMODE5 :  this.latest_value[this.timeLeft].SPARKMODE5,
        SFIREMAN5 :   this.latest_value[this.timeLeft].SFIREMAN5,
        SMAINTMODE5 : this.latest_value[this.timeLeft].SMAINTMODE5,
        SARDMODE5 :   this.latest_value[this.timeLeft].SARDMODE5,
        SCARALARM5 :  this.latest_value[this.timeLeft].SCARALARM5,
        SPOWERSUP5 :  this.latest_value[this.timeLeft].SPOWERSUP5,
        SOVERLOAD5 :  this.latest_value[this.timeLeft].SOVERLOAD5,
        SFULLLOAD5 :  this.latest_value[this.timeLeft].SFULLLOAD5,
        SFAULTEVENT5: this.latest_value[this.timeLeft].SFAULTEVENT5,
        SNEXTLAND5 :  this.latest_value[this.timeLeft].SNEXTLAND5,
        SSAFELAND5 :  this.latest_value[this.timeLeft].SSAFELAND5,
        SEXTINPUT5 :  this.latest_value[this.timeLeft].SEXTINPUT5,
      }
       this.latest_value_mode_event.push(this.latest_value[this.timeLeft]);
       sessionStorage.setItem('latest_value_mode_event',JSON.stringify(this.latest_value_mode_event));
     } else {
      if(this.latest_value[this.timeLeft].SDOOROPCL2 == 1){
        this.current_value_details.floor_status = "Par" 
      }
      if(this.latest_value[this.timeLeft].SDOOROPLIM2 == 1){
        this.current_value_details.floor_status = "Open"  
      }
      if(this.latest_value[this.timeLeft].SDOORCLLIM2 == 1){
        this.current_value_details.floor_status = "Close"  
      }
      if(this.latest_value[this.timeLeft].SRUNSTAT2 == 1){
        this.current_value_details.floor_status = "Close"  
      }
      if(this.latest_value[this.timeLeft].SDIRECTION2 == 0){
        this.current_value_details.door_dir_txt = 'Down'
      }
      if(this.latest_value[this.timeLeft].SDIRECTION2 == 1){
        this.current_value_details.door_dir_txt = 'Up'
      }
      if(this.latest_value[this.timeLeft].SRUNSTAT2 == 0 && this.latest_value[this.timeLeft].SDIRECTION2 == 0){
        this.current_value_details.door_dir_txt = 'StandBy' 
      }
      this.current_value_details.floor_no = this.latest_value[this.timeLeft].SFDESSTATVAL;
      console.log(this.current_value_details);
     }
      this.timeLeft++;
    } else {
      this.pauseTimer();
      this.timeLeft = 0;
      console.log(this.start_value,this.end_value);
      this.end_value = this.start_value + 5;
      console.log(this.start_value,this.end_value);
      this.get_data(this.start_value,this.end_value);  
    }
  },1500)
}

pauseTimer() {
  clearInterval(this.interval);
}


map(){

}


// restart(last_value){
// console.log(last_value);
// let start_value = last_value;
// let end_value = start_value + 10;
// console.log(start_value,end_value);
// this.last_count_value = end_value;

// let datass = {
//   FROMREC : start_value,
//   TOREC : end_value,
//   // enterliftId : this.enterliftId
// }
// this.authService.getliftLayoutList_detail(datass).subscribe((data:any)=>{
//   console.log(data);
//   this.latest_value = data.Data;
//   // this.startTimer();
// });
// }





}

