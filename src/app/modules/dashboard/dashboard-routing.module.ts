import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard, RoleGuard } from 'app/core';
import { Role } from 'app/core';

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
import { ProfileComponent } from './profile/pages/profile/profile.component';
import { EditProfileComponent } from './profile/pages/edit-profile/edit-profile.component';
import { PendingRequestComponent } from './restaurants/pages/pending-request/pending-request.component';
import { MyRestaurantsComponent } from './restaurants/pages/my-restaurants/my-restaurants.component';
import { CategoriesComponent } from './catalogs/pages/categories/categories.component';
import { CategoryComponent } from './catalogs/pages/category/category.component';

const routes: Routes = [
  {
    path: 'board',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'catalogues', pathMatch: 'full' },
      { path: 'dashboard', component: HomeComponent },
      { path: 'catalogues', component: CategoriesComponent },
      // { path: 'catalogues/nouveau-produit', component: EditCatalogComponent },
      { path: 'catalogues/:id', component: CategoryComponent },
      // { path: 'catalogues/editer-produit/:id', component: EditCatalogComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'orders/:id', component: OrderComponent },
      { path: 'invoices', component: InvoicesComponent },
      { path: 'my-restaurants', component: MyRestaurantsComponent },
      { path: 'pending-request', component: PendingRequestComponent },
      { path: 'restaurants', component: RestaurantsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'profile/edit', component: EditProfileComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'catalogs/:id', component: CatalogComponent },
    ],
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.Provider] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
