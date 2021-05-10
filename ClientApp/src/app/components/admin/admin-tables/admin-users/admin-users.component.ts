import { Component, OnInit } from '@angular/core';
import { ApiCollectionResponse } from 'src/app/models/apiResponse';
import { UserDTO } from 'src/app/models/userDTO';
import { AccountService } from 'src/app/services/account.service';
import { LoadService } from 'src/app/services/load.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  users:Array<UserDTO>
  loading: boolean = false;

  constructor(private accountService: AccountService,private spinner:LoadService) { }

  ngOnInit() {
    this.loadProducts()
  }

  loadProducts(){
    this.accountService.getUsers()
    .subscribe(
      (res:ApiCollectionResponse) => {       
        
        this.users = res.data;
        console.log(res);
      },
      error => {console.log(error);});
      this.loading = false
      this.spinner.Spinner(this.loading)
  }

}
