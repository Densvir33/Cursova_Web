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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';

import { ProductsInCategoryListComponent } from './components/products-in-category-list/products-in-category-list.component';

import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { NgxSpinnerModule } from 'ngx-spinner';

import { UploadComponent } from './components/upload/upload.component';

import { AdminNavbarComponent } from './components/admin/admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './components/admin/admin-sidebar/admin-sidebar.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { AdminCategoryComponent } from './components/admin/admin-tables/admin-category/admin-category.component';
import { AdminProductComponent } from './components/admin/admin-tables/admin-product/admin-product.component';
import { AdminShareComponent } from './components/admin/admin-tables/admin-share/admin-share.component';
import { AdminUsersComponent } from './components/admin/admin-tables/admin-users/admin-users.component';
import { AdminOrdersComponent } from './components/admin/admin-tables/admin-orders/admin-orders.component';

import {MatDialogModule} from "@angular/material/dialog";
import { MaterialModule } from './modules/material/material.module';
import { TokenInterceptor } from './interseptors/interseptor';

       
      
const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'middle',
			distance: 12
		},
		vertical: {
			position: 'top',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

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
    AddCategoryComponent,
    ProductsInCategoryListComponent,
    UploadComponent,


    AdminNavbarComponent,
    AdminSidebarComponent,
    AdminDashboardComponent,
    AdminLayoutComponent,

    AdminCategoryComponent,
    AdminProductComponent,
    AdminShareComponent,
    AdminUsersComponent,
    AdminOrdersComponent,


  ],
  imports: [    
    BrowserModule,
    NgxPaginationModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    NgSelectModule,
    CommonModule,
    NotifierModule.withConfig(customNotifierOptions),
    ReactiveFormsModule,
    NgxSpinnerModule,

    //MatDialogModule,
    MaterialModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
