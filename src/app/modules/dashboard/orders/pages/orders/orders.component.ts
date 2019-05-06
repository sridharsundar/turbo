import { Component, OnInit } from '@angular/core';
import { AuthService, CatalogService, ProviderService, OrderService } from 'app/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  title = 'Commandes';
  orders;
  _orders;
  total;
  current = 0;
  constructor(
    private authService: AuthService,
    private catalogService: CatalogService,
    private providerService: ProviderService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if(currentUser && currentUser.id) {
      this.orderService.getByProvider(currentUser.id)
      .subscribe(res => {
        this.orders = res;
        this._orders = res;
        this.processing();
        // for(let order of res) {
        //   let total = 0;
        //   for(let d of order.details) {
        //     this.catalogService.getSingle(currentUser.id, d.product)
        //       .subscribe(p => {
        //           total += 1
        //       })
        //   }
        // }
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

  valid(orderId) {
    this.orderService.validated(orderId)
    .subscribe(res => {
      const index = this._orders.findIndex((e) => e._id === res._id);
      this._orders[index] =  res;
      this.processing();
    })
  }

  terminate(orderId) {
    this.orderService.completed(orderId)
    .subscribe(res => {
      const index = this._orders.findIndex((e) => e._id === res._id);
      this._orders[index] =  res;
      this.completed();
    })
  }
}
