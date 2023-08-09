import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
// import {MatInputModule} from '@angular/material/input';
// import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'crud';
  clicked = false;
  displayedColumns: string[] = ['id', 'firstName', 'lastName','email', 'dob','gender','education','experience','company','package','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog:MatDialog,private empservice:EmployeeService){}
  ngOnInit(): void {
      this.getEmployeelist();
  }
  openAddEditEmployee(){
    const dialogRef=this.dialog.open(EmpAddEditComponent );
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        this.getEmployeelist();
      }
    })
  }
  getEmployeelist(){
    this.empservice.getEmployeeList().subscribe({
      next:(res)=>{
        console.log(res);
        this.dataSource= new MatTableDataSource(res);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
      },
      error:console.log
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }
  deleteEmployee(id:number){
this.empservice.deleteEmployeeList(id).subscribe({
  next:(res)=>{
    alert('Employee deleted!');
    this.getEmployeelist();
  },
  error:console.log,
});
  }
  openEditForm(data:any){
    this.dialog.open(EmpAddEditComponent ,{
      data,
    })
    
  }
}
