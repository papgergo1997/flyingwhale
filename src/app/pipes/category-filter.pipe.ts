import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(arr: any[], filterKey: string): any {
    return arr.filter((el)=>el.category == filterKey ? el : null);
  }

}
