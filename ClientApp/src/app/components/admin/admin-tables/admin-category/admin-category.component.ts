import { Component, OnInit } from '@angular/core';
import { ApiCollectionResponse } from 'src/app/models/apiResponse';
import { CategoryDTO } from 'src/app/models/categoryDTO';
import { CategoryService } from 'src/app/services/category.service';
import { LoadService } from 'src/app/services/load.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {

  categories:Array<CategoryDTO>
  loading: boolean = false;

  constructor(private categoryService: CategoryService,private spinner:LoadService) { }

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


}
