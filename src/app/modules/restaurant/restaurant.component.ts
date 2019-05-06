import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, RestaurantService } from 'app/core';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  user;
  cart = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if(currentUser) {
      this.restaurantService.getSingle(currentUser.id)
        .subscribe(user => this.user = user)
    }

    if(this.cookieService.check('turboFoodCart')) {
      let turboFoodCart = JSON.parse(this.cookieService.get('turboFoodCart'));
      this.cart = Object.keys(turboFoodCart).length;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onAddToCart(event) {
    alert(3)
  }

}
