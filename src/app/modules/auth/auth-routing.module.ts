import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthComponent } from './auth.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'logout', component: LogoutComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'admin-login', component: AdminLoginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password/:token', component: ResetPasswordComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
