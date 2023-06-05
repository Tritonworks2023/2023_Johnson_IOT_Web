import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/provider/dashboard.service';
import { AbstractControl,FormBuilder, FormGroup, Validators ,FormArray, FormControl,} from '@angular/forms';
import { Observable, interval, Subscription } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
import { KeyValue } from '@angular/common';
import { Table } from "primeng/table";
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
    @ViewChild('TABLE') table1: ElementRef;
  config:any;
  entrap:any; startIndex = 0;
  endIndex = 5; term:string;
  userForm:FormGroup;
  userList:any;
  addmode:boolean=true;
  editmode:boolean=false;
  @ViewChild("tt") table: Table;
  userData:any;
  submitted :boolean=false;
  branch_code:FormArray;
  location:Array<any>;
  editUser:boolean=false;
  delUser:boolean=false;
  checkstatus:boolean=false;
  
  @ViewChild('closeBtn') closeBtn: ElementRef;
  constructor(private router:Router, private toastr:ToastrManager,private dashboardservice :DashboardService, private formBuilder: FormBuilder,) {
//     this.userForm = this.formBuilder.group({
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
//     this.branch_code = this.userForm.get('branch_code') as FormArray;
   }

   
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
        _id:[''],
       name:['',Validators.required],
       emp_no:['',Validators.required],
       agent_code:['',Validators.required],
       branch_code:this.formBuilder.array([], [Validators.required]),
       password:['',Validators.required,],
       email_id:['',],
       phone_number:['',],
       last_login_date:new Date(),
       active_status:['1']
           })
           this.branch_code = this.userForm.get('branch_code') as FormArray;
      this.addmode=true;
      
      this.selectdata=[];
    console.log( this.userForm.value)

    this.getData();
