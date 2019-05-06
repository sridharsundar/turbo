import { Component, OnInit } from '@angular/core';
import { AuthService, RestaurantService, ProviderService } from 'app/core';
import { Entity } from 'app/core';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {
  providers: Entity[];

  constructor(
    private authService: AuthService,
    private restaurantService: RestaurantService,
    private providerService: ProviderService) { }

  ngOnInit() {
    this.providerService.getAll()
      .subscribe((providers: Entity[]) => {
        this.providers = providers;
    });
  }

  link(provider) {
    const currentUser = this.authService.currentUserValue;
    if(currentUser) {
      this.restaurantService.link(currentUser.id, provider)
        .subscribe(res => {
          // console.log(45);
        })
    }
  }

}
