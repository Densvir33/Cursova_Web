import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLoginResponse, ApiResponse } from '../models/apiResponse';
import { LoginDTO } from '../models/loginDTO';
import { UserDTO } from '../models/userDTO';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

constructor(private http: HttpClient) { }

linkString: string = 'https://localhost:44323/api/account'

login(user:LoginDTO) {
  return this.http.post<ApiLoginResponse>(this.linkString + '/login', user)       
}

register(newUser: UserDTO){
  return this.http.post<ApiResponse>(this.linkString + '/register', newUser)
}

}
