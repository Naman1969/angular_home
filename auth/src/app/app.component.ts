import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { EmpAddEditComponent } from "./emp-add-edit/emp-add-edit.component";
import { EmployeeService } from "./services/employee.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "auth";

  displayedColumns: string[] = [
    "id",
    "firstName",
    "lastName",
    "email",
    "dob",
    "gender",
    "education",
    "company",
    "experience",
    "package",
    "action",
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.getEmployee();
  }

  openAddEditForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployee();
        }
      },
    });
  }

  getEmployee() {
    this._empService.getEmployee().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteEmployee(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        alert("employee deleted");
        this.getEmployee();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openEditForm(data: any) {
    console.log(data); // Check console to verify data structure
    this._dialog.open(EmpAddEditComponent, {
      data: {
        id: data.id,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        dob: data.dob || '',
        gender: data.gender || '',
        education: data.education || '',
        company: data.company || '',
        experience: data.experience || '',
        package: data.package || '',
      }
    });
  }
  
  
  data(data: any) {
    throw new Error("Method not implemented.");
  }
}
