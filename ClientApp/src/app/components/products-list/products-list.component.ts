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

}
