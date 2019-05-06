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

  fileToUpload: File = null;
  imageUrl

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

  handle(files: FileList) {
    this.fileToUpload = files[0];
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload)
  }

  save() {
    // console.log(this.fileToUpload)
    // let f = new FormData();
    // f.append('image', this.fileToUpload, this.fileToUpload.name)
    // f.append('name', this.form.value.name)
    const currentUser = this.authService.currentUserValue;
    if(currentUser) {
      // this.catalogService.addProduct(currentUser.id, this.category._id, f)
      this.catalogService.addProduct(currentUser.id, this.category._id, this.form.value)
        .subscribe((prod: any) => {
          this.form.reset({available: true});
          this.notifyService.showSuccess("Produit ajouter", "");
          this.modalService.getModal('modalNewProduct').close();
          this.onNew.emit(prod);
        });
    }
  }
}
