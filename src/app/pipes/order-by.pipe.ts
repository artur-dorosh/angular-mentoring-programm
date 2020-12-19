import { Pipe, PipeTransform } from '@angular/core';
import { ICourse } from '../interfaces/course.interface';

const ascSort = (a: ICourse, b: ICourse): number => {
  if (new Date(a.creationDate) > new Date(b.creationDate)) {
    return 1;
  } else if (new Date(a.creationDate) < new Date(b.creationDate)) {
    return -1;
  }
  return 0;
};

const descSort = (a: ICourse, b: ICourse): number => {
  if (new Date(a.creationDate) < new Date(b.creationDate)) {
    return 1;
  } else if (new Date(a.creationDate) > new Date(b.creationDate)) {
    return -1;
  }
  return 0;
};

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: ICourse[], direction: string): ICourse[] {
    return value.sort(direction === 'asc' ? ascSort : descSort);
  }

}
