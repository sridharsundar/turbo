import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, ProviderService } from 'app/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  emailForm: FormGroup;
  editEmail = false;
  editPassword = false;
  user;
  passwordForm: FormGroup;
  clickP = false;
  clickE = false;
  passwordChangeFalse = false;
  dontMatch = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private providerService: ProviderService
  ) { }

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if(currentUser) {
      this.passwordForm = this.fb.group({
        password: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      });

      this.providerService.getSingle(currentUser.id)
        .subscribe(user => {
          this.user = user;
          this.emailForm = this.fb.group({
            email: [user.email, [Validators.required, Validators.email]],
            newEmail: ['', [Validators.required, Validators.email]]
          });
        })
    }
  }

  get f() { return this.emailForm.controls; }
  get fP() { return this.passwordForm.controls; }

  resetEmail() {
    this.clickE = true;
    if (this.emailForm.invalid) {
      Object.keys(this.f)
      .forEach(c =>  this.f[c].markAsTouched());
      return;
    }

    if(this.f.email.value === this.f.newEmail.value) {
      return;
    }

    this.providerService.resetEmail(this.user._id, this.emailForm.value)
      .subscribe(res => {
        this.clickE = false;
        this.editEmail = true
        setTimeout(() => {
          this.editEmail = false;
        }, 2000);
        this.emailForm.reset({email: this.f.newEmail.value, newEmail: ''})
      });
  }

  resetPassword() {
    this.clickP = true;
    if (this.passwordForm.invalid) {
      Object.keys(this.fP)
      .forEach(c =>  this.fP[c].markAsTouched());
      return;
    }

    if(this.fP.password.value === this.fP.newPassword.value) {
      return;
    }

    if(this.fP.newPassword.value !== this.fP.confirmPassword.value) {
      this.dontMatch = true;
      return;
    }

    this.dontMatch = false;

    this.providerService.resetPassword(this.user._id, this.passwordForm.value)
      .subscribe(res => {
        this.editPassword = true
        setTimeout(() => {
          this.editPassword = false;
        }, 2000);
        this.passwordForm.reset({password: '', newPassword: ''})
      }, err =>{
        this.passwordChangeFalse = true
        setTimeout(() => {
          this.passwordChangeFalse = false;
        }, 2000);
      });
  }

}
