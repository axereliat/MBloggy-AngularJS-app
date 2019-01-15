import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'orderByCreationDate'})
export class OrderByDateOfCreationPipe implements PipeTransform {
  transform(value: any[]): any[] {
    if (value) {
      return value.sort((item1, item2) => Date.parse(item2.createdAt) - Date.parse(item1.createdAt));
    }
  }
}
