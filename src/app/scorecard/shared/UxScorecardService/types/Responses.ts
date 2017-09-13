import { ResponseType } from './enums';


export class NVPair {
  constructor(
    public name: string,
    public value: number) {}
}

export class NBPair {
  constructor(
    public name: string,
    public value: boolean) {}
}

abstract class ScaleResponse {
  private items: NVPair[];
  
  constructor(items: NVPair[] = []) {
    this.items = items;
  }
  
  add(item: NVPair) {
    this.items.push(item);
  }
  
  getName(value: number): string | null {
    let item = this.items.find(x => x.value === value);
    
    return item && item.name || null;
  }
  
  getValue(name: string): number | null {
    let item = this.items.find(x => x.name === name);
    
    return item && item.value || null;
  }
}

export class GradedResponse extends ScaleResponse {
  private static "type": ResponseType = ResponseType.Completed;
}

export class CompletedResponse extends ScaleResponse {
  private static "type": ResponseType = ResponseType.Graded;
}

export class AssociativeResponse {
  private static "type": ResponseType = ResponseType.Associative;
  private items: { name: string, value: boolean }[];

  constructor(items: NBPair[] = []) {
    this.items = items;
  }

  add(item: NBPair) {
    this.items.push(item);
  }

  isPositive(name: string): boolean {
    let regx = new RegExp('^' + name + '$', 'i');
    let item = this.items.find(x => regx.test(x.name));

    return item && item.value || false;
  }

  getPositive(): string[] {
    return this.items
      .filter(x => x.value)
      .map(x => x.name);
  }

  getNegative(): string[] {
    return this.items
      .filter(x => !x.value)
      .map(x => x.name);
  }
}
