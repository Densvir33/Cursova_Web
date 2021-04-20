import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [

  {path: '', component: ProductsListComponent},

  {path: 'account',  children:[
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent}
    //{path:'user', component:UserViewComponent, canActivate: [AuthGuard]}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
