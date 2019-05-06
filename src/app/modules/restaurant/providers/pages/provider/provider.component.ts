import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProviderService } from 'app/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent implements OnInit {
  @Output() onCart: EventEmitter<any> = new EventEmitter();
  @ViewChild('cart') cart: ElementRef;
  @ViewChild('close') close: ElementRef;
  provider;
  onAdd = false;
  currentProduct;
  currentQty = 0;

  constructor(
    private route: ActivatedRoute,
    private providerService: ProviderService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.get('id')) {
        this.providerService.getSingle(params.get('id'))
          .subscribe(provider => this.provider = provider)
      }
    });
  }

  addToCart(product): void {
    this.currentProduct = product;
    this.cart.nativeElement.click()
  //   if(this.cookieService.check('turboFoodCart')) {
  //     let turboFoodCart = JSON.parse(this.cookieService.get('turboFoodCart'));
  //     if(turboFoodCart.hasOwnProperty(this.provider._id)) {
  //       if(turboFoodCart[this.provider._id].hasOwnProperty(productId)) {
  //         turboFoodCart[`${this.provider._id}`][productId]['qty'] += 1;
  //         this.cookieService.set('turboFoodCart', JSON.stringify(turboFoodCart));
  //       }else {
  //         let product = {
  //           'qty': 1
  //         }
  //         turboFoodCart[`${this.provider._id}`][productId] = product;
  //         this.cookieService.set('turboFoodCart', JSON.stringify(turboFoodCart));
  //       }
  //     }else {
  //       let product = {
  //         'qty': 1
  //       }
  //       turboFoodCart[`${this.provider._id}`] = {};
  //       turboFoodCart[`${this.provider._id}`][productId] = product;
  //       this.cookieService.set('turboFoodCart', JSON.stringify(turboFoodCart));
  //     }
  //   }else {
  //     let turboFoodCart = {}
  //     let product = {
  //       'qty': 1
  //     }
  //     turboFoodCart[`${this.provider._id}`] = {};
  //     turboFoodCart[`${this.provider._id}`][productId] = product;
  //     this.cookieService.set('turboFoodCart', JSON.stringify(turboFoodCart));
  //   }
  //   this.onAdd = true;
  //   setTimeout(() => {
  //     this.onAdd = false;
  //   }, 2000);
  //   this.onCart.emit();
  }

  add(): void {
    if(this.currentQty > 0 ) {
      if(this.cookieService.check('turboFoodCart')) {
        let turboFoodCart = JSON.parse(this.cookieService.get('turboFoodCart'));
        if(turboFoodCart.hasOwnProperty(this.provider._id)) {
          if(turboFoodCart[this.provider._id].hasOwnProperty(this.currentProduct._id)) {
            turboFoodCart[`${this.provider._id}`][this.currentProduct._id]['qty'] += this.currentQty;
            this.cookieService.set('turboFoodCart', JSON.stringify(turboFoodCart));
          }else {
            let product = {
              'qty': this.currentQty
            }
            turboFoodCart[`${this.provider._id}`][this.currentProduct._id] = product;
            this.cookieService.set('turboFoodCart', JSON.stringify(turboFoodCart));
          }
        }else {
          let product = {
            'qty': this.currentQty
          }
          turboFoodCart[`${this.provider._id}`] = {};
          turboFoodCart[`${this.provider._id}`][this.currentProduct._id] = product;
          this.cookieService.set('turboFoodCart', JSON.stringify(turboFoodCart));
        }
      }else {
        let turboFoodCart = {}
        let product = {
          'qty': this.currentQty
        }
        turboFoodCart[`${this.provider._id}`] = {};
        turboFoodCart[`${this.provider._id}`][this.currentProduct._id] = product;
        this.cookieService.set('turboFoodCart', JSON.stringify(turboFoodCart));
      }
      this.close.nativeElement.click()
      this.onAdd = true;
      setTimeout(() => {
        this.currentQty = 0;
        this.currentProduct = null;
        this.onAdd = false;
        window.location.reload();
      }, 1500);
    }
  }
}
