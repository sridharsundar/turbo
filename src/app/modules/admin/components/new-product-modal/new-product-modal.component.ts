import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogService, AuthService, NotificationService } from 'app/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'new-product-modal',
  templateUrl: './new-product-modal.component.html',
  styleUrls: ['./new-product-modal.component.scss']
})
export class NewProductModalComponent implements OnInit {
  @Output() onNew: EventEmitter<any> = new EventEmitter();
  form: FormGroup;

  @Input()
  category;
  @Input()
  seller;

  constructor(
    private catalogService: CatalogService, private authService: AuthService, private fb: FormBuilder, private notifyService: NotificationService, private modalService: NgxSmartModalService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      origin: [''],
      format: [''],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      available: [true],
      description: [''],
    });
  }

  save() {
    this.catalogService.addProduct(this.seller, this.category._id, this.form.value)
      .subscribe((prod: any) => {
        this.form.reset({available: true});
        this.notifyService.showSuccess("Produit ajouter", "");
        this.modalService.getModal('modalNewProduct').close();
        this.onNew.emit(prod);
      });
  }
}
