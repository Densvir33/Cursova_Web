import { Component, OnInit } from '@angular/core';
import { ApiCollectionResponse } from 'src/app/models/apiResponse';
import { OrderDTO } from 'src/app/models/orderDTO';
import { LoadService } from 'src/app/services/load.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
 
  orders:Array<OrderDTO>
  loading: boolean = false;

  constructor(private orderService: OrderService,private spinner:LoadService) { }

  ngOnInit() {
    this.loadProducts()
  }

  loadProducts(){
    this.orderService.getOrders()
    .subscribe(
      (res:ApiCollectionResponse) => {       
        
        this.orders = res.data;
        console.log(res);
      },
      error => {console.log(error);});
      this.loading = false
      this.spinner.Spinner(this.loading)
  }


}
