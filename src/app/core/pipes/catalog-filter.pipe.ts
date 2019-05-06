import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'catalogFilter'
})
export class CatalogFilterPipe implements PipeTransform {

  transform(value: any, search: any): any {
    search = search.trim().toLowerCase();
    return search !== '' ? value.filter(item => item.name.toLowerCase().includes(search)) : value;
  }

}
