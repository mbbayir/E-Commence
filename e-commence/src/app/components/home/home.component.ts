import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/config';
import { BasketModel } from 'src/app/models/basket.model';
import { ProductModel } from 'src/app/models/products.model';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{
  api:string=environment.api

  product: ProductModel= new ProductModel();
  products: ProductModel[]=[]
  constructor(
    private _http:HttpClient,
    private _basket:BasketService
  ){}
  ngOnInit(): void {
    this.urunListesiGetir();
  }

  urunListesiGetir(){
    this._http.get<any>(this.api + "products").subscribe({
      next:(res)=>this.products=res,
      error:(err)=> console.log(err)
  })
  }
  urunEkle(){
  this._http.post<any>(this.api + "products",this.product).subscribe({
    next:(res)=>{
      this.urunListesiGetir();
      this.product = new ProductModel();},
    error: (err) =>console.log(err)
    })
  }
  sepeteUrunEkle(model: ProductModel){
    this._http.post<any>(this.api + 'baskets',model).subscribe({
      next:()=>{
    console.log("Sepete Urun Eklendi")
    this.getBaskets();
    },
      error:(err)=> console.log(err)
    })
  }
  getBaskets(){
    this._http.get<any>(this.api + "Baskets").subscribe({
      next: (res)=>this._basket.baskets=res,
      error:(err)=>console.log(err)
    })
  }
}
