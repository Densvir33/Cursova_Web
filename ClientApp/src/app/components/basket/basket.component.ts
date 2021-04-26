import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/app/models/productDTO';
import { ProductInCart } from 'src/app/models/productInCart';
import { OrderService } from 'src/app/services/order.service';
import { ProductViewComponent } from '../product-view/product-view.component';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  products: Array<ProductInCart> =[
    {id: 1,
    name: 'Darling Oranges',
    price: 455.00,
    image: 'sqqq',
    property: 'string',
    mass:153,
    category: 'ss',
    quantity:1},
  
    {id: 2,
      name: 'Darling Oranges',
      price: 455.00,
      image: 'sqqq',
      property: 'string',
      mass:153,
      category: 'ss',
      quantity:2},
    {id: 3,
        name: 'Darling Oranges',
        price: 455.00,
        image: 'sqqq',
        property: 'string',
        mass:153,
        category: 'ss',
        quantity:3}
  
  ]

  
  
  constructor(private orderService:OrderService) { }

  ngOnInit() {

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

  
}
