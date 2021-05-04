import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCollectionResponse, ApiSingleResponse } from 'src/app/models/apiResponse';
import { ProductDTO } from 'src/app/models/productDTO';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-in-category-list',
  templateUrl: './products-in-category-list.component.html',
  styleUrls: ['./products-in-category-list.component.css']
})
export class ProductsInCategoryListComponent implements OnInit {

  products:Array<ProductDTO>
  category:string;
  id: string 
  //tutorials: Tutorial[] = [];
  //currentTutorial?: Tutorial;
  currentIndex = -1;
  title = '';

  page:number = 1;
  count = 0;
  pageSize:number = 4;
  pageSizes = [1, 4, 8, 16];

  constructor(private productService: ProductService,
    private categoryService:CategoryService,
    private route:ActivatedRoute,) { }

  ngOnInit() {
    this.loadProducts();   
    this.getCategory() 
  }

  getCategory(){
    this.id = this.route.snapshot.paramMap.get('id')!
    console.log(this.id)
    if(this.id != null){
      this.categoryService.getCategory(parseInt(this.id))
      .subscribe((res:ApiSingleResponse)=>{
        if(!res.isSuccessful){
          console.log(res.data)
          this.category = res.data;
        }
      })
    }
  }

  getRequestParams(page: number, pageSize: number){
    let params: any = {};    

    if (page) {
      params[`page`] = page ;
    }
    if (pageSize) {
      params[`count`] = pageSize;
    }
    return params;
  }

  loadProducts(){
    const params = this.getRequestParams(this.page, this.pageSize);

    console.log(params)
    this.productService.getProductsWithParams(params)
    .subscribe(
      (res:ApiCollectionResponse) => {
        this.count = parseInt(res.message)
        this.products = res.data;
        console.log(res);
      },
      error => {
        console.log(error);
      });
  }

  handlePageChange(event: number) {
    this.page = event;
    this.loadProducts();
  }

  handlePageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.loadProducts();
  }

  refreshList() {
    this.loadProducts();
    //this.currentTutorial = undefined;
    this.currentIndex = -1;
  }

}
