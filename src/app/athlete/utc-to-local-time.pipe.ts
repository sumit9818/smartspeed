import { Pipe, PipeTransform } from '@angular/core';
import dateFormat, { masks } from "dateformat";


@Pipe({
  name: 'timezone'
})
export class UtcToLocalTimePipe implements PipeTransform {

  constructor(){

  }

  transform(value: any, format: any = ''): any {
    var userSelectedFormat = "mm/dd/yyyy h:MM TT";
    let utcDateFormat = "mm/dd/yyyy";
    var timeFormat = "h:MM TT";
    if(userSelectedFormat == 'mm/dd/yyyy h:MM TT') {
      utcDateFormat = "mm/dd/yyyy";
      timeFormat = "h:MM TT";
    }
    var utcDate = new Date(value);
    var utcToLocal = dateFormat(utcDate, userSelectedFormat);
    let utcToLocalDate = dateFormat(utcDate, utcDateFormat);
    let utcToLocalTime = dateFormat(utcDate, timeFormat);

    if(format == '') return utcToLocal;
    if(format == 'date') return utcToLocalDate;
    if(format == 'time') return utcToLocalTime;
        
    return utcToLocal;
  }

}
