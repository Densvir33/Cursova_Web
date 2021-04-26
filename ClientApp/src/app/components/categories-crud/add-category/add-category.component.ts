import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/models/apiResponse';
import { CategoryDTO } from 'src/app/models/categoryDTO';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  newCategory: CategoryDTO={name: '', id:-1}
  constructor(private categoryService: CategoryService,private router: Router) { }

  ngOnInit() {
  }

  onAdd(){
    console.log(this.newCategory)
    this.categoryService.addCategory(this.newCategory)
    .subscribe((res:ApiResponse)=>{
      if(res.isSuccessful){
        console.log(res.message)
        this.router.navigate(['/'])
      }
    })
  }
}
