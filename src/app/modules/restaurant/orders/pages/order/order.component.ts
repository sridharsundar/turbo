import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, CatalogService, ProviderService, OrderService } from 'app/core';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  products = [];
  provider;
  details;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private catalogService: CatalogService,
    private providerService: ProviderService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.get('id')) {
        this.orderService.getSingle(params.get('id'))
          .subscribe(res => {
            this.details = {};
            this.details['date'] = res.date;
            this.details['code'] = res.code;
            this.details['total'] = res.total;
            this.provider = res.provider;
            for(let d of res.details) {
              this.catalogService.getSingle(res.provider._id, d.product)
                .subscribe(p => {
                  let pr = d;
                  pr['name'] = p.name;
                  pr['price'] = p.price;
                  this.products.push(pr);
                })
            }
          })
      }
    });
  }

  getTotal(details) {
    let total = 0;
    for(let d of details) {
      total += d.quantity * d.price;
    }
    return total;
  }

}
