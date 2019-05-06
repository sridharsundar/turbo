import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService, NotificationService } from 'app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errMsg = null;
  returnUrl: string;
  loading = false;

  constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService,
      private notifyService: NotificationService
  ) {
    if (this.authService.currentUserValue) {
         this.router.navigate(['/']);
     }
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.loading = true;
    if (this.form.invalid) {
      Object.keys(this.f)
      .forEach(c =>  this.f[c].markAsTouched());
      this.loading = false;
      return;
    }


    this.authService.login(this.f.email.value.trim(), this.f.password.value.trim())
        .pipe(first())
        .subscribe(
            data => {
              setTimeout(() => {
                this.loading = false;
                this.notifyService.showSuccess('Connexion reussie', '');
                if(this.authService.currentUserValue.role === 'PROVIDER') {
                  this.router.navigate(['/board/catalogues']);
                }else if(this.authService.currentUserValue.role === 'RESTAURANT'){
                  this.router.navigate(['/restaurant/orders']);
                }
              }, 1500);
            },
            error => {
              this.loading = false;
              this.errMsg = error.error.message;
              this.notifyService.showWarning(this.errMsg, '');
        });
  }

}
