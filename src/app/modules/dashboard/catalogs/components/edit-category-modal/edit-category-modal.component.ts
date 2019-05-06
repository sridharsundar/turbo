import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogService, AuthService, NotificationService } from 'app/core';
import { Catalog } from 'app/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'edit-category-modal',
  templateUrl: './edit-category-modal.component.html',
  styleUrls: ['./edit-category-modal.component.scss']
})
export class EditCategoryModalComponent implements OnInit {
  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  @Input()
  category;

  constructor(private catalogService: CatalogService, private authService: AuthService, private fb: FormBuilder, private notifyService: NotificationService, private modalService: NgxSmartModalService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  save(): void {
      const currentUser = this.authService.currentUserValue;
      if(currentUser) {
        this.catalogService.updateCategory(currentUser.id, this.category._id, this.form.value)
          .subscribe((cat: any) => {
            this.notifyService.showInfo("Categorie modifier", "");
            this.modalService.getModal('modalEditCategory').close();
            this.onEdit.emit(cat);
          });
      }
  }

}
