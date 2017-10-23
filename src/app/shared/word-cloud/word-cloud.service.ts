import { Injectable } from '@angular/core';


@Injectable()
class WordCloudService {

  public api: any;

  constructor() {
    this.api = (window as any).WordCloud;
  }
}

export {
  WordCloudService
};
