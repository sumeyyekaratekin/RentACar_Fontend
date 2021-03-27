import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/car';

@Pipe({
  name: 'carFilter',
})
export class CarFilterPipe implements PipeTransform {
  
  transform(items: any, filter: any): any {

    console.log(items);
    console.log(filter);
    let filterx=JSON.parse(JSON.stringify(filter));
    console.log(filterx);

    for (var prop in filterx) {
      if (Object.prototype.hasOwnProperty.call(filterx, prop)) {
         if(filterx[prop]=='' || filterx[prop]=='0') { delete filterx[prop]; }
      }
    }

    if (!items || !filterx) {
      return items;
    }
  
    return items.filter(function(obj:any) {
      return Object.keys(filterx).every(function(c) {
        console.log(obj[c] +" > "+ filterx[c]);
        return obj[c].toString().indexOf(filterx[c].toString()) != -1
      });
    });

  }
  
  
}
