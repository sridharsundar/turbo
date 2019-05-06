import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService, ProviderService, OrderService } from 'app/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Output() onCart: EventEmitter<any> = new EventEmitter();
  carts = null;
  onAdd = false;

  constructor(
    private authService: AuthService,
    private providerService: ProviderService,
    private orderService: OrderService,
    private cookieService: CookieService) { }

  ngOnInit() {
    if(this.cookieService.check('turboFoodCart')) {
      let turboFoodCart = JSON.parse(this.cookieService.get('turboFoodCart'));
      for(let key in turboFoodCart) {
        this.providerService.getSingle(key)
          .subscribe(provider => {
            this.carts = [];
            let cart = {}
            cart['providerId'] = provider._id;
            cart['provider'] = provider.name;
            cart['products'] = [];
            let total = 0;
            for(let pKey in turboFoodCart[key]) {
              let product = this.getProduct(provider.products, pKey);
              product.quantity = turboFoodCart[key][pKey]['qty'];
              total += product['total'] = product.quantity * product.price;
              cart['products'].push(product);
            }
            cart['total'] = total;
            this.carts.push(cart)
          });
      }
      if(this.carts == null) {
        this.carts = [];
      }
    }else {
      this.carts = [];
    }
  }

  getProduct(products, key) {
    return products.find(product => product._id === key);
  }

  removeItem(providerId, productId) {
    let turboFoodCart = JSON.parse(this.cookieService.get('turboFoodCart'));
    this.carts = [];
    delete turboFoodCart[providerId][productId]
  }

  checkout(providerId) {
    for(let cart of this.carts) {
      if(cart.providerId === providerId) {
        const currentUser = this.authService.currentUserValue;
        if(currentUser && currentUser.id) {
          let products = [];
          for(let p of cart.products) {
            let product =  {}
            product['product'] = p._id;
            product['quantity'] = p.quantity;
            products.push(product);
          }
          this.orderService.checkout(currentUser.id, cart.providerId, products)
            .subscribe(res => {
              this.onAdd = true;
              setTimeout(() => {
                this.onAdd = false;
              }, 2000);
              
              let turboFoodCart = JSON.parse(this.cookieService.get('turboFoodCart'));
              delete turboFoodCart[cart.providerId];
              this.cookieService.set('turboFoodCart', JSON.stringify(turboFoodCart));
              this.carts = this.carts.filter(c => c.providerId != cart.providerId)
            })
        }
      }
    }


  }

}
