import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCollectionResponse, ApiResponse } from '../models/apiResponse';
import { DiscountDTO } from '../models/discountDTO';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private http: HttpClient) { }

  linkString: string = 'https://localhost:44323/api/discount'
 
 getDiscounts(): Observable<ApiCollectionResponse>{
   return this.http.get<ApiCollectionResponse>(this.linkString + '/getall');
 }
 
 deleteCategory(id:number): Observable<ApiResponse>{
   return this.http.delete<ApiResponse>( this.linkString +'?id=' + id)
 }
 
 addDiscount(newDiscount:DiscountDTO):Observable<ApiResponse>{
   return this.http.post<ApiResponse>(this.linkString, newDiscount)
 }
 
 getDiscount(id:number):Observable<ApiCollectionResponse> {
   return this.http.get<ApiCollectionResponse>(this.linkString + '/' + id)
 
 }
 
 updateDiscount(discount: DiscountDTO):Observable<ApiCollectionResponse>{
   return this.http.patch<ApiCollectionResponse>(this.linkString + '/', discount)
 }
}
