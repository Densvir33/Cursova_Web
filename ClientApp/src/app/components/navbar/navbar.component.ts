import { Component, OnInit } from '@angular/core';
import { ApiCollectionResponse } from 'src/app/models/apiResponse';
import { CategoryDTO } from 'src/app/models/categoryDTO';
import { AccountService } from 'src/app/services/account.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  categories:Array<CategoryDTO>
  isLoggedIn:boolean
  constructor(private accountService: AccountService, private categoryService:CategoryService) { 

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
    this.loadCategory();

  }

  logout(){
    this.accountService.Logout();
  }

  loadCategory(){    
    this.categoryService.getCategories()
    .subscribe((res:ApiCollectionResponse)=>{
      console.log(res.data)
      this.categories = res.data
        if(res.isSuccessful){
          console.log(res.data)
          this.categories = res.data
        }
    })
  }

}
