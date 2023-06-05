import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';    
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from 'src/service/api.service';


@Component({
  selector: 'app-manage-user-details',
  templateUrl: './manage-user-details.component.html',
  styleUrls: ['./manage-user-details.component.css']
})
export class ManageUserDetailsComponent implements OnInit {

  loading :boolean = false;
  userList: any[] = [];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  currentUser: any;
  PAGE_SIZE = 10;
  PAGINATION_RANGE =[5,10,25,100];
  DATE_FORMAT = "dd-MMM-yyyy hh:mm:ssa"
  user: any;
  title="Manage Users";
  term:string;
  constructor(private authService: ApiService,private fb: FormBuilder,  private router: Router)
   {  this.user = this.authService.currentUser();}

  public displayedColumns: string[] =  ['sno','customername','email','password','location',
  'building_block_name', 'lift_num_sec', 'total_num_of_lifts', 'number_of_lifts_perdisplay','createdDate','actions'];
  public displayedLabelColumns: string[] = ['sno','customername','email','password','location',
  'building_block_name',  'lift_num_sec','total_num_of_lifts', 'number_of_lifts_perdisplay','created Date','Actions'];

  dataSource!: MatTableDataSource<any>;




  ngOnInit() {
    this.loadData();
  }

  loadRecord() {   
    this.dataSource = new MatTableDataSource(this.userList);
    this.dataSource.paginator = this.paginator;
    setTimeout(() => this.dataSource.sort = this.sort, )
  }

   loadData() {debugger
    this.authService.getUserList().subscribe((response) => {
      this.userList = response;
      console.log(" this.userList", this.userList);
      this.userList = this.userList.filter((item) => item.firstName !== "ADMIN");
      this.loadRecord();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


 public addRecord() {
  this.router.navigate(['layout/user-type']);
}



public editRecord(items:any) {debugger
  var navigationExtras = { queryParams: { id:items._id}};
  this.router.navigate(['layout/user-type'],navigationExtras);
}

public viewRecord(items:any) {debugger
  var navigationExtras = { queryParams: { id:items._id,viewMode:"true"}};
  this.router.navigate(['layout/user-type'],navigationExtras);
}


deleteRecord(item:any){debugger;

  Swal.fire({
    // title: 'Are you sure?',
    text: "Are you sure you want to delete the user detail?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.authService.deleteUserDetails(item._id).pipe()
      .subscribe( data => {
        Swal.fire({toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: "Deleted Successfully", icon: 'success', });
        this.ngOnInit();
      })
    }
  })

 
}



}

