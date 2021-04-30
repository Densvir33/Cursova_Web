import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiLoginResponse } from 'src/app/models/apiResponse';
import { LoginDTO } from 'src/app/models/loginDTO';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:LoginDTO={ email: '', password: ''}

  constructor(private accountService: AccountService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.user)
        this.accountService.login(this.user)
        .subscribe((res:ApiLoginResponse)=>{
          if(res.isSuccessful){
            console.log("TOKEN: ",res.token)
            this.setSession(res.token)
            //this.notifier.notify('success', 'Login success')
            this.router.navigate(['/'])
          }
          else{
            //this.notifier.notify('error', 'bad data')
          }
        })     
  }

  private setSession(token: string){
    localStorage.setItem('id_token', token)
  }   

  // onSubmit(){
  //   console.log(this.user)

  //   this.accountService.login(this.user).subscribe(
  //     data=>{
  //       console.log(data)

  //       if(data.isSuccessful){
  //         console.log(data)
  //         localStorage.setItem('token', data.token)

  //         const jwtData = data.token.split('.')[1]
  //         const decodedJwtJsonData = atob(jwtData)
  //         const decodedJwtData = JSON.parse(decodedJwtJsonData)

  //         this.accountService.loginStatus.emit(true);

  //         if(decodedJwtData.roles === 'User' || decodedJwtData.roles[0] ==='Guest'){
  //           this.router.navigate(['/'])
  //         }
  //         else if(decodedJwtData.roles === 'Admin'){
  //           this.router.navigate(['/admin-panel'])
  //         }
  //       }
  //     }
  //   )
  // }

}
