import { getLocaleTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaxLengthValidator } from '@angular/forms';

import { ApiCollectionResponse, ApiSingleResponse } from 'src/app/models/apiResponse';
import { ProductDTO } from 'src/app/models/productDTO';
import { ProductInCart } from 'src/app/models/productInCart';
import { AccountService } from 'src/app/services/account.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductViewComponent } from '../product-view/product-view.component';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  productsInCart:Array<number> =[]

  products: Array<ProductInCart> =[
    {id: 1,
    name: 'Darling Oranges',
    price: 455.00,
    image: 'sqqq',
    property: 'string',
    mass:153,
    category: 'ss',
    quantity:1},
  ]  

  constructor(private orderService:OrderService,
    private productService:ProductService,
    private accountService:AccountService) { }

  ngOnInit() {
    this.LoadOrderProducts()
  }

  onDelete(id:number){
    this.products = this.products.filter(item => item.id !== id);
    console.log(this.products);
  }

  increment(id:number){
    this.products[id-1].quantity++;
  }

  decrement(id:number){
    this.products[id-1].quantity--;
  }

  LoadOrderProducts(){
    if(localStorage.getItem('id_token')){
      let userId = this.accountService.getUserID()

      this.orderService.getOrderByUserId(userId)
      .subscribe((res:ApiCollectionResponse)=>{     
        if(!res.isSuccessful){
            this.products = res.data
        }
      })
    }
    else{
      let tmp = localStorage.getItem('currentCart')
      this.productsInCart = JSON.parse(tmp!)
      console.log(this.productsInCart)
        
      this.productService.getProductToCart(this.productsInCart)
      .subscribe((res:ApiCollectionResponse)=>{     
        if(!res.isSuccessful){
            this.products = res.data
        }
      }) 
    }
  }

 

  
  
}
