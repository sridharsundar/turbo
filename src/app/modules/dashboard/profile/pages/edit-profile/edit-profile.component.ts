import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, ProviderService } from 'app/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  form: FormGroup;
  user;
  editSuccess = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private providerService: ProviderService
  ) { }

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if(currentUser) {
      this.providerService.getSingle(currentUser.id)
        .subscribe(user => {
          this.user = user;
          this.form = this.fb.group({
            name: [user.name, Validators.required],
            presentation: [user.presentation, Validators.required],
            tel: [user.tel, Validators.required],
            address: [user.address, Validators.required],
            city: [user.city, Validators.required],
          });
        })
    }
  }

  get f() { return this.form.controls; }

  onEdit() {
    if (this.form.invalid) {
      Object.keys(this.f)
      .forEach(c =>  this.f[c].markAsTouched());
      return;
    }

    this.providerService.editProfile(this.user._id, this.form.value)
      .subscribe(
        data => {
          this.editSuccess = true;
          setTimeout(() => {
            this.editSuccess = false;
            window.location.reload();
          }, 2000);
      });
  }

}
