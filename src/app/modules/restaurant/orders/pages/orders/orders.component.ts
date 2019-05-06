import { Component, OnInit } from '@angular/core';
import { AuthService, ProviderService, OrderService } from 'app/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders;
  _orders;
  current = 0;

  constructor(
    private authService: AuthService,
    private providerService: ProviderService,
    private orderService: OrderService) { }

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if(currentUser && currentUser.id) {
      this.orderService.getByRestaurant(currentUser.id)
      .subscribe(res => {
        this.orders = res;
        this._orders = res;
        this.processing();
      })
    }
  }

  completed() {
    this.orders = this._orders.filter(o => o.status === 'COMPLETED');
    this.current = 2;
  }

  validated() {
    this.orders = this._orders.filter(o => o.status === 'VALIDATED');
    this.current = 1;
  }

  processing() {
    this.orders = this._orders.filter(o => o.status === 'PROCESSING');
    this.current = 0;
  }

  refused() {
    this.orders = this._orders.filter(o => o.status === 'REFUSED')
  }

}
