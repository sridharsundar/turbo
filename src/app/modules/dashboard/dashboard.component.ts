import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, ProviderService } from 'app/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user;
  
  constructor(
    private router: Router,
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
