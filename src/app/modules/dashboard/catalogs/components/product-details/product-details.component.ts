import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  @Input()
  product;
  
  constructor() { }

  ngOnInit() {
  }

}
