import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { EmployeeService } from "../services/employee.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-emp-add-edit",
  templateUrl: "./emp-add-edit.component.html",
  styleUrls: ["./emp-add-edit.component.css"],
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Inject data passed to the dialog
  ) {
    this.empForm = this.fb.group({
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      gender: "",
      education: "",
      company: "",
      experience: "",
      package: "",
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.empForm.patchValue({
        firstName: this.data.firstName || '',
        lastName: this.data.lastName || '',
        email: this.data.email || '',
        dob: this.data.dob || '',
        gender: this.data.gender || '',
        education: this.data.education || '',
        company: this.data.company || '',
        experience: this.data.experience || '',
        package: this.data.package || '',
      });
    }
  }

  onFormSubmit(): void {
    if (this.empForm.valid) {
      const formData = this.empForm.value;
      if (this.data) {
        // Update existing employee
        this.empService.updateEmployee(this.data.id, formData).subscribe({
          next: (res) => {
            console.log("Employee updated successfully:", res);
            this.dialogRef.close(true); // Close dialog on success
          },
          error: (err) => {
            console.error("Error updating employee:", err);
          },
        });
      } else {
        // Add new employee
        this.empService.addEmployee(formData).subscribe({
          next: (res) => {
            console.log("Employee added successfully:", res);
            this.dialogRef.close(true); // Close dialog on success
          },
          error: (err) => {
            console.error("Error adding employee:", err);
          },
        });
      }
    }
  }
}
