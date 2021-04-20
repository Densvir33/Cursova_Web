import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/models/apiResponse';
import { UserDTO } from 'src/app/models/userDTO';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: UserDTO={
    id:-1,
    email: '',
    password: '',
    phonenumber: '',
    age: 0,
    token: '',
    fullname: ''
  }
  
  constructor(private router: Router,
              private accountService: AccountService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.newUser)

    // this.accountService.register(this.newUser)
    // .subscribe((res:ApiResponse)=>{
    //   if(res.isSuccessful){
    //     console.log(res.message)
    //     this.router.navigate(['account/login'])
    //   }
    //   else{
        
    //   }
    // })
}

}
