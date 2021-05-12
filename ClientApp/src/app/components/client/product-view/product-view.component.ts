import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCollectionResponse, ApiSingleResponse } from 'src/app/models/apiResponse';
import { ProductDTO } from 'src/app/models/productDTO';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import {Location} from '@angular/common';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  //mast be 8
  featuredProducts: Array<ProductDTO>

  newCart: Array<number> = []
  id: string 

  currentProduct: ProductDTO

  constructor(private productService: ProductService, private cartService:CartService,
    private router: Router,
    private route:ActivatedRoute,
    private accountService:AccountService) {  }

  ngOnInit() {
    this.loadProductDetails()
    this.loadFeaturedProducts()   
    window.scroll({ 
      top: 200, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  loadProductDetails(){
    this.id = this.route.snapshot.paramMap.get('id')!
    console.log(this.id)

    if(this.id != null){
      this.productService.getProductById(parseInt(this.id))
      .subscribe((res:ApiSingleResponse)=>{
        if(!res.isSuccessful){
          console.log(res.data)
          this.currentProduct = res.data;
        }
      })
      setTimeout(()=>{}, 1000)
    }
   
  }

  loadFeaturedProducts(){
    this.productService.getProducts()
    .subscribe((res:ApiCollectionResponse)=>{     
      if(!res.isSuccessful){
        console.log(res.data)
        this.featuredProducts = res.data;
      }
    })
  }

  addToCart(Id:number){    
      this.cartService.addToCart(Id)
  }

  byItNow(ud:number){
      this.router.navigateByUrl('/');
  }

  reload(Id:number){
    window.scroll({ 
      top: 200, 
      left: 0, 
      behavior: 'smooth' 
    });

    this.productService.getProductById(Id)
      .subscribe((res:ApiSingleResponse)=>{
        if(!res.isSuccessful){
          console.log(res.data)
          this.currentProduct = res.data;
        }
      })
  }

}
