import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardFooterComponent } from './dashboard-footer/dashboard-footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardTitleComponent } from './dashboard-title/dashboard-title.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DashboardFooterComponent,
    NotFoundComponent,
    DashboardTitleComponent
  ],
  exports: [
    DashboardFooterComponent,
    NotFoundComponent,
    DashboardTitleComponent,
  ]
})
export class UIModule { }
