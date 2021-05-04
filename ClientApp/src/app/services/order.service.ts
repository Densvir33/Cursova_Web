import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCollectionResponse, ApiResponse } from '../models/apiResponse';
import { OrderDTO } from '../models/orderDTO';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  linkString: string = 'https://localhost:44323/order'
 
 getOrders(): Observable<ApiCollectionResponse>{
   return this.http.get<ApiCollectionResponse>(this.linkString + '/getall');
 }
 
 deleteOrder(id:number): Observable<ApiResponse>{
   return this.http.delete<ApiResponse>( this.linkString +'?id=' + id)
 }
 
 addOrder(newOrder:OrderDTO):Observable<ApiResponse>{
   return this.http.post<ApiResponse>(this.linkString, newOrder)
 }
 
 getOrder(id:number):Observable<ApiCollectionResponse> {
   return this.http.get<ApiCollectionResponse>(this.linkString + '/' + id) 
 }

 getOrderByUserId(id:number):Observable<ApiCollectionResponse> {
  return this.http.get<ApiCollectionResponse>(this.linkString + '/user/' + id) 
}


 
 updateOrder(order: OrderDTO):Observable<ApiCollectionResponse>{
   return this.http.patch<ApiCollectionResponse>(this.linkString + '/', order)
 }

}
