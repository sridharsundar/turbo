import { Component, OnInit } from '@angular/core';
import { CatalogService, AuthService, ProviderService, OrderService } from 'app/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title: string = 'Tableau de bord';
  orders;
  catalogs;
  clients;

  constructor(
    private authService: AuthService,
    private catalogService: CatalogService,
    private providerService: ProviderService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if(currentUser) {
      this.catalogService.getCount(currentUser.id).subscribe((cat) => {
        this.catalogs = cat;
      });
      this.providerService.getCustomersCount(currentUser.id).subscribe((cat) => {
        this.clients = cat;
      });
      // this.catalogService.getProvidersCount(currentUser.id).subscribe((cat) => {
      this.orderService.getByProvider(currentUser.id).subscribe((cat) => {
        this.orders = cat.length;
      });
    }
  }

}
