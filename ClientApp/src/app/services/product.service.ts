import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCollectionResponse, ApiResponse } from '../models/apiResponse';
import { ProductDTO } from '../models/productDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(private http: HttpClient) { }

 linkString: string = 'https://localhost:44323/api/product'

getProducts(): Observable<ApiCollectionResponse>{
  return this.http.get<ApiCollectionResponse>(this.linkString + '/getall');
}

deleteProduct(id:number): Observable<ApiResponse>{
  return this.http.delete<ApiResponse>( this.linkString +'?id=' + id)
}

addProduct(newProduct:ProductDTO):Observable<ApiResponse>{
  return this.http.post<ApiResponse>(this.linkString, newProduct)
}

getProduct(id:number):Observable<ApiCollectionResponse> {
  return this.http.get<ApiCollectionResponse>(this.linkString + '/' + id)

}

updateProduct(product: ProductDTO):Observable<ApiCollectionResponse>{
  return this.http.patch<ApiCollectionResponse>(this.linkString + '/', product)
}

}
