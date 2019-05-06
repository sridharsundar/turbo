import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { CatalogService, AuthService } from 'app/core';
import { Catalog } from 'app/core';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.scss']
})
export class CatalogListComponent implements OnInit {
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  @Input() catalogs;

  constructor(private catalogService: CatalogService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  delete(product: Catalog): void {
    const currentUser = this.authService.currentUserValue;
    if(currentUser) {
      this.catalogService.delete(currentUser.id, product._id)
      .subscribe(
        (res: any) => {
          this.onDelete.emit();
          this.catalogs.splice(this.catalogs.indexOf(product), 1);
        }
      );
    }
  }

  edit(id: string) {
    // this.onEdit.emit(product);
    this.router.navigate(['/provider/catalogues/editer-produit', id]);
  }

}
