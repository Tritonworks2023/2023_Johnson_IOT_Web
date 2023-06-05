import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  typeSelected: string;

  constructor(private spinnerService: NgxSpinnerService) {
    this.typeSelected = 'ball-fussion';
  }

  
  ngOnInit(){
    this.spinnerService.show();
    
    setTimeout(() => {
      this.spinnerService.hide();
    }, 15000); 
  }

}
