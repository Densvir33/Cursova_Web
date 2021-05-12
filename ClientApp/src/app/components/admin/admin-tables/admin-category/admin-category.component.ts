import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApiCollectionResponse, ApiResponse } from 'src/app/models/apiResponse';
import { CategoryDTO } from 'src/app/models/categoryDTO';
import { CategoryService } from 'src/app/services/category.service';
import { LoadService } from 'src/app/services/load.service';

import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {

  categories:Array<CategoryDTO>
  loading: boolean = false;
  newCategory:CategoryDTO = {id: -1, name: ''}
  editCategory:any

  
  constructor(private categoryService: CategoryService,
    private spinner:LoadService,
    private modalService: NgbModal,
    private notifier: NotifierService

    ) { }

  ngOnInit() {
    this.loading = true
    this.loadCategories()
  }

  loadCategories(){
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



  openModalWindow(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  onSubmit(f: NgForm) {
    this.newCategory.name = f.value.name
    
    console.log(this.newCategory)
    this.categoryService.addCategory(this.newCategory)
    .subscribe((res:ApiResponse)=>{     
      if(res.isSuccessful){
          console.log(res)
          this.notifier.notify('success', 'New category is add')
          this.loadCategories()
      }
    },error=>{
      this.notifier.notify('warning', 'Opps... Somesing wrong. Try again') })
  } 

  onDelete(id:number){
    this.categoryService.deleteCategory(id)
    .subscribe((res:ApiResponse)=>{     
      if(res.isSuccessful){
          console.log(res)
          this.notifier.notify('success', 'Category was delete')
          this.loadCategories()
      }
    },error=>{
      this.notifier.notify('warning', 'Opps... Somesing wrong. Try again') })
    }

  onEdit(content:any, id:number){
    
    this.categoryService.getCategory(id)
    .subscribe((res:ApiCollectionResponse)=>{     
      if(!res.isSuccessful){
          console.log(res)
          this.editCategory = res.data
      }
    },error=>{})
    setTimeout(()=>{this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})}, 1000)
  }

  onSaveEdit(f: NgForm, modal:any) {
    modal.close()
    this.editCategory.name = f.value.name    
    console.log(this.newCategory)
    this.categoryService.updateCategory(this.editCategory)
        .subscribe((res:ApiResponse)=>{     
          if(!res.isSuccessful){
              console.log(res)
              this.loadCategories()
              this.notifier.notify('success', 'Category is update')
          }
        },error=>{
          this.notifier.notify('warning', 'Opps... Somesing wrong. Try again') })
    } 

  onClose(modal:any){
    modal.close()

  }



}
