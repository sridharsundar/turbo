import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Entity } from 'app/core/models';

const routes = {
  search: (searchText: string) => `/categories/search/${searchText}`,
};

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private apiService: ApiService) { }

  algoliaSearch(searchText) {
    return this.apiService.get(routes.search(searchText));
  }
}
