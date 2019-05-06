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
    private restaurantService: RestaurantService,
  ) { }

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if(currentUser) {
      this.restaurantService.pendignRequest(currentUser.id)
        .subscribe(res => {
          this.results = res;
        })
    }
  }

  cancel(provider) {
    const currentUser = this.authService.currentUserValue;
    if(currentUser) {
      this.restaurantService.cancel(currentUser.id, provider)
        .subscribe(res => {
          this.results = this.results.filter(r => r.provider._id != provider);
          this.request = true;
          setTimeout(() => {
            this.request = false;
          }, 2000);
        })
    }
  }

}
