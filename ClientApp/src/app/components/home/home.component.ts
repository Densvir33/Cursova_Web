import { Component, OnInit } from '@angular/core';
import { ApiCollectionResponse } from 'src/app/models/apiResponse';
import { ProductDTO } from 'src/app/models/productDTO';
import { ProductInCart } from 'src/app/models/productInCart';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products:Array<ProductDTO>
  newCart: Array<number> = []

  constructor(private productService: ProductService,
    private cartService: CartService) { }

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

  addToCart(Id:number){
    this.cartService.addToCart(Id)    
  }

}
