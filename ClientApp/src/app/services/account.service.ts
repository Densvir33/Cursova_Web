import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { ApiCollectionResponse, ApiLoginResponse, ApiResponse, ApiSingleResponse } from '../models/apiResponse';
import { LoginDTO } from '../models/loginDTO';
import { UserDTO } from '../models/userDTO';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  loginStatus = new EventEmitter<boolean>()

  linkString: string = 'https://localhost:44323/api/account'

  login(user:LoginDTO) {
    return this.http.post<ApiLoginResponse>(this.linkString + '/login', user)       
  }

  register(newUser: UserDTO){
    return this.http.post<ApiResponse>(this.linkString + '/register', newUser)
  }

  Logout(){
    this.loginStatus.emit(false);
    localStorage.removeItem('id_token')
  }

  isAdmin(){

  }

  IsLoggedIn(){
    const token = localStorage.getItem('id_token')
    if(token!=null){
      const jwtData = token.split('.')[1];
      const decodedJwtJsonData = window.atob(jwtData);
      const decodedJwtData = JSON.parse(decodedJwtJsonData);
      if(decodedJwtData.roles!=null){
          return true
      }else{return false}
    }
    else{return false}

  }

  getUserDataByID(){

    let id = this.getUserID()
    return this.http.get<ApiSingleResponse>(this.linkString + '/user/' + id)
  }

  getUserID(){
    let jwt = localStorage.getItem('id_token')

    if(jwt!=null){
      let jwtData = jwt.split('.')[1]
      let decodedJwtJsonData = window.atob(jwtData)
      let decodedJwtData = JSON.parse(decodedJwtJsonData)
      let id = decodedJwtData.id
      console.log('jwtData: ' + jwtData)
      console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
      console.log('ID: ' + id)
      return id
    }      
}




}
