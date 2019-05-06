import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core';
import { Role } from 'app/core';

import { RestaurantComponent } from './restaurant.component';
import { HomeComponent } from './home/pages/home/home.component';
import { OrdersComponent } from './orders/pages/orders/orders.component';
import { InvoicesComponent } from './invoices/pages/invoices/invoices.component';
import { ProvidersComponent } from './providers/pages/providers/providers.component';
import { ProviderComponent } from './providers/pages/provider/provider.component';
import { SettingsComponent } from './settings/pages/settings/settings.component';
import { CartComponent } from './cart/pages/cart/cart.component';
import { OrderComponent } from './orders/pages/order/order.component';
import { ProfileComponent } from './profile/pages/profile/profile.component';
import { EditProfileComponent } from './profile/pages/edit-profile/edit-profile.component';
import { MyProvidersComponent } from './providers/pages/my-providers/my-providers.component';
import { FindProviderComponent } from './providers/pages/find-provider/find-provider.component';
import { PendingRequestComponent } from './providers/pages/pending-request/pending-request.component';

const routes: Routes = [
  {
    path: 'restaurant',
    component: RestaurantComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'orders/:id', component: OrderComponent },
      { path: 'invoices', component: InvoicesComponent },
      { path: 'providers', component: ProvidersComponent },
      { path: 'my-providers', component: MyProvidersComponent },
      { path: 'find-provider', component: FindProviderComponent },
      { path: 'pending-request', component: PendingRequestComponent },
      { path: 'providers/:id', component: ProviderComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'profile/edit', component: EditProfileComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'cart', component: CartComponent },
    ],
    canActivate: [AuthGuard],
    data: { roles: [Role.Restaurant] }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }
