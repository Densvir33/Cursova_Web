import { Component, OnInit } from '@angular/core';
import { ApiCollectionResponse } from 'src/app/models/apiResponse';
import { DiscountDTO } from 'src/app/models/discountDTO';
import { DiscountService } from 'src/app/services/discount.service';
import { LoadService } from 'src/app/services/load.service';

@Component({
  selector: 'app-admin-share',
  templateUrl: './admin-share.component.html',
  styleUrls: ['./admin-share.component.css']
})
export class AdminShareComponent implements OnInit {

  shares:Array<DiscountDTO>
  loading: boolean = false;

  constructor(private discountService: DiscountService,private spinner:LoadService) { }

  ngOnInit() {
    this.loadProducts()
  }

  loadProducts(){
    this.discountService.getDiscounts()
    .subscribe(
      (res:ApiCollectionResponse) => {       
        
        this.shares = res.data;
        console.log(res);
      },
      error => {console.log(error);});
      this.loading = false
      this.spinner.Spinner(this.loading)
  }

}
