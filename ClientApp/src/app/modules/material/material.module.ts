import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponent } from './material.component';
import {MatDialogModule } from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
// import { MatRippleModule } from "@angular/material";

const modules = [
  MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  // MatRippleModule,
  CommonModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
  declarations: [MaterialComponent]
})
export class MaterialModule { }
