import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adFilter',
  pure: false
})
export class AdFilterPipe implements PipeTransform {

  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }

    return items.filter((item: any) =>
      item.name.toLowerCase().trim().includes(filter.toLocaleLowerCase().trim()) ||
      item.category.toLowerCase().trim().includes(filter.toLocaleLowerCase().trim()) ||
      item.description.toLowerCase().trim().includes(filter.toLocaleLowerCase().trim())
    );
  }
}
