import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultImage'
})
export class DefaultImagePipe implements PipeTransform {

  transform(value: string, defaultImg: string = 'assets/images/default.jpg'): string {
    // If there's no value or empty, use default image
    if (!value || value.trim() === '') {
      return defaultImg;
    }
    return value;
  }

}
