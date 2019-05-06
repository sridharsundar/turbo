import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';

import { UIModule } from 'app/ui/ui.module';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/pages/home/home.component';
import { CatalogsComponent } from './catalogs/pages/catalogs/catalogs.component';
import { CatalogComponent } from './catalogs/pages/catalog/catalog.component';
import { OrdersComponent } from './orders/pages/orders/orders.component';
import { OrderComponent } from './orders/pages/order/order.component';
import { InvoicesComponent } from './invoices/pages/invoices/invoices.component';
import { InvoiceComponent } from './invoices/pages/invoice/invoice.component';
import { RestaurantsComponent } from './restaurants/pages/restaurants/restaurants.component';
import { SettingsComponent } from './settings/pages/settings/settings.component';
import { CatalogListComponent } from './catalogs/components/catalog-list/catalog-list.component';
import { CatalogFormComponent } from './catalogs/components/catalog-form/catalog-form.component';
import { ProfileComponent } from './profile/pages/profile/profile.component';
import { EditProfileComponent } from './profile/pages/edit-profile/edit-profile.component';
import { PendingRequestComponent } from './restaurants/pages/pending-request/pending-request.component';
import { MyRestaurantsComponent } from './restaurants/pages/my-restaurants/my-restaurants.component';
import { CategoriesComponent } from './catalogs/pages/categories/categories.component';
import { CategoryComponent } from './catalogs/pages/category/category.component';
import { EditCategoryModalComponent } from './catalogs/components/edit-category-modal/edit-category-modal.component';
import { CategoryListComponent } from './catalogs/components/category-list/category-list.component';
import { ProductListComponent } from './catalogs/components/product-list/product-list.component';
import { EditProductModalComponent } from './catalogs/components/edit-product-modal/edit-product-modal.component';
import { NewCategoryModalComponent } from './catalogs/components/new-category-modal/new-category-modal.component';
import { NewProductModalComponent } from './catalogs/components/new-product-modal/new-product-modal.component';
import { ProductDetailsComponent } from './catalogs/components/product-details/product-details.component';

import { CatalogFilterPipe } from '../../core/pipes/catalog-filter.pipe';

@NgModule({
  declarations: [DashboardComponent, HomeComponent, CatalogsComponent, CatalogComponent, OrdersComponent, OrderComponent, InvoicesComponent, InvoiceComponent, RestaurantsComponent, SettingsComponent, CatalogListComponent,
    CatalogFilterPipe,
    CatalogFormComponent,
    ProfileComponent,
    EditProfileComponent,
    PendingRequestComponent,
    MyRestaurantsComponent,
    CategoriesComponent,
    CategoryComponent,
    EditCategoryModalComponent,
    CategoryListComponent,
    ProductListComponent,
    EditProductModalComponent,
    NewCategoryModalComponent,
    NewProductModalComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    UIModule,
    DashboardRoutingModule,
    ToastrModule.forRoot(),
    NgxSmartModalModule.forRoot()
  ],
  providers: [ NgxSmartModalService ]
})
export class DashboardModule { }
