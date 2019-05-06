import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogService, AuthService } from 'app/core';
import { Catalog } from 'app/core';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  product;

  constructor(
    private catalogService: CatalogService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if(currentUser) {
      this.route.paramMap.subscribe(params => {
        if(params.get('id')) {
          this.catalogService.getSingle(currentUser.id, params.get('id')).subscribe((product: Catalog) => {
            this.product = product;
          });
        }
      });
    }
  }

}
