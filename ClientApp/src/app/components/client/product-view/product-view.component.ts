import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCollectionResponse, ApiSingleResponse } from 'src/app/models/apiResponse';
import { ProductDTO } from 'src/app/models/productDTO';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import {Location} from '@angular/common';
import { AccountService } from 'src/app/services/account.service';
import { LoadService } from 'src/app/services/load.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  //mast be 8
  featuredProducts: Array<ProductDTO>
  loading: boolean = false;

  newCart: Array<number> = []
  id: string 

  currentProduct: ProductDTO

  constructor(private productService: ProductService, private cartService:CartService,
    private router: Router,
    private route:ActivatedRoute,
    private accountService:AccountService,
    private spinner:LoadService) {  }

  ngOnInit() {
    this.loading = true;    
    this.spinner.Spinner(this.loading)
    
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
    let params: any = {}; 
    params[`page`] = 1 ;
    params[`count`] = 8;

    this.productService.getProductsWithParams(params)
    .subscribe((res:ApiCollectionResponse) => {       
        this.featuredProducts = res.data;
        console.log(res);
      },error => {console.log(error);});
      this.loading = false
      this.spinner.Spinner(this.loading) 
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
