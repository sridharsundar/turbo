import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogService, AuthService, NotificationService } from 'app/core';
import { Catalog } from 'app/core';
import { CatalogFilterPipe } from 'app/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  catalog: Catalog;
  search: string = '';
  onAdd = false;
  _onDelete = false;
  form: FormGroup;
  isLoading = true;
  selectedCategory = null;

  constructor(private catalogService: CatalogService, private authService: AuthService, private fb: FormBuilder, private notifyService: NotificationService, private modalService: NgxSmartModalService) { }

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if(currentUser) {
      this.catalogService.getCategories(currentUser.id)
      .subscribe((cat: any[]) => {
        this.isLoading = false;
        this.categories = cat;
      });
    }

    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  addCatlog(catalog) {
    this.categories.push(catalog);
    this.onAdd = true;
    setTimeout(() => {
      this.onAdd = false;
    }, 2000);
  }

  onNew(category) { this.categories.push(category); }

  onEdit(category): void {
    this.selectedCategory = category;
    this.modalService.getModal('modalEditCategory').open();
  }

  edit(category) {
    this.categories[this.categories.indexOf(this.categories.find(c => c._id === category._id))].name = category.name;
  }

  new() { this.modalService.getModal('modalNewCategory').open(); }
}
