import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCollectionResponse, ApiResponse } from '../models/apiResponse';
import { ProductInCart } from '../models/productInCart';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  newCart: Array<number> = []
  constructor(private http: HttpClient,
    private accountService:AccountService) { }

  linkString: string = 'https://localhost:44323/cart'

  // addProductToCart(id:number):Observable<ApiResponse> {
  //   return this.http.post<ApiResponse>(this.linkString + id)       
  // }

  updateProductInCart(product:ProductInCart) {
    return this.http.post<ApiCollectionResponse>(this.linkString + '/update', product)       
  }

  getProductFromCart(userID:number): Observable<ApiCollectionResponse>{
    return this.http.get<ApiCollectionResponse>(this.linkString + '/' + userID);
  }

  deleteProductFromCart(id:number): Observable<ApiResponse>{
    return this.http.delete<ApiResponse>( this.linkString +'?id=' + id)
  }

  addToCart(id:number){
    const token = localStorage.getItem('id_token')
    if(token){
      let userId = this.accountService.getUserID();
      let UserCart = {userId: userId, cartId: id}
      return this.http.post<ApiResponse>(this.linkString, UserCart)
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
  
      return ApiResponse    
    }
  }

}
