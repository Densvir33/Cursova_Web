import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/admin', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
  // { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
  { path: '/admin/product-table', title: 'Products',  icon:'ni-bullet-list-67 text-red', class: '' },
  { path: '/admin/category-table', title: 'Categories',  icon:'ni-bullet-list-67 text-red', class: '' },
  { path: '/admin/share-table', title: 'Shares',  icon:'ni-bullet-list-67 text-red', class: '' },
  { path: '/admin/users-table', title: 'Users',  icon:'ni-bullet-list-67 text-red', class: '' },
  { path: '/admin/orders-table', title: 'Orders',  icon:'ni-bullet-list-67 text-red', class: '' },
];

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event:any) => {
      this.isCollapsed = true;
   });
  }

}
