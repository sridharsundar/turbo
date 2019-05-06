import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from 'app/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchText: string = '';
  searchResult;
  owner = null;

  constructor(private router: Router, private route: ActivatedRoute, private searchService: SearchService, private modalService: NgxSmartModalService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.get('searchText')) {
        this.searchText = params.get('searchText');
        this.searchService.algoliaSearch(this.searchText)
          .subscribe(res => {
            this.searchResult = res.res.hits;
          })
      }
    });
  }

  search() {
    if(this.searchText.trim() != '') {
      this.router.navigate(['/search', this.searchText], );
    }
  }

  contact(owner) {
    this.owner = owner;
    console.log(this.owner)
    this.modalService.getModal('modalOwnerContact').open();
  }

}
