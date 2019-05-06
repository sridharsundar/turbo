import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard, RoleGuard } from 'app/core';
import { Role } from 'app/core';
import { SellersComponent } from './pages/sellers/sellers.component';
import { SellerComponent } from './pages/seller/seller.component';
import { SellerProductsComponent } from './pages/seller-products/seller-products.component';
import { BuyersComponent } from './pages/buyers/buyers.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'sellers', pathMatch: 'full' },
      // { path: '', component: HomeComponent },
      { path: 'sellers', component: SellersComponent },
      { path: 'sellers/:seller', component: SellerComponent },
      { path: 'sellers/:seller/catalogs/:catalog', component: SellerProductsComponent },
      { path: 'buyers', component: BuyersComponent },
    ],
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.Admin] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
