import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from 'app/ui/ui.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SellersComponent } from './pages/sellers/sellers.component';
import { NewSellerModalComponent } from './components/new-seller-modal/new-seller-modal.component';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SellerComponent } from './pages/seller/seller.component';
import { SellerProductsComponent } from './pages/seller-products/seller-products.component';
import { NewProductModalComponent } from './components/new-product-modal/new-product-modal.component';
import { EditProductModalComponent } from './components/edit-product-modal/edit-product-modal.component';
import { EditCategoryModalComponent } from './components/edit-category-modal/edit-category-modal.component';
import { NewCategoryModalComponent } from './components/new-category-modal/new-category-modal.component';
import { BuyersComponent } from './pages/buyers/buyers.component';

@NgModule({
  declarations: [AdminComponent, SellersComponent, NewSellerModalComponent, SellerComponent, SellerProductsComponent, NewProductModalComponent, EditProductModalComponent, EditCategoryModalComponent, NewCategoryModalComponent, BuyersComponent],
  imports: [
    CommonModule,
    UIModule,
    AdminRoutingModule,
    NgxSmartModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ NgxSmartModalService ]
})
export class AdminModule { }
