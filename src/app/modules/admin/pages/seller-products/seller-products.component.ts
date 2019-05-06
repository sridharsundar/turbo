import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderService, CatalogService, AuthService, NotificationService } from 'app/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.scss']
})
export class SellerProductsComponent implements OnInit {
  title = '';
  category = null;
  isLoading = true;
  seller;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private providerService: ProviderService,
    private catalogService: CatalogService,
    private modalService: NgxSmartModalService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.get('seller') && params.get('catalog')) {
        this.seller = params.get('seller');
        this.providerService.getSingle(this.seller).subscribe((res) => {
          this.title = 'Vendeurs / ' + res.name;
        });

        this.catalogService.getCategory(this.seller, params.get('catalog')).subscribe((cat) => {
          this.isLoading = false;
          this.category = cat;
        });
      }
    });
  }

  new() { this.modalService.getModal('modalNewProduct').open(); }

  onNew(product) { this.category.products.push(product); }

}
