import { Component, OnInit } from '@angular/core';
import { AuthService, RestaurantService, ProviderService } from 'app/core';
import { Entity } from 'app/core';

@Component({
  selector: 'app-find-provider',
  templateUrl: './find-provider.component.html',
  styleUrls: ['./find-provider.component.scss']
})
export class FindProviderComponent implements OnInit {
  providers: Entity[];
  request = false;
  constructor(
    private authService: AuthService,
    private restaurantService: RestaurantService,
    private providerService: ProviderService) { }

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if(currentUser) {
      this.restaurantService.request(currentUser.id)
      .subscribe((res) => {
        let providersRequest = res.map(r => r.provider);
        this.providerService.getAll()
          .subscribe((pro: Entity[]) => {
            let providers = pro;

            // for(let i = 0; providers.length; i++) {
            //   for(let j = 0; providersRequest.length; j++) {
            //     console.log(5)
            //   }
            // }

            var onlyInA = providersRequest.filter(this.comparer(providers));
            var onlyInB = providers.filter(this.comparer(providersRequest));

            let result = onlyInA.concat(onlyInB);

            this.providers = result;
        });
      });
    }
  }

  link(provider) {
    const currentUser = this.authService.currentUserValue;
    if(currentUser) {
      this.restaurantService.link(currentUser.id, provider)
        .subscribe(res => {
          this.providers = this.providers.filter(r => r._id != provider);
          this.request = true;
          setTimeout(() => {
            this.request = false;
          }, 2000);
        })
    }
  }

  comparer(otherArray){
    return function(current){
      return otherArray.filter(function(other){
        return other._id == current._id;
      }).length == 0;
    }
  }
}
