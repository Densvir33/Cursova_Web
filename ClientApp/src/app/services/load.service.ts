import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadService {

constructor(private spinner: NgxSpinnerService) { }

Spinner(load:boolean)
{ 

  if(load){
    this.spinner.show()
    
  }
  else{
    setTimeout(()=>{this.spinner.hide()}, 1500);
    
    }
  
}

}
