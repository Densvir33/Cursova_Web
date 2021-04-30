import { Component, OnInit } from '@angular/core';
import { ApiSingleResponse } from 'src/app/models/apiResponse';
import { UserDTO } from 'src/app/models/userDTO';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  currentUser: UserDTO
  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.loadUserData()
  }

  loadUserData(){

    this.accountService.getUserDataByID()
    .subscribe((res:ApiSingleResponse)=>{     
      if(!res.isSuccessful){
        console.log(res.data)
        this.currentUser = res.data;
      }
    })
  }


}
