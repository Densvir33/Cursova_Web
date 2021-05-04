import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCollectionResponse, ApiResponse } from '../models/apiResponse';
import { ProductInCart } from '../models/productInCart';
import { AccountService } from './account.service';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  newCart: Array<number> = []
  constructor(private http: HttpClient,
    private accountService:AccountService,
    private orderService:OrderService) { }

  linkString: string = 'https://localhost:44323/order'

  // addProductToCart(id:number):Observable<ApiResponse> {
  //   return this.http.post<ApiResponse>(this.linkString + id)       
  // }

  // updateProductInCart(product:ProductInCart) {
  //   return this.http.post<ApiCollectionResponse>(this.linkString + '/update', product)       
  // }

  // getProductFromCart(userID:number): Observable<ApiCollectionResponse>{
  //   return this.http.get<ApiCollectionResponse>(this.linkString + '/' + userID);
  // }

  // deleteProductFromCart(id:number): Observable<ApiResponse>{
  //   return this.http.delete<ApiResponse>( this.linkString +'?id=' + id)
  // }

  headers:HttpHeaders = new HttpHeaders();


  addToCart(id:number){
    const token = localStorage.getItem('id_token')
    if(token){
      let userId = this.accountService.getUserID();
      let orderId = this.orderService.getOrderByUserId(userId)

      let params: any = {};   

      params[`orderId`] = orderId ;    
      params[`productId`] = id;
      
      console.log(params)

      this.accountService.addProductToOrder(params)
      .subscribe((res:ApiResponse)=>{     
        if(!res.isSuccessful){
            console.log(res)
        }
      })
      return true 
    }
    else{ 

      if(localStorage.getItem('currentCart')!=null){
        let tmp = localStorage.getItem('currentCart')
        this.newCart = JSON.parse(tmp!)
        this.newCart.push(id)
      } 
      else{
        this.newCart.push(id)
      }   
      localStorage.setItem('currentCart', JSON.stringify(this.newCart))
  
      return true    
    }
  }
  

}
