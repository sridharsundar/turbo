import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { CatalogService, AuthService, NotificationService } from 'app/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  @Input()
  categories;
  @Input()
  isLoading;
  @Input()
  selectedCategory;

  constructor(private catalogService: CatalogService, private authService: AuthService, private notifyService: NotificationService, private modalService: NgxSmartModalService) { }

  ngOnInit() {

  }

  edit(category) {
    this.onEdit.emit(category);
  }

  delete(category): void {
    const currentUser = this.authService.currentUserValue;
    if(currentUser) {
      this.catalogService.deleteCategory(currentUser.id, category._id)
      .subscribe(
        (res: any) => {
          this.notifyService.showError("Categorie supprimer", "");
          this.categories.splice(this.categories.indexOf(category), 1);
        }
      );
    }
  }

}
