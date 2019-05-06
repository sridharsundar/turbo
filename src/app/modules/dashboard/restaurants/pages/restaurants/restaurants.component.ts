import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'app/core';
import { Entity } from 'app/core';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  restaurants: Entity[];

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.restaurantService.getAll()
      .subscribe((restaurants: Entity[]) => {
        this.restaurants = restaurants;
    });
  }

}
