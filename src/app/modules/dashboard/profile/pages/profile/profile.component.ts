import { Component, OnInit } from '@angular/core';
import { AuthService, ProviderService } from 'app/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user;

  constructor(
    private authService: AuthService,
    private providerService: ProviderService
  ) { }

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if(currentUser) {
      this.providerService.getSingle(currentUser.id)
        .subscribe(user => this.user = user)
    }
  }

}
