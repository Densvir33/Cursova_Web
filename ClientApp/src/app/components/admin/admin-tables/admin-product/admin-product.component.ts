import { Component, OnInit } from '@angular/core';
import { ApiCollectionResponse } from 'src/app/models/apiResponse';
import { ProductDTO } from 'src/app/models/productDTO';
import { LoadService } from 'src/app/services/load.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

  products:Array<ProductDTO>
  loading: boolean = false;

  constructor(private productService: ProductService,private spinner:LoadService) { }

  ngOnInit() {
    this.loadProducts()
  }

  loadProducts(){
    this.productService.getProducts()
    .subscribe(
      (res:ApiCollectionResponse) => {       
        
        this.products = res.data;
        console.log(res);
      },
      error => {console.log(error);});
      this.loading = false
      this.spinner.Spinner(this.loading)
  }


}
