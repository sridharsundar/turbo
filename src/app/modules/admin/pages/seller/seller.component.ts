import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderService, CatalogService, AuthService, NotificationService } from 'app/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {
  title = '';
  categories: any[] = [];
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
      if(params.get('seller')) {
        this.seller = params.get('seller');
        this.providerService.getSingle(this.seller).subscribe((res) => {
          this.title = 'Vendeurs / ' + res.name;
        });

        this.catalogService.getCategories(this.seller)
        .subscribe((cat: any[]) => {
          this.isLoading = false;
          this.categories = cat;
        });
      }
    });

  }

  new() { this.modalService.getModal('modalNewCategory').open(); }

  onNew(category) { this.categories.push(category); }

}
