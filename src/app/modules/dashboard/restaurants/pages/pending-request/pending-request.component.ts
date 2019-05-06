import { Component, OnInit } from '@angular/core';
import { AuthService, RestaurantService, ProviderService } from 'app/core';

@Component({
  selector: 'app-pending-request',
  templateUrl: './pending-request.component.html',
  styleUrls: ['./pending-request.component.scss']
})
export class PendingRequestComponent implements OnInit {
  results;
  request = false;

  constructor(
    private authService: AuthService,
    private providerService: ProviderService,
  ) { }

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if(currentUser) {
      this.providerService.pendignRequest(currentUser.id)
        .subscribe(res => {
          this.results = res;
        })
    }
  }

  confirm(provider, restaurant) {
    this.providerService.confirmRequest(provider, restaurant)
      .subscribe(res => {
        this.results = this.results.filter(r => r.restaurant._id != restaurant);
        this.request = true;
        setTimeout(() => {
          this.request = false;
        }, 2000);
      })
  }

}
