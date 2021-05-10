import { Component, OnInit } from '@angular/core';
import { ApiCollectionResponse } from 'src/app/models/apiResponse';
import { ProductDTO } from 'src/app/models/productDTO';
import { CartService } from 'src/app/services/cart.service';
import { LoadService } from 'src/app/services/load.service';
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

  page:number = 1;
  count = 0;
  pageSize:number = 4;
  pageSizes = [4, 8, 16];

  loading: boolean = false;


  constructor(private productService: ProductService,
    private cartService: CartService,
    private spinner:LoadService,) { }

  ngOnInit() {
    this.loading = true;    
    this.spinner.Spinner(this.loading)
    this.loadProducts();    
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
      error => {console.log(error);});
      this.loading = false
      this.spinner.Spinner(this.loading)
  }

  handlePageChange(event: number) {
    this.loading = true;    
    this.spinner.Spinner(this.loading)
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

  addToCart(Id:number){
    this.cartService.addToCart(Id)    
  }

}
