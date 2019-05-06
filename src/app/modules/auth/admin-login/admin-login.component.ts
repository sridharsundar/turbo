import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from 'app/core';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['../auth.scss']
})
export class AdminLoginComponent implements OnInit {
  form: FormGroup;
  errMsg = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
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

    this.authService.admin(this.f.email.value.trim(), this.f.password.value.trim())
        .pipe(first())
        .subscribe(
            data => {
              setTimeout(() => {
                this.loading = false;
                  this.router.navigate(['/admin/']);
              }, 1500);
            },
            error => {
              setTimeout(() => {
                this.loading = false;
                this.errMsg = error.error.message;
              }, 1500);
        });
  }

}
