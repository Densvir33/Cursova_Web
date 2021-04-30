import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  isLoggedIn:boolean
  constructor(private accountService: AccountService) { 

    const token = localStorage.getItem('id_token')
      if(token!==null){
        this.isLoggedIn = true
      }
      else{ this.isLoggedIn = false}

      this.accountService.loginStatus.subscribe((status)=>{
        this.isLoggedIn = status
      })
  }

  ngOnInit() {
  }

  logout(){
    this.accountService.Logout();
  }

}
