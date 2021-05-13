import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { ApiCollectionResponse, ApiResponse } from 'src/app/models/apiResponse';
import { CategoryDTO } from 'src/app/models/categoryDTO';
import { ProductDTO } from 'src/app/models/productDTO';
import { CategoryService } from 'src/app/services/category.service';
import { LoadService } from 'src/app/services/load.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

  products:Array<ProductDTO>
  loading: boolean = false;
  newProduct: ProductDTO = {
    id: -1,
    name: '',
    price: 0,
    image: '',
    property: '',
    mass:0,
    category: '',
  }
  editProduct:any

  selectedCategory: string;
  catagories: Array<CategoryDTO>;


  constructor(private productService: ProductService,private spinner:LoadService,
    private notifier: NotifierService,
    private categoryService: CategoryService, private modalService: NgbModal,
    ) { }

  ngOnInit() {
    this.loading = true
    this.loadProducts()
    this.loadCategory()
  }

  loadProducts(){
    this.productService.getProducts()
    .subscribe(
      (res:ApiCollectionResponse) => {  
        this.products = res.data;
        console.log(res);
      },
      error => {console.log(error);});
      this.loading = false
      this.spinner.Spinner(this.loading)
  }

  openModalWindow(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  onSubmit(f: NgForm) {
    this.newProduct.name = f.value.name
    this.newProduct.price = f.value.price
    this.newProduct.image = f.value.image
    this.newProduct.property = f.value.property
    this.newProduct.mass = f.value.mass
    this.newProduct.category = this.selectedCategory;

    console.log(this.newProduct)
    this.productService.addProduct(this.newProduct)
    .subscribe((res:ApiResponse)=>{     
      if(res.isSuccessful){
          console.log(res)
          this.notifier.notify('success', 'New product is add')
          this.loadProducts()
      }
      else{this.notifier.notify('warning', 'Opps... Somesing wrong. Try again')}
    },error=>{
      this.notifier.notify('warning', 'Opps... Somesing wrong. Try again') })
  } 

  loadCategory(){    
    this.categoryService.getCategories()
    .subscribe((res:ApiCollectionResponse)=>{      
        if(!res.isSuccessful){          
          this.catagories = res.data
        }
    })
  }

  onDelete(id:number){
    this.productService.deleteProduct(id)
    .subscribe((res:ApiResponse)=>{     
      if(res.isSuccessful){
          console.log(res)
          this.notifier.notify('success', 'Product was delete')
          this.loadProducts()
        }
    },error=>{
      this.notifier.notify('warning', 'Opps... Somesing wrong. Try again') })
    }

  onEdit(content:any, id:number){
    
    this.productService.getProductById(id)
    .subscribe((res:ApiCollectionResponse)=>{     
      if(!res.isSuccessful){
          console.log(res)
          this.editProduct = res.data
      }
    },error=>{})

    setTimeout(()=>{
      this.selectedCategory = this.editProduct.category;
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})}, 1000)
  }


  onSaveEdit(f: NgForm, modal:any) {
    modal.close()
    this.editProduct.name = f.value.name    
    this.editProduct.price = f.value.price    
    this.editProduct.property = f.value.property    
    this.editProduct.mass = f.value.mass    
    this.editProduct.category = f.value.category    
    //console.log(this.newProduct)
    this.productService.updateProduct(this.editProduct)
        .subscribe((res:ApiResponse)=>{     
          if(!res.isSuccessful){
              console.log(res)
              this.loadProducts()
              this.notifier.notify('success', 'Product is update')
          }
        },error=>{
          this.notifier.notify('warning', 'Opps... Somesing wrong. Try again') })
    } 

  onClose(modal:any){
    modal.close()

  }
}
