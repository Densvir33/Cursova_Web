import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCollectionResponse, ApiResponse } from 'src/app/models/apiResponse';
import { CategoryDTO } from 'src/app/models/categoryDTO';
import { ProductDTO } from 'src/app/models/productDTO';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  catagories: Array<CategoryDTO>;
  selectedCategory: string;

  newProduct: ProductDTO ={
    id: -1,
    name: '',
    price: 0,
    image: '',
    property: '',
    mass:0,
    category: ''}

  constructor(private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.loadCategory()
  }

  onAdd(){
    this.newProduct.category = this.selectedCategory;

    console.log(this.newProduct)
    this.productService.addProduct(this.newProduct)
    .subscribe((res:ApiResponse)=>{
      if(res.isSuccessful){
        console.log(res.message)
        this.router.navigate(['/'])
      }
    })
  }

  loadCategory(){    
    this.categoryService.getCategories()
    .subscribe((res:ApiCollectionResponse)=>{
      console.log(res.data)
      this.catagories = res.data
        // if(res.isSuccessful){
        //   console.log(res.data)
        //   this.catagories = res.data
        // }
    })
  }
}
