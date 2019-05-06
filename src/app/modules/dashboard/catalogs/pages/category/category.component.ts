import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogService, AuthService } from 'app/core';
import { Catalog } from 'app/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  title: string = '';
  category;
  isLoading = true;
  selectedProduct = null;

  constructor(
    private catalogService: CatalogService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgxSmartModalService
  ) { }

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if(currentUser) {
      this.route.paramMap.subscribe(params => {
        if(params.get('id')) {
          this.catalogService.getCategory(currentUser.id, params.get('id')).subscribe((cat) => {
            this.isLoading = false;
            this.category = cat;
            this.title = 'Categories / ' + cat.name;
          });
        }
      });
    }
  }

  onNew(product) { this.category.products.push(product); }

  edit(product) {
    this.category.products[this.category.products.indexOf(this.category.products.find(c => c._id === product._id))] = product;
  }

  onEdit(product): void {
    this.selectedProduct = product;
    this.modalService.getModal('modalEditProduct').open();
  }

  new() { this.modalService.getModal('modalNewProduct').open(); }
}
