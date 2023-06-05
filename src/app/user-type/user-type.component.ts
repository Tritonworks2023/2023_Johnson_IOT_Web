import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from "@angular/material/dialog";
import { AbstractControl, Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from "@angular/router";
import { timer } from 'rxjs';
import Swal from "sweetalert2";
import { ApiService } from "src/service/api.service";
@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.css']
})
export class UserTypeComponent implements OnInit  {

  lift:any = 0;
  @ViewChild('test1', { static: false }) content: ElementRef;
  testAttributesMap = new Map();
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  PAGE_SIZE = 10;
  PAGINATION_RANGE =[5,10,25,100];
  DATE_FORMAT = "dd-MMM-yyyy hh:mm:ssa"
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  error = '';
  salesPersonList:any;
  dynamicTableData: any[];
  user: any;
  title="Create User Details";
  rows: FormArray = this.fb.array([]);
  public addEditForm!: FormGroup;
  id: any;
  viewMode: any;
  constructor(public dialog: MatDialog,private authService: ApiService,private fb: FormBuilder,
    private route: ActivatedRoute, private router: Router )
   {  this.user = this.authService.currentUser();
  
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.viewMode = params['viewMode'];
      
    });
  }

   displayColumns = ['lift_no','lift_name','number_of_floors','status','action'];

    
  ngOnInit() {debugger;

    this.addEditForm = this.fb.group({
      customername: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      location:['',Validators.required],
      building_block_name:['',Validators.required],
      lift_num_sec:['',Validators.required],
      total_num_of_lifts:['',Validators.required],
      number_of_lifts_perdisplay:['',Validators.required],
      marks: this.rows ,
    });

    if(this.id){
      debugger
      this.getUserbyId();
    }
    if(this.id && this.viewMode){
      this.title = "View User Details"
    }

  }

  deleteRow(index:any){
    // while (this.rows.length !== 0) {
    //     this.rows.removeAt(0);
    //   }

    this.lift = this.lift - 1;
    this.rows.removeAt(index);
    this.updateView();
  }

  addRow() {
    const row = this.fb.group({
      'lift_no': ['',Validators.required],
      'lift_name': ['',Validators.required],
      'number_of_floors': ['',Validators.required],
      'status':'1',
    });
    this.rows.push(row);
    this.updateView();
  }

  updateView() {
    this.dataSource.next(this.rows.controls);
  }

  getUserbyId(){
    this.authService.getUserbyId(this.id).pipe()
    .subscribe( data => {
        console.log("data ",data); 

        this.addEditForm.patchValue({
          customername: data?.customername,
          location:data?.location,
          building_block_name:data?.building_block_name,
          lift_num_sec:data?.lift_num_sec,
          total_num_of_lifts:data?.total_num_of_lifts,
          number_of_lifts_perdisplay:data?.number_of_lifts_perdisplay,
          email: data?.email,
          password: data?.password,
        });

        
        var getArrValue = data.liftArray;
        getArrValue && getArrValue.forEach(ele => {
          this.rows.push(this.fb.group({
            'lift_no':[ele.lift_no],
            'lift_name':[ele.lift_name],
            'number_of_floors':[ele.number_of_floors],
            'status':[ele.status],
          }));
          this.updateView();
        })

       
      });
  }


  onSearchChange(searchValue: string): void {  debugger;
   
    
    for (let i = 0; i == this.rows.length; i++) {
      this.rows.removeAt(i);
     }
     this.updateView();
    var value:any=  parseInt(searchValue);
    for (let i = 0; i < value; i++) {
     this.addRow()
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  submit(){debugger
    // stop here if form is invalid
    if (this.addEditForm.invalid) {
      Swal.fire({toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: "Please fill all fields ", icon: 'error', });
      return;
    }

    var enteredData = this.addEditForm.value;
    enteredData.id = this.id;
    if(this.id){
      this.authService.updateUserDetails(enteredData).pipe()
      .subscribe( data => {
          console.log("data ",data); 
          Swal.fire({toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: "Updated Successfully", icon: 'success', });
           this.router.navigate(['layout/manage-user']);
        });
    }else{
      this.authService.createUserDetails(enteredData).pipe()
      .subscribe( data => {
          console.log("data ",data); 
          Swal.fire({toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: "Created Successfully", icon: 'success', });
           this.router.navigate(['layout/manage-user']);
        });
    }
  
  }

  cancel() {
    this.router.navigate(['layout/manage-user']);
  }
  

  inputLift(num){
    if(num <=0){
      Swal.fire({toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: "Negative value not allowed", icon: 'error', });
      this.addEditForm.patchValue({
        number_of_lifts_perdisplay: "",
       })
    }else if(num <= 6){

   }else{
    Swal.fire({toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: "Number of lift display can't exceed more than 6", icon: 'error', });
    this.addEditForm.patchValue({
      number_of_lifts_perdisplay: "",
     })
     }

  }

  addRowItem(){
    this.addRow();
    this.lift = this.lift + 1;
  }

}