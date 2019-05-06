import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthComponent } from './auth.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ResetPasswordComponent, ForgotPasswordComponent, AdminLoginComponent, AuthComponent, LogoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot(),
    AuthRoutingModule
  ]
})
export class AuthModule { }
