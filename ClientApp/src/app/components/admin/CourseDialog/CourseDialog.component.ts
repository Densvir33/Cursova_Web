import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-CourseDialog',
  templateUrl: './CourseDialog.component.html',
  styleUrls: ['./CourseDialog.component.css']
})
export class CourseDialogComponent implements OnInit {

  form: FormGroup;
  description:string;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<CourseDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data:any) {

      this.description = data.description;
  }

  ngOnInit() {
      this.form = this.fb.group({
          description: [this.description, []],
          
      });
  }

  save() {
      this.dialogRef.close(this.form.value);
  }

  close() {
      this.dialogRef.close();
  }

}
