import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'JsonToArrayPipe'})
export class JSONtoArrayPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    if (!value) {
      return value;
    } 

    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    } 
    return keys;
  } 
} 