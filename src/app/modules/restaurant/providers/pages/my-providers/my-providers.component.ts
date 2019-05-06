import { Component, OnInit } from '@angular/core';
import { AuthService, RestaurantService, ProviderService } from 'app/core';

@Component({
  selector: 'app-my-providers',
  templateUrl: './my-providers.component.html',
  styleUrls: ['./my-providers.component.scss']
})
export class MyProvidersComponent implements OnInit {
  providers;
  request = false;

  constructor(
    private authService: AuthService,
    private restaurantService: RestaurantService,
  ) { }

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if(currentUser) {
      this.restaurantService.providers(currentUser.id)
      .subscribe((res) => {
        this.providers = res.providers;
      });
    }
  }

  remove(provider) {
    const currentUser = this.authService.currentUserValue;
    if(currentUser) {
      this.restaurantService.remove(currentUser.id, provider)
        .subscribe(res => {
          this.providers = this.providers.filter(r => r._id != provider);
          this.request = true;
          setTimeout(() => {
            this.request = false;
          }, 2000);
        })
    }
  }
}
