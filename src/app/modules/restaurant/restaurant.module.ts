import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { RestaurantRoutingModule } from './restaurant-routing.module';

import { RestaurantComponent } from './restaurant.component';
import { InvoicesComponent } from './invoices/pages/invoices/invoices.component';
import { OrdersComponent } from './orders/pages/orders/orders.component';
import { ProvidersComponent } from './providers/pages/providers/providers.component';
import { ProviderComponent } from './providers/pages/provider/provider.component';
import { HomeComponent } from './home/pages/home/home.component';
import { SettingsComponent } from './settings/pages/settings/settings.component';
import { CartComponent } from './cart/pages/cart/cart.component';
import { OrderComponent } from './orders/pages/order/order.component';
import { ProfileComponent } from './profile/pages/profile/profile.component';
import { EditProfileComponent } from './profile/pages/edit-profile/edit-profile.component';
import { MyProvidersComponent } from './providers/pages/my-providers/my-providers.component';
import { FindProviderComponent } from './providers/pages/find-provider/find-provider.component';
import { PendingRequestComponent } from './providers/pages/pending-request/pending-request.component';

@NgModule({
  declarations: [
    RestaurantComponent,
    InvoicesComponent,
    OrdersComponent,
    ProvidersComponent,
    ProviderComponent,
    HomeComponent,
    SettingsComponent,
    CartComponent,
    OrderComponent,
    ProfileComponent,
    EditProfileComponent,
    MyProvidersComponent,
    FindProviderComponent,
    PendingRequestComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RestaurantRoutingModule
  ],
  providers: [ CookieService ],
})
export class RestaurantModule { }
