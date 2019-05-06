import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogService, AuthService, NotificationService } from 'app/core';
import { Catalog } from 'app/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'new-category-modal',
  templateUrl: './new-category-modal.component.html',
  styleUrls: ['./new-category-modal.component.scss']
})
export class NewCategoryModalComponent implements OnInit {
  @Output() onNew: EventEmitter<any> = new EventEmitter();
  form: FormGroup;

  @Input()
  seller;

  constructor(private catalogService: CatalogService, private authService: AuthService, private fb: FormBuilder, private notifyService: NotificationService, private modalService: NgxSmartModalService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  save(): void {
    this.catalogService.addCategory(this.seller, this.form.value)
      .subscribe((cat: any) => {
        this.form.reset();
        this.notifyService.showSuccess("Categorie ajouter", "");
        this.modalService.getModal('modalNewCategory').close();
        this.onNew.emit(cat);
      });
  }
}
