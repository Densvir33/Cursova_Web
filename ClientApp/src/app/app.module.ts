import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { BasketComponent } from './components/basket/basket.component';
import { ShareListComponent } from './components/share-list/share-list.component';
import { ContactComponent } from './components/contact/contact.component';
import { ShareViewComponent } from './components/share-view/share-view.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { UserViewComponent } from './components/user/user-view/user-view.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AddProductComponent } from './components/product-crud/add-product/add-product.component';
import { AddCategoryComponent } from './components/categories-crud/add-category/add-category.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    BasketComponent,
    ProductsListComponent,
    ProductViewComponent,
    ShareListComponent,
    ShareViewComponent,
    ContactComponent,
    UserViewComponent,
    ErrorPageComponent,
    CheckoutComponent,
    AddProductComponent,
    AddCategoryComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
