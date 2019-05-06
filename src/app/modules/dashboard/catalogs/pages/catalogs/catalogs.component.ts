import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogService, AuthService } from 'app/core';
import { Catalog } from 'app/core';
import { CatalogFilterPipe } from 'app/core';

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.scss']
})
export class CatalogsComponent implements OnInit {
  catalogs: Catalog[] = [];
  catalog: Catalog;
  search: string = '';
  onAdd = false;
  _onDelete = false;
  form: FormGroup;

  constructor(private catalogService: CatalogService, private authService: AuthService) { }

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if(currentUser) {
      this.catalogService.getAll(currentUser.id)
      .subscribe((products: Catalog[]) => {
        this.catalogs = products;
      });
    }

    // this.form = this.fb.group({
    //   name: ['', Validators.required],
    //   quantity: ['', Validators.required],
    //   price: ['', Validators.required],
    //   available: [true],
    //   description: [''],
    // });
  }

  addCatlog(catalog) {
    this.catalogs.push(catalog);
    this.onAdd = true;
    setTimeout(() => {
      this.onAdd = false;
    }, 2000);
  }

  onDelete() {
    this._onDelete = true;
    setTimeout(() => {
      this._onDelete = false;
    }, 2000);
  }

  onEdit(product): void {
    this.catalog = product;
  }

}
