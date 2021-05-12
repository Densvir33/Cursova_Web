import { Component, OnInit } from '@angular/core';
import { ApiCollectionResponse } from 'src/app/models/apiResponse';
import { DiscountDTO } from 'src/app/models/discountDTO';
import { DiscountService } from 'src/app/services/discount.service';

@Component({
  selector: 'app-share-list',
  templateUrl: './share-list.component.html',
  styleUrls: ['./share-list.component.css']
})
export class ShareListComponent implements OnInit {

  shares:Array<DiscountDTO>
  constructor(private discountService:DiscountService) { }

  ngOnInit() {
    this.load()
  }

  load(){
    this.discountService.getDiscounts()
    .subscribe((res:ApiCollectionResponse)=>{     
      if(!res.isSuccessful){
        console.log(res.data)
        this.shares = res.data;
      }
    })
  }

}
