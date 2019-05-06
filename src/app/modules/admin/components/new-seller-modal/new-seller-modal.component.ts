import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, UserService } from 'app/core';
import { first } from 'rxjs/operators';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'new-seller-modal',
  templateUrl: './new-seller-modal.component.html',
  styleUrls: ['./new-seller-modal.component.scss']
})
export class NewSellerModalComponent implements OnInit {
  @Output() onNew: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private modalService: NgxSmartModalService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      role: ['PROVIDER'],
      name: ['', Validators.required],
      tel: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  new() {
    this.loading = true;
    if (this.form.invalid) {
      Object.keys(this.f)
      .forEach(c =>  this.f[c].markAsTouched());
      this.loading = false;
      return;
    }

    this.userService.register(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.form.reset();
          this.modalService.getModal('modalNewSeller').close();
      },
      error => {
      });
  }
}
