import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { AdminCategoryComponent } from './components/admin/admin-tables/admin-category/admin-category.component';
import { AdminOrdersComponent } from './components/admin/admin-tables/admin-orders/admin-orders.component';
import { AdminProductComponent } from './components/admin/admin-tables/admin-product/admin-product.component';
import { AdminShareComponent } from './components/admin/admin-tables/admin-share/admin-share.component';
import { AdminUsersComponent } from './components/admin/admin-tables/admin-users/admin-users.component';
import { BasketComponent } from './components/client/basket/basket.component';
import { CheckoutComponent } from './components/client/checkout/checkout.component';
import { ContactComponent } from './components/client/contact/contact.component';
import { ErrorPageComponent } from './components/client/error-page/error-page.component';
import { HomeComponent } from './components/client/home/home.component';
import { LoginComponent } from './components/client/login/login.component';
import { ProductViewComponent } from './components/client/product-view/product-view.component';
import { ProductsInCategoryListComponent } from './components/client/products-in-category-list/products-in-category-list.component';
import { ProductsListComponent } from './components/client/products-list/products-list.component';
import { RegisterComponent } from './components/client/register/register.component';
import { ShareListComponent } from './components/client/share-list/share-list.component';
import { ShareViewComponent } from './components/client/share-view/share-view.component';
import { UploadComponent } from './components/upload/upload.component';
import { UserViewComponent } from './components/client/user-view/user-view.component';
import { AuthGuard } from './guards/AuthGuard.guard';
import { RoleGuard } from './guards/RoleGuard.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'account',  children:[
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent},
    {path:'user', component:UserViewComponent, canActivate: [AuthGuard]},
    {path:'upload', component:UploadComponent}    
  ]},
  {path: 'cart', component:BasketComponent},
  {path: 'products', component:ProductsListComponent},
  {path: 'products/details/:id', component:ProductViewComponent},
  {path: 'products/category/:id', component:ProductsInCategoryListComponent},
  {path: 'share', component: ShareListComponent, canActivate: [AuthGuard]},
  {path: 'share/details', component: ShareViewComponent, canActivate: [AuthGuard]},
  {path: 'contact', component: ContactComponent},
  {path: 'checkout', component: CheckoutComponent}, 
  {path: 'admin', canActivate: [RoleGuard] , children:[
    {path: '', component:AdminLayoutComponent},
    {path: 'product-table', component:AdminProductComponent},
    {path: 'category-table', component:AdminCategoryComponent},
    {path: 'share-table', component:AdminShareComponent},
    {path: 'users-table', component:AdminUsersComponent},
    {path: 'orders-table', component:AdminOrdersComponent}
  ]},
  {path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
