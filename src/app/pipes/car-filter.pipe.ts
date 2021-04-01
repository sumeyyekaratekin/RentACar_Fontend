import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/carDetail';

@Pipe({
  name: 'carFilter'
})
export class CarFilterPipe implements PipeTransform {

  transform(value: CarDetail[], filterText:string): CarDetail[] {
    // filterText = filterText ? filterText.toLocaleLowerCase() : ""
    // return filterText ? value
    // .filter((p:CarDetail) => p.carName.toLocaleLowerCase().indexOf(filterText) !== -1) 
    // : value;
   
    return filterText?value
    .filter((c:any) => this.matchValue(c,filterText))
    :value;

  }

  matchValue(c:any, filterText:string) {
    return Object.keys(c).map((key) => {
       return new RegExp(filterText, 'gi').test(c[key]);
    }).some(result => result);
  }

}
