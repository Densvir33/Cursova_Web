import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './components/basket/basket.component';
import { AddCategoryComponent } from './components/categories-crud/add-category/add-category.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AddProductComponent } from './components/product-crud/add-product/add-product.component';
import { UpdateProductComponent } from './components/product-crud/update-product/update-product.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductsInCategoryListComponent } from './components/products-in-category-list/products-in-category-list.component';
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
  {path: 'products/details/:id', component:ProductViewComponent},
  {path: 'products/category/:id', component:ProductsInCategoryListComponent},
  {path: 'share', component: ShareListComponent},
  {path: 'share/details', component: ShareViewComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'checkout', component: CheckoutComponent},
  

  {path: 'admin', children:[
    {path: 'product', children:[
      {path: 'add', component:AddProductComponent},
      {path: 'update', component:UpdateProductComponent},
    ]},
    {path:'category', children:[
      {path: 'add', component:AddCategoryComponent},
      //{path: 'update', component:UpdateProductComponent},
    ]}
  ]},

  

  {path: '**', component: ErrorPageComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
