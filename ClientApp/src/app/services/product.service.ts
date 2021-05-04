import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCollectionResponse,ApiResponse, ApiSingleResponse } from '../models/apiResponse';
import { ProductDTO } from '../models/productDTO';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(private http: HttpClient) { }

  headers:HttpHeaders = new HttpHeaders();
  linkString: string = 'https://localhost:44323/api/product'

getProducts(): Observable<ApiCollectionResponse>{
  return this.http.get<ApiCollectionResponse>(this.linkString + '/getAll');
}

deleteProduct(id:number): Observable<ApiResponse>{
  return this.http.delete<ApiResponse>( this.linkString +'?id=' + id)
}

addProduct(newProduct:ProductDTO):Observable<ApiResponse>{
  return this.http.post<ApiResponse>(this.linkString, newProduct)
}

getProduct(id:number):Observable<ApiSingleResponse> {
  return this.http.get<ApiSingleResponse>(this.linkString + '/details/' + id)
}

getProductToCart(productsID:Array<number>):Observable<ApiCollectionResponse>{
  let params = new HttpParams();
  // params = params.append('product', productsID.join(', '));  
  params = params.append('myArray', JSON.stringify(productsID));  
  return this.http.get<ApiCollectionResponse>(this.linkString, { params: params })
}

updateProduct(product: ProductDTO):Observable<ApiCollectionResponse>{
  return this.http.patch<ApiCollectionResponse>(this.linkString + '/', product)
}

getProductsWithParams(params: any):Observable<ApiCollectionResponse>{
  this.headers.append('Content-Type', 'application/json; charset=utf8');
  return this.http.get<ApiCollectionResponse>(this.linkString + '/getWithParams', {headers:this.headers, params: params});
}

getProductsByCategory(categoryName:string):Observable<ApiCollectionResponse>{
  return this.http.get<ApiCollectionResponse>(this.linkString + '/category/' + categoryName);
}

}
