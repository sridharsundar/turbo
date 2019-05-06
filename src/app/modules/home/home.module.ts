import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgAisModule } from 'angular-instantsearch';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { AccessAccountComponent } from './pages/access-account/access-account.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { SearchComponent } from './pages/search/search.component';
import { LandingComponent } from './pages/landing/landing.component';
import { OwnerContactComponent } from './components/owner-contact/owner-contact.component';

import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: LandingComponent },
      { path: 'search', component: SearchComponent },
      { path: 'search/:searchText', component: SearchComponent },
    ]
  },
];

@NgModule({
  declarations: [HomeComponent, AccessAccountComponent, CreateAccountComponent, SearchComponent, LandingComponent, OwnerContactComponent],
  imports: [
    CommonModule,
    NgAisModule.forRoot(),
    RouterModule.forRoot(routes),
    FormsModule,
    NgxSmartModalModule
  ],
  exports: [
    RouterModule
  ],
  providers: [ NgxSmartModalService ]
})
export class HomeModule { }
