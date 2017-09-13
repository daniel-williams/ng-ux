import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe {
  transform(content: string, length: number = 100, limit: boolean = false): string {
    if(!content) { return; }
    
    let max = limit ? length : content.length;

    let result = (limit && content.length > max - 2)
      ? (content.substring(0, max - 2) + '...')
      : content;

    return result;
  }
}