this.getlocation();
console.log(this.location)

  this.config = {
    id: 'pagination1',
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.total
  }
 
 
  }
  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }
  
  getlocation(){
    this.dashboardservice.getBranchList().subscribe((data)=>
    {
        console.log(data)
      this.location=data['Data'];
      var bb=this.location.sort((a:any,b:any) => a.branch_code.localeCompare(b.branch_code));
      console.log(bb)
      console.log(this.location)
      })
    //  this.location = [
    //     {
    //         BBRCD:"TN01",
    //         BBRNAME:"CHENNAI (HO)",
    //         px:13.09687545290434,
    //         py:80.19770397892752
    //     },
    //     {
    //         BBRCD:"TN15",
    //         BBRNAME:"SALEM",
    //         px:11.675645949254895,
    //         py:78.1403088697189,
    
    //     },
    //     {
    //         BBRCD:"TN03",
    //         BBRNAME:"COIMBATORE",
    //         px:11.05604604583771,
    //         py: 76.98591689670215,
    
    //     },
    //     {
    //       BBRCD:"JK01",
    //       BBRNAME:"JAMMU KASHMIR",
    //       px:34.083656,
    //       py: 74.797371,
    
    //   },
    //     {
    //         BBRCD:"TN09",
    //         BBRNAME:"MADURAI",
    //         px:9.887014382885422,
    //         py: 78.05796261018843,
    
    //     },
    //     {
    //         BBRCD:"TN02",
    //         BBRNAME:"VELLORE ",
    //         px:12.97853879194906,
    //         py: 79.13573513077569,
    
    //     },
    //     {
    //         BBRCD:"TN04 ",
    //         BBRNAME:"TRICHY",
    //         px:10.79470445006396,
    //         py:78.68913192738314,
    
    //     },
    //     {
    //         BBRCD:"KL02",
    //         BBRNAME:"COCHIN",
    //         px:9.961578201802183,
    //         py:76.35785375251815,
    
    //     },
    //     {
    //         BBRCD:"KL03",
    //         BBRNAME:"CALICUT",
    //         px:11.289046054477243,
    //         py:75.78570240469517,
    
    //     },
    //     {
    //         BBRCD:"KL01",
    //         BBRNAME:"TRIVANDRUM",
    //         px:8.545958478472773,
    //         py:76.96179642737017,
    
    //     },
    //     {
    //         BBRCD:"TG01",
    //         BBRNAME:"HYDERABAD",
    //         px:16.49501672010808,
    //         py:78.44442359676756,
    
    //     },
    //     {
    //         BBRCD:"AP03",
    //         BBRNAME:"VIJAYAWADA",
    //         px:16.49501672010808,
    //         py:80.67330556976714,
    
    //     },
    //     {
    //         BBRCD:"AP04",
    //         BBRNAME:"VIZAG",
    //         px:17.756331678214035,
    //         py:83.3411029814299,
    
    //     },
    //     {
    //         BBRCD:"AP02",
    //         BBRNAME:"TIRUPATI",
    //         px:13.62534456290723,
    //         py:79.4308072390529,
    
    //     },
    //     {
    //         BBRCD:"KA01",
    //         BBRNAME:"BANGALORE",
    //         px:12.979887449144286,
    //         py:77.55226121021151,
    
    //     },
    //     {
    //         BBRCD:"KA03",
    //         BBRNAME:"MANGALORE",
    //         px:12.909904274357626,
    //         py:74.83698048322312,
    
    //     },
    //     {
    //         BBRCD:"TN17",
    //         BBRNAME:"PERUNGUDI",
    //         px:12.693933,
    //         py:79.975662,
    
    //     },
    //     {
    //         BBRCD:"DL01/HR02/RJ01",
    //         BBRNAME:"GURGAON",
    //         px:28.511037404084522,
    //         py:77.08133784299423,
    
    //     },
    //     {
    //         BBRCD:"RJ02",
    //         BBRNAME:"JAIPUR",
    //         px:26.841173066679733,
    //         py:75.80885818087438,
    
    //     },
    //     {
    //         BBRCD:"UP02",
    //         BBRNAME:"LUCKNOW",
    //         px:26.86018570971989,
    //         py:80.98857422576802,
    
    //     },
    //     {
    //         BBRCD:"UP03",
    //         BBRNAME:"NOIDA",
    //         px:28.6227086011461,
    //         py:77.38636585464324,
    
    //     },
    //     {
    //         BBRCD:"OR02",
    //         BBRNAME:"BHUBANESWAR",
    //         px:20.287136248795452,
    //         py:85.80746324204331,
    
    //     },
    //     {
    //         BBRCD:"WB01",
    //         BBRNAME:"KOLKATA",
    //         px:22.52573347408355,
    //         py:88.39508844102312,
    
    //     },
    //     {
    //         BBRCD:"BR01",
    //         BBRNAME:"PATNA",
    //         px:25.616550926004713,
    //         py:85.12074504841152,
    
    //     },
    //     {
    //         BBRCD:"JH01",
    //         BBRNAME:"RANCHI",
    //         px:23.354289931189832,
    //         py:85.32337751220297,
    
    //     },
    //     {
    //         BBRCD:"GJ01",
    //         BBRNAME:"AHMEDABAD",
    //         px:23.075636616207355,
    //         py:72.52611964011618,
    
    //     },
    //     {
    //         BBRCD:"MH01",
    //         BBRNAME:"MUMBAI",
    //         px:19.126330728739603,
    //         py:72.87230341028464,
    
    //     },
    //     {
    //         BBRCD:"MH04",
    //         BBRNAME:"MUMBAI (VASHI)",
    //         px:19.114376294955182,
    //         py:73.01987048329659,
    
    //     },
    //     {
    //         BBRCD:"MH08",
    //         BBRNAME:"NASHIK",
    //         px:20.012845354893038,
    //         py:73.77123372617095,
    
    //     },
    //     {
    //         BBRCD:"MH02",
    //         BBRNAME:"NAGPUR",
    //         px:21.125647079306937,
    //         py:79.06336612380997,
    
    //     },
    //     {
    //         BBRCD:"MH05",
    //         BBRNAME:"PUNE",
    //         px:18.511110992432595,
    //         py:73.91555257035532,
    
    //     },
    //     {
    //         BBRCD:"GJ02",
    //         BBRNAME:"VADODARA",
    //         px:22.31576281557213,
    //         py:73.1505150563608,
    
    //     },
    //     {
    //         BBRCD:"GJ03",
    //         BBRNAME:"SURAT",
    //         px:21.194775851222605,
    //         py:72.77927952565858,
    
    //     },
    //     {
    //         BBRCD:"GA01",
    //         BBRNAME:"GOA",
    //         px:15.375924750835413,
    //         py:73.92579751193894,
    
    //     },
    //     {
    //         BBRCD:"AS01",
    //         BBRNAME:"GUWAHATI",
    //         px:26.12897929104257,
    //         py:91.79879065458763,
    
    //     },
    //     {
    //         BBRCD:"MP03",
    //         BBRNAME:"BHOPAL",
    //         px:23.27355048968373,
    //         py:77.46441821404896,
    
    //     },
    //     {
    //         BBRCD:"MP02",
    //         BBRNAME:"INDORE",
    //         px:21.25175580541679,
    //         py:81.66569960432855,
    
    //     },
    //     {
    //         BBRCD:"CG01",
    //         BBRNAME:"RAIPUR",
    //         px:21.25175580541679,
    //         py:81.66569960432855,
    
    //     },
    //     {
    //         BBRCD:"HR06",
    //         BBRNAME:"FARIDABAD",
    //         px:28.382863821907073,
    //         py:77.29017582764985,
    
    //     },
    //     {
    //         BBRCD:"HR08",
    //         BBRNAME:"SONIPET",
    //         px:29.006077161322782,
    //         py:77.03305335280477,
    
    //     },
    //     ];
  


}
  total:any
  getData(){
    this.dashboardservice.getUserList().subscribe((data)=>
    {
        console.log(data)
      this.userList=data['Data'];
      this.total= this.userList.length;
      console.log(this.userList)
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
if(this.userForm.controls.branch_code.value==''){
    this.checkstatus=true;
}
    this.submitted=true;
if(this.userForm.valid){
    this.dashboardservice.addUser(this.userForm.value).subscribe((data:any)=>{
        console.log(data);
        if(data['Status']=='Success'){
            this.submitted=false;
            this.showSuccess("User added successfully")
            this.userForm.reset();
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
      console.log("ss", this.branch_code)
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
            console.log(this.userForm.get('branch_code').value)
            
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
    this.getlocation();
      console.log(item)
// this.editmode=true;
// this.addmode=false;
this.editUser=true;
this.delUser=false;
this.userData=item;

// this.userForm.patchValue({
//     _id:this.userData._id,
//     active_status: this.userData.active_status,
// agent_code:this.userData.agent_code,
// branch_code: (this.userData.branch_code),
// email_id:this.userData.email_id,
// emp_no: this.userData.emp_no,
// last_login_date: this.userData.last_login_date,
// name: this.userData.name,
// password: this.userData.password,
// phone_number:this.userData.phone_number,

// })
// this.userData.branch_code.map((e:any)=>{
//     console.log(e)
//     this.branch_code.push(new FormControl(e));
// })
// console.log(this.userData.branch_code)
// // const branch_code: FormArray = this.userForm.get('branch_code') as FormArray;

// this.userData.branch_code.map((e:any)=>{
//     this.selectdata.push({BBRCD:e,check:true})
// })
// console.log(this.selectdata)
// const mergeById = (array1:any, array2:any) =>
// array1.map((itm: { BBRCD: any; }) => ({
// ...array2.find((item:any) => (item.BBRCD === itm.BBRCD) && item),
// ...itm
// }));
// this.location = mergeById(this.location,this.selectdata);
console.log(this.userForm.value)
  }
  Edit_user(){

  let aa=  [...new Set( this.userForm.get('branch_code').value)];
  console.log(aa)
  
   
this.dashboardservice.editUser(this.userForm.value).subscribe((data:any)=>{
    this.showSuccess(data['Message'])
    this.ngOnInit();
})
this.editmode=false;
this.ngOnInit();
 this.userForm.reset();
 
//  window.location.reload();
this.getData();
// this.selectdata=[];
  }
  cancel(){
    this.editmode=false;
    this.ngOnInit();
    this.userForm.reset();
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
no(){
    this.editmode=false;
    this.addmode=true; 
}
view(){
    this.closeBtn.nativeElement.click();
    this.userForm.patchValue({
        _id:this.userData._id,
        active_status: this.userData.active_status,
    agent_code:this.userData.agent_code,
    branch_code: (this.userData.branch_code),
    email_id:this.userData.email_id,
    emp_no: this.userData.emp_no,
    last_login_date: this.userData.last_login_date,
    name: this.userData.name,
    password: this.userData.password,
    phone_number:this.userData.phone_number,
    
    })
    this.userData.branch_code.map((e:any)=>{
        console.log(e)
        this.branch_code.push(new FormControl(e));
    })
    console.log(this.userData.branch_code)
    // const branch_code: FormArray = this.userForm.get('branch_code') as FormArray;
    
    this.userData.branch_code.map((e:any)=>{
        this.selectdata.push({branch_code:e,check:true})
    })
    console.log(this.selectdata)
    const mergeById = (array1:any, array2:any) =>
    array1.map((itm: { branch_code: any; }) => ({
    ...array2.find((item:any) => (item.branch_code === itm.branch_code) && item),
    ...itm
    }));
    this.location = mergeById(this.location,this.selectdata);
    this.editmode=true;
this.addmode=false;
}
deluserdata(){
    this.editmode=false;
this.addmode=true;
    this.dashboardservice.deleteUser(this.del).subscribe(
        (response: any) => {
          console.log(response.Data);
          //alert('Deleted Successfully');
          this.showSuccess("Deleted Successfully")
          this.ngOnInit();
        }
      );
      this.closeBtn.nativeElement.click();
}
exportExcel() {
   
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table1.nativeElement);
    
    console.log(ws['H1'])
    delete (ws['H1'])
    console.log(ws)
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    console.log("ss")
    /* save to file */
 XLSX.writeFile(wb, 'userList.xlsx');
    // import("xlsx").then(xlsx => {
    //   const worksheet = xlsx.utils.json_to_sheet(this.userList);
    //   const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    //   const excelBuffer: any = xlsx.write(workbook, {
    //     bookType: "xlsx",
    //     type: "array"
    //   });
    //   this.saveAsExcelFile(excelBuffer, "userList");
    // });
  }

//   saveAsExcelFile(buffer: any, fileName: string): void {
//     import("file-saver").then(FileSaver => {
//       let EXCEL_TYPE =
//         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
//       let EXCEL_EXTENSION = ".xlsx";
//       const data: Blob = new Blob([buffer], {
//         type: EXCEL_TYPE
//       });
//       FileSaver.saveAs(
//         data,
//         fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
//       );
//     });
//   }
}
