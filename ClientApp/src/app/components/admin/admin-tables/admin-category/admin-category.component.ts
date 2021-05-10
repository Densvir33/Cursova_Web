import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApiCollectionResponse } from 'src/app/models/apiResponse';
import { CategoryDTO } from 'src/app/models/categoryDTO';
import { CategoryService } from 'src/app/services/category.service';
import { LoadService } from 'src/app/services/load.service';
import { CourseDialogComponent } from '../../CourseDialog/CourseDialog.component';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {

  categories:Array<CategoryDTO>
  loading: boolean = false;

  constructor(private categoryService: CategoryService,private spinner:LoadService,
    
    private dialog: MatDialog) { }

  ngOnInit() {
    this.loadProducts()
  }

  loadProducts(){
    this.categoryService.getCategories()
    .subscribe(
      (res:ApiCollectionResponse) => {       
        
        this.categories = res.data;
        console.log(res);
      },
      error => {console.log(error);});
      this.loading = false
      this.spinner.Spinner(this.loading)
  }

  

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        id: 1,
        title: 'Angular For Beginners'
    };

    this.dialog.open(CourseDialogComponent, dialogConfig);
    
    //const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe(
    //     data => console.log("Dialog output:", data)
    // );    
}

}
