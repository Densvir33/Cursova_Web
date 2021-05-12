import { getLocaleTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaxLengthValidator } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

import { ApiCollectionResponse, ApiSingleResponse } from 'src/app/models/apiResponse';
import { ProductDTO } from 'src/app/models/productDTO';
import { ProductInCart } from 'src/app/models/productInCart';
import { totalCart } from 'src/app/models/totalCart';
import { AccountService } from 'src/app/services/account.service';
import { LoadService } from 'src/app/services/load.service';
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
    price: 10.00,
    image: 'sqqq',
    property: 'string',
    mass:153,
    category: 'ss',
    quantity:1},
    {id: 2,
      name: 'Darling Oranges',
      price: 10.00,
      image: 'sqqq',
      property: 'string',
      mass:153,
      category: 'ss',
      quantity:1},
  ]  
  
  totalCart:totalCart={
    subtotal: 0,
    shipping: 30,
    total: 0,
  };

  loading: boolean = false;

  isEmpty:boolean = true;

  constructor(private orderService:OrderService,
    private productService:ProductService,
    private accountService:AccountService,
    private notifier: NotifierService,
    private spinner:LoadService) { }

  ngOnInit() {
    this.loading = true;    
    this.spinner.Spinner(this.loading)

    this.LoadOrderProducts()
    this.EmptyCart()

    this.calcCheck()

  }

  onDelete(id:number){
    this.products = this.products.filter(item => item.id !== id);
    console.log(this.products);
    this.notifier.notify('info', 'Product was delete from your cart')
    this.EmptyCart()
    this.calcCheck()
  }

  increment(id:number){
    this.products[id-1].quantity++;
    this.calcCheck()
  }

  decrement(id:number){
    if(this.products[id-1].quantity===1 || this.products[id-1].quantity===0){
      this.notifier.notify('info', 'Product quantity don`t to be 0')
      this.products[id-1].quantity = 1
    }
    else{
      this.products[id-1].quantity--;
    }
    console.log(this.products[id-1].quantity)
    this.calcCheck()
  }

  LoadOrderProducts(){
    if(localStorage.getItem('id_token')){
      let userId = this.accountService.getUserID()

      this.orderService.getOrderByUserId(userId)
      .subscribe((res:ApiCollectionResponse)=>{  

        this.loading = false  

        if(!res.isSuccessful){
            this.products = res.data            
        }

        this.spinner.Spinner(this.loading)
      }, error=>{       
        this.loading = false 
        this.spinner.Spinner(this.loading) 
      })
    }
    else{
      let tmp = localStorage.getItem('currentCart')
      this.productsInCart = JSON.parse(tmp!)
      console.log(this.productsInCart)
        
      this.productService.getProductToCart(this.productsInCart)
      .subscribe((res:ApiCollectionResponse)=>{ 

        this.loading = false 
        if(!res.isSuccessful){
            this.products = res.data
        }
        this.spinner.Spinner(this.loading)
      }, error=>{       
        this.loading = false 
        this.spinner.Spinner(this.loading) 
      }) 
    }
  }

  EmptyCart(){
    if(this.products.length == 0){
      this.isEmpty = true
    }
    else this.isEmpty = false
  }

  calcCheck(){
    let tmpCheck = 0
    for (let index = 0; index < this.products.length; index++) {      
      let tmp = 0
      tmp = this.products[index].price * this.products[index].quantity
      tmpCheck += tmp
    }
    this.totalCart.subtotal = tmpCheck
    this.totalCart.total = this.totalCart.subtotal + this.totalCart.shipping
  }
  
  
}
