import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {
  transform(value: any, type: string) {
    if (type === 'boolean') {
      return value === true ? 'active' : 'deactivated';
    } else if (type === 'number') {
      return value === 1 ? 'active' : 'deactivated';
    }
  }
}
