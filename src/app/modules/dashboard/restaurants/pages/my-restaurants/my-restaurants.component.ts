import { Component, OnInit } from '@angular/core';
import { AuthService, RestaurantService, ProviderService } from 'app/core';

@Component({
  selector: 'app-my-restaurants',
  templateUrl: './my-restaurants.component.html',
  styleUrls: ['./my-restaurants.component.scss']
})
export class MyRestaurantsComponent implements OnInit {
  restaurants;
  request = false;

  constructor(
    private authService: AuthService,
    private providerService: ProviderService,
    private restaurantService: RestaurantService,
  ) { }

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if(currentUser) {
      this.providerService.restaurants(currentUser.id)
      .subscribe((res) => {
        this.restaurants = res.restaurants;
      });
    }
  }

  remove(restaurant) {
    const currentUser = this.authService.currentUserValue;
    if(currentUser) {
      this.restaurantService.remove(restaurant, currentUser.id)
        .subscribe(res => {
          this.restaurants = this.restaurants.filter(r => r._id != restaurant);
          this.request = true;
          setTimeout(() => {
            this.request = false;
          }, 2000);
        })
    }
  }

}
