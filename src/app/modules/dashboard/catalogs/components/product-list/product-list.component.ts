import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { CatalogService, AuthService, NotificationService } from 'app/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  @Input()
  category;
  @Input()
  isLoading;

  selectedProduct = null;

  constructor(private catalogService: CatalogService, private authService: AuthService, private notifyService: NotificationService, private modalService: NgxSmartModalService) { }

  ngOnInit() {
  }

  details(product) {
    this.selectedProduct = product;
    this.modalService.getModal('modalDetailsProduct').open();
  }

  edit(product) {
    this.onEdit.emit(product);
  }

  delete(product): void {
    const currentUser = this.authService.currentUserValue;
    if(currentUser) {
      this.catalogService.deleteProduct(currentUser.id, this.category._id, product._id)
      .subscribe(
        (res: any) => {
          this.notifyService.showError("Categorie supprimer", "");
          this.category.products.splice(this.category.products.indexOf(product), 1);
        }
      );
    }
  }

}
