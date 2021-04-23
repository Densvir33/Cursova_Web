import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './components/basket/basket.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { RegisterComponent } from './components/register/register.component';
import { ShareListComponent } from './components/share-list/share-list.component';
import { ShareViewComponent } from './components/share-view/share-view.component';
import { UserViewComponent } from './components/user/user-view/user-view.component';

const routes: Routes = [

  {path: '', component: HomeComponent},

  {path: 'account',  children:[
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent},
    {path:'user', component:UserViewComponent}
  ]},
  {path: 'cart', component:BasketComponent},
  {path: 'products', component:ProductsListComponent},
  {path: 'products/details', component:ProductViewComponent},
  {path: 'share', component: ShareListComponent},
  {path: 'share/details', component: ShareViewComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: '**', component: ErrorPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
