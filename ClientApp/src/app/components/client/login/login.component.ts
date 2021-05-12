import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ApiLoginResponse } from 'src/app/models/apiResponse';
import { LoginDTO } from 'src/app/models/loginDTO';
import { AccountService } from 'src/app/services/account.service';
import { LoadService } from 'src/app/services/load.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:LoginDTO={ email: '', password: ''}
  loading: boolean = false;

  constructor(private accountService: AccountService,
              private router: Router,
              private spinner:LoadService,
              private notifier: NotifierService ) { }

  ngOnInit() {}

  onSubmit(){
    console.log(this.user)
    this.loading = true;    
    this.spinner.Spinner(this.loading)

    this.accountService.login(this.user)
    .subscribe(
      (res:ApiLoginResponse)=>{
        if(res.isSuccessful){
          console.log(res)
          localStorage.setItem('id_token', res.token)

          const jwtData = res.token.split('.')[1]
          const decodedJwtJsonData = atob(jwtData)
          const decodedJwtData = JSON.parse(decodedJwtJsonData)

          this.accountService.loginStatus.emit(true);

          if(decodedJwtData.roles === 'User' || decodedJwtData.roles[0] ==='Guest'){
            this.router.navigate(['/'])
          }
          else if(decodedJwtData.roles === 'Admin'){
            this.router.navigate(['/admin'])
          }
          this.notifier.notify('success', 'Login is success')
        }
        else
          setTimeout(()=>{this.notifier.notify('warning', 'Opps... Somesing wrong. Try again')}, 1500)

        this.loading = false;    
        this.spinner.Spinner(this.loading)
      }
    )
  }

}
