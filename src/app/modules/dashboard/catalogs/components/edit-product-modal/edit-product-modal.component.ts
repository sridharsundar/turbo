import { Component, OnInit, AfterViewInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogService, AuthService, NotificationService } from 'app/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.scss']
})
export class EditProductModalComponent implements OnInit, AfterViewInit {
  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  form: FormGroup;

  @Input()
  product;

  @Input()
  categoryId;

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

  ngAfterViewInit() {
    this.modalService.getModal('modalEditProduct').onOpen.subscribe(() => {
      this.form = this.fb.group({
        name: [this.product.name, Validators.required],
        origin: [this.product.origin],
        format: [this.product.format],
        quantity: [this.product.quantity, Validators.required],
        price: [this.product.price, Validators.required],
        available: [this.product.available],
        description: [this.product.description],
      });
    });

    this.modalService.getModal('modalEditProduct').onClose.subscribe(() => {
      this.form = this.fb.group({
        name: ['', Validators.required],
        origin: [''],
        format: [''],
        quantity: ['', Validators.required],
        price: ['', Validators.required],
        available: [true],
        description: [''],
      });
    });
  }

    save() {
      const currentUser = this.authService.currentUserValue;
      if(currentUser) {
        this.catalogService.editProduct(currentUser.id, this.categoryId, this.product._id, this.form.value)
          .subscribe((prod: any) => {
            this.form.reset({available: true});
            this.notifyService.showInfo("Produit modifier", "");
            this.modalService.getModal('modalEditProduct').close();
            this.onEdit.emit(prod);
          });
      }
    }

}
