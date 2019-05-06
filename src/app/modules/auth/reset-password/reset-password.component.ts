import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from 'app/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../auth.scss']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  errMsg = null;
  loading = false;
  success = false;
  dontMatch = false;
  resetToken;

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
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    });
    this.route.paramMap.subscribe(params => {
      if(params.get('token')) {
        this.resetToken = params.get('token');
      }
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

    if(this.f.password.value !== this.f.confirm.value) {
      this.dontMatch = true;
      return;
    }


    this.authService.resetPassword(this.resetToken, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
              this.success = true;
              setTimeout(() => {
                this.loading = false;
                this.success = false;
              }, 3000);
              this.router.navigate(['/connexion']);
            },
            error => {
              setTimeout(() => {
                this.loading = false;
                this.errMsg = error.message;
              }, 1500);
        });
  }

}
