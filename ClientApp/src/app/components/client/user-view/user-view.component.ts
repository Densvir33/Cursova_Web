import { Component, OnInit } from '@angular/core';
import { ApiCollectionResponse, ApiResponse, ApiSingleResponse } from 'src/app/models/apiResponse';
import { UserDTO } from 'src/app/models/userDTO';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  currentUser: UserDTO = {
    id: -1,
    email:'hello@gmail.com',
    password:'',
    token: '',
    fullname:'Bob bab',
    phonenumber:'2321912319',
    age: 1,
    address:'',
    photo:''
  }

  newUserData= {
    email: '',
    fullname: '',
    phonenumber: '',
    address: ''
  }
  isEdit:boolean = false

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

  onEdit(){
    console.log(11)

    this.newUserData.email = this.currentUser.email
    this.newUserData.fullname = this.currentUser.fullname
    this.newUserData.phonenumber = this.currentUser.phonenumber
    //this.newUserData.address = this.currentUser.address

    this.isEdit = true
  }
  onSave(){
    this.isEdit = false

    this.currentUser.fullname = this.newUserData.fullname
    this.currentUser.email = this.newUserData.email
    this.currentUser.phonenumber = this.newUserData.phonenumber
    //this.currentUser.address = this.newUserData.address

    this.accountService.updateUserData(this.currentUser)
    .subscribe((res:ApiCollectionResponse)=>{
      if(!res.isSuccessful){
        console.log(res.data)
        //this.newUserData = res.data
      }
    })
  }
  onCancel(){
    this.isEdit = false
  }



}
