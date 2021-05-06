import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiCollectionResponse } from 'src/app/models/apiResponse';
import { ProductDTO } from 'src/app/models/productDTO';
import { ProductInCart } from 'src/app/models/productInCart';
import { CartService } from 'src/app/services/cart.service';
import { LoadService } from 'src/app/services/load.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products:Array<ProductDTO>
  newCart: Array<number> = []
  loading: boolean = false;


  constructor(private productService: ProductService,
    private cartService: CartService,
    private spinner:LoadService) { }

  ngOnInit() {
    this.loading = true;    
    this.spinner.Spinner(this.loading)
    this.loadProducts(); 
  }

  loadProducts(){
    this.productService.getProducts()
    .subscribe((res:ApiCollectionResponse)=>{
      this.loading = false
     
      if(!res.isSuccessful){
        console.log(res.data)
        this.products = res.data;
      }
      this.spinner.Spinner(this.loading)
    })
  }

  addToCart(Id:number){
    this.cartService.addToCart(Id)    
  }

}
