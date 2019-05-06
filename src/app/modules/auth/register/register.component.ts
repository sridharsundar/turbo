import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService, UserService } from 'app/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  returnUrl: string;
  loading = false;
  success = false;

  constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService,
      private userService: UserService
  ) {
    if (this.authService.currentUserValue) {
         this.router.navigate(['/']);
     }
  }

  ngOnInit() {
    this.form = this.fb.group({
      role: ['', Validators.required],
      name: ['', Validators.required],
      tel: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: [''],
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
    if(this.f.role.value !== 'PROVIDER' && this.f.role.value !== 'RESTAURANT') { return; }
    this.userService.register(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.success = true;
          setTimeout(() => {
            this.loading = false;
            this.success = false;
            this.form.reset();
            this.router.navigate(['/connexion']);
          }, 2000);
      },
      error => {
        setTimeout(() => {
          this.loading = false;
        }, 1500);
      });
  }

}
