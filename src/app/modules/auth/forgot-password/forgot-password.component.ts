import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from 'app/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../auth.scss']
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  errMsg = null;
  loading = false;
  success = false;

  constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService
  ) {
    if (this.authService.currentUserValue) {
         this.router.navigate(['/']);
     }
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
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


    this.authService.forgotPassword(this.f.email.value.trim())
        .pipe(first())
        .subscribe(
            data => {
              this.success = true;
              setTimeout(() => {
                this.loading = false;
                if(this.authService.currentUserValue.role === 'PROVIDER') {
                  this.router.navigate(['/provider/catalogues']);
                }else if(this.authService.currentUserValue.role === 'RESTAURANT'){
                  this.router.navigate(['/restaurant/orders']);
                }
              }, 1500);
            },
            error => {
              setTimeout(() => {
                this.loading = false;
                this.errMsg = error.message;
              }, 1500);
        });
  }

}
