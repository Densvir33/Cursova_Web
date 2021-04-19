import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCollectionResponse, ApiResponse } from '../models/apiResponse';
import { CategoryDTO } from '../models/categoryDTO';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  linkString: string = 'https://localhost:44323/api/category'
 
 getCategories(): Observable<ApiCollectionResponse>{
   return this.http.get<ApiCollectionResponse>(this.linkString + '/getall');
 }
 
 deleteCategory(id:number): Observable<ApiResponse>{
   return this.http.delete<ApiResponse>( this.linkString +'?id=' + id)
 }
 
 addCategory(newCategory:CategoryDTO):Observable<ApiResponse>{
   return this.http.post<ApiResponse>(this.linkString, newCategory)
 }
 
 getCategory(id:number):Observable<ApiCollectionResponse> {
   return this.http.get<ApiCollectionResponse>(this.linkString + '/' + id)
 
 }
 
 updateCategory(category: CategoryDTO):Observable<ApiCollectionResponse>{
   return this.http.patch<ApiCollectionResponse>(this.linkString + '/', category)
 }
}
