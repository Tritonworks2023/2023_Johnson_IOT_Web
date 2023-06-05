import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/provider/dashboard.service';
import { AbstractControl,FormBuilder, FormGroup, Validators ,FormArray, FormControl,} from '@angular/forms';
import { Observable, interval, Subscription } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Table } from "primeng/table";

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {
    @ViewChild("tt") table: Table;
  config:any;
  entrap:any; startIndex = 0;
  endIndex = 5; term:string;
  branchForm:FormGroup;
  branchList:any;
  addmode:boolean=true;
  editmode:boolean=false;
  userData:any;
  submitted :boolean=false;
  branch_code:FormArray;
  location:Array<any>;
  editUser:boolean=false;
  delUser:boolean=false;
  checkstatus:boolean=false;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  constructor(private router:Router, private toastr:ToastrManager,private dashboardservice :DashboardService, private formBuilder: FormBuilder,) {
//     this.branchForm = this.formBuilder.group({
//  _id:[''],
// name:['',Validators.required,],
// emp_no:['',Validators.required,],
// agent_code:['',Validators.required,],
// branch_code:this.formBuilder.array([]),
// password:['',Validators.required,],
// email_id:['', [Validators.required,Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
// phone_number:['',Validators.required,],
// last_login_date:new Date(),
// active_status:['',Validators.required,]
//     })
//     this.branch_code = this.branchForm.get('branch_code') as FormArray;
   }

   
  ngOnInit(): void {
    this.branchForm = this.formBuilder.group({
        _id:[''],
        branch_code:['',Validators.required],
        branch_name:['',Validators.required],
        branch_lat:['',Validators.required],
        branch_long:['',Validators.required],
       
      
        updated_at:new Date(),
    
           })
           this.branch_code = this.branchForm.get('branch_code') as FormArray;
      this.addmode=true;
      
      this.selectdata=[];
    console.log( this.branchForm.value)

    this.getData();

var bb=this.location.sort((a,b) => a.BBRCD.localeCompare(b.BBRCD));
console.log(bb)
  this.config = {
    id: 'pagination1',
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.total
  }
 
 
  }
  get f(): { [key: string]: AbstractControl } {
    return this.branchForm.controls;
  }
  
  
  total:any
  getData(){
    this.dashboardservice.getBranchList().subscribe((data)=>
    {
        console.log(data)
      this.branchList=data['Data'];
      this.total= this.branchList.length;
      console.log(this.branchList)
      })
     
   
  }
  pageChanged(event){
    this.config.currentPage = event;
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
  addUser(){
if(this.branchForm.controls.branch_code.value==''){
    this.checkstatus=true;
}
    this.submitted=true;
if(this.branchForm.valid){
    this.dashboardservice.addBranch(this.branchForm.value).subscribe((data:any)=>{
        console.log(data);
        if(data['Status']=='Success'){
            this.submitted=false;
            this.showSuccess("Branch added successfully")
            this.branchForm.reset();
            this.ngOnInit();
        }
        else{
            this.showError(data['Message'])
        }
    })
}
else{
    this.showWarning("Enter Vaild details")
}
  }


  onCheckboxChange(e:any) {
if(this.addmode==true){
    if (e.target.checked) {
        this.checkstatus=false;
        this.branch_code.push(new FormControl(e.target.value));
      
    } else {
      let i: number = 0;
      this.branch_code.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
            this.branch_code.removeAt(i);
          return;
        }
        i++;
      });
    }
}
    
    if(this.editmode==true){
    
      
        
        if (e.target.checked) {
          
       
            this.branch_code.push(new FormControl(e.target.value));
            this.branch_code.controls= [...new Set( this.branch_code.controls)];
            console.log(this.branch_code.controls)
            console.log(this.branchForm.get('branch_code').value)
            
        } else {
          let i: number = 0;
          this.branch_code.controls.forEach((item: any) => {
            if (item.value == e.target.value) {
                this.branch_code.removeAt(i);
              return;
            }
            i++;
          });
        }
        if(e.target.checked==false){
            let i: number = 0;
            this.branch_code.controls.forEach((item: any) => {
              if (item.value == e.target.value) {
                  this.branch_code.removeAt(i);
                return;
              }
              i++;
            });
        }
    }
  

  
  }
  showSuccess(msg) {
    this.toastr.successToastr(msg);
  }

  showError(msg) {
      this.toastr.errorToastr(msg);
  }

  showWarning(msg) {
      this.toastr.warningToastr(msg);
  }
  del;
  deleteUser(item){
    this.editUser=false;
    this.delUser=true;
    this.del = {
        '_id': item
      };
    
  
  }
  selectdata=[];
  result=[];
  edit(item){
    
      console.log(item)
// this.editmode=true;
// this.addmode=false;
this.editUser=true;
this.delUser=false;
this.userData=item;

console.log(this.branchForm.value)
  }
  Edit_user(){

this.dashboardservice.editBranch(this.branchForm.value).subscribe((data:any)=>{
    this.showSuccess(data['Message'])
    this.ngOnInit();
})
this.editmode=false;
this.ngOnInit();
 this.branchForm.reset();
 
//  window.location.reload();
this.getData();
// this.selectdata=[];
  }
  cancel(){
    this.editmode=false;
    this.ngOnInit();
    this.branchForm.reset();
  }
  keyPressAlphanumeric(event) {

    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  map(){
    this.router.navigateByUrl('/layout/maps')
  
}
view(){
    this.editmode=true;
    this.addmode=false;
    this.closeBtn.nativeElement.click();
   
    this.branchForm.patchValue({
        _id:this.userData._id,
        branch_code:this.userData.branch_code,
        branch_name:this.userData.branch_name,
        branch_lat:this.userData.branch_lat,
        branch_long:this.userData.branch_long,
    
    })
}
deluserdata(){
    this.editmode=false;
this.addmode=true;
    this.dashboardservice.deletebranch(this.del).subscribe(
        (response: any) => {
          console.log(response.Data);
          //alert('Deleted Successfully');
          this.showSuccess("Deleted Successfully")
          this.ngOnInit();
        }
      );
      this.closeBtn.nativeElement.click();
}

}
