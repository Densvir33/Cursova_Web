import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public progress: number;
  public message: string;

  @Output() public onUploadFinished = new EventEmitter();

  constructor(
    private accountService:AccountService) { }

  ngOnInit() {}

 
  fromData: FormData = new FormData()
  uploadPhoto(files:FileList){
    if(files.item && files.item(0)){
      this.fromData.append('file', files.item(0) || '{}')
      let id:any = this.accountService.getUserID()      
      this.accountService.uploadPhoto(id, this.fromData).subscribe((res:any)=>{
        if(res.isSuccessful){
          
        }
      })
    }

  }
}



