import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

import { CatalogService, AuthService } from 'app/core';
import { Catalog } from 'app/core';

@Component({
  selector: 'app-catalog-form',
  templateUrl: './catalog-form.component.html',
  styleUrls: ['./catalog-form.component.scss']
})
export class CatalogFormComponent implements OnInit {
  form: FormGroup;
  onAdd = false;
  onEdit = false;
  new = true;
  product: Catalog = null;

  constructor(
    private catalogService: CatalogService,
    private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      available: [true],
      description: [''],
    });

    const currentUser = this.authService.currentUserValue;
    if(currentUser) {
      this.route.paramMap.subscribe(params => {
        if(params.get('id')) {
          this.catalogService.getSingle(currentUser.id, params.get('id')).subscribe((product: Catalog) => {
            this.new = false;
            this.product = product;
            this.form.controls['name'].setValue(product.name);
            this.form.controls['quantity'].setValue(product.quantity);
            this.form.controls['price'].setValue(product.price);
            this.form.controls['available'].setValue(product.available);
            this.form.controls['description'].setValue(product.description);
          });
        }
      });
    }

  }

  add(): void {
    const currentUser = this.authService.currentUserValue;
    if(currentUser) {
      this.catalogService.post(currentUser.id, this.form.value)
      .subscribe((catalog: Catalog) => {
        this.form.reset({available: true});
        this.onAdd = true;
        setTimeout(() => {
          this.onAdd = false;
        }, 2000);
        this.router.navigate(['/provider/catalogues']);
      });
    }
  }

  edit(): void {
    const currentUser = this.authService.currentUserValue;
    if(currentUser) {
      if(!(this.product.name == this.form.value.name.trim() &&
      this.product.quantity === this.form.value.quantity &&
      this.product.price === this.form.value.price &&
      this.product.available === this.form.value.available &&
      this.product.description === this.form.value.description.trim())) {
        let product = new Catalog();
        product = this.form.value
        product._id = this.product._id;
        this.catalogService.put(currentUser.id, product)
        .subscribe((catalog: Catalog) => {
          this.onEdit = true;
          setTimeout(() => {
            this.onEdit = false;
          }, 2000);
          this.router.navigate(['/provider/catalogues']);
        });
      }
    }
  }

  back(): void {
    this.location.back();
  }
}
