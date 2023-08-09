import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
//import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})

export class EmpAddEditComponent implements OnInit {
  empForm:FormGroup;
  education:string[]=[
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate'
  ];
constructor(private fb:FormBuilder,private empservice:EmployeeService,private dialogref:MatDialogRef<EmpAddEditComponent >,@Inject(MAT_DIALOG_DATA) public data:any){

  this.empForm=this.fb.group({
 firstName:'',
 lastName:'',
 email:'',
 dob:'',
 gender:'',
 education:'',
 company:'',
 experience:'',
 package:'',
})

}
ngOnInit(): void {
    this.empForm.patchValue(this.data);
}
onFormSubmit(){
  if(this.empForm.valid){
    if(this.data){
      this.empservice.updateEmployee(this.data.id,this.empForm.value).subscribe({
        next:(val:any)=>{
          alert('Updateded added sucessfully');
          this.dialogref.close(true);
        },
        error:(errr:any)=>{
          console.error(errr);
        },
      });
    } else{
    this.empservice.addEmployee(this.empForm.value).subscribe({
      next:(val:any)=>{
        alert('Employee added sucessfully');
        this.dialogref.close(true);
      },
      error:(errr:any)=>{
        console.error(errr);
      },
    });
  }
}
}
}
