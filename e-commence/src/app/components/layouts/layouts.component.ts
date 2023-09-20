import { HttpClient } from '@angular/common/http';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { BasketModel } from 'src/app/models/basket.model';
import { environment } from 'src/app/config';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css']
})
export class LayoutsComponent implements AfterContentChecked {
api:string=environment.api
baskets:BasketModel[]=[]

constructor(
private _basket:BasketService
){}
ngAfterContentChecked(): void {
  this.getBaskets();
}

getBaskets(){
  this.baskets=this._basket.baskets;
}
}
