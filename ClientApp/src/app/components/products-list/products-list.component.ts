import { Component, OnInit } from '@angular/core';
import { ApiCollectionResponse } from 'src/app/models/apiResponse';
import { ProductDTO } from 'src/app/models/productDTO';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products:Array<ProductDTO>
  
  //tutorials: Tutorial[] = [];
  //currentTutorial?: Tutorial;
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 4;
  pageSizes = [4, 8, 16];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  } 

  loadProducts(){
    this.productService.getProducts()
    .subscribe((res:ApiCollectionResponse)=>{
     
      if(!res.isSuccessful){
        console.log(res.data)
        this.products = res.data;
      }
    })
  }


 


  /////////////////////////////////

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveTutorials(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    // this.productService.getProductsWithParams(params)
    // .subscribe(
    //   response => {
    //     const { tutorials, totalItems } = response;
    //     this.tutorials = tutorials;
    //     this.count = totalItems;
    //     console.log(response);
    //   },
    //   error => {
    //     console.log(error);
    //   });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveTutorials();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveTutorials();
  }

  refreshList(): void {
    this.retrieveTutorials();
    //this.currentTutorial = undefined;
    this.currentIndex = -1;
  }
 



  // searchTitle(): void {
  //   this.tutorialService.findByTitle(this.title)
  //     .subscribe(
  //       data => {
  //         this.tutorials = data;
  //         console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

}
