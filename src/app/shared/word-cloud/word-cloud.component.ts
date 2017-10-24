import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

import {
  WordCloudService,
} from './word-cloud.service';

@Component({
  selector: 'word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WordCloudService]
})
export class WordCloud {
  @Input() words: any[];
  @ViewChild('wordCloud') wordCloudRef: ElementRef;

  private wc: any;
  private cloudRendered = false;
  private wordList: string = '-';
  private maxSize: number = 15;
  private minSize: number = 4;

  constructor(private el: ElementRef, private wordCloudService: WordCloudService) {
    this.wc = this.wordCloudService.api;
  }

  ngOnInit() {
    if(!this.cloudRendered) {
      this.normalizeSizes();
      this.makeWordClouds();
    }
  }

  makeWordClouds() {
    let cloudEl = this.wordCloudRef.nativeElement;

    if(cloudEl) {
      this.cloudRendered = true;

      let cloudData = {
        list: this.words,
        gridSize: 4,
        weightFactor: 2.5,
        fontFamily: 'Segoe UI, Times, serif',
        color: function (word: string) {
          let color = '#00a651';
          switch(word) {
            case 'Boring':
            case 'Complicated':
            case 'Intimidating':
            case 'Old':
            case 'Unprofessional':
              color = '#c50f1f';
              break;
          }
          return color;
        },
        backgroundColor: 'transparent',
        rotateRatio: 0,
        drawOutOfBound: false,
        shuffle: true,
      };

      this.wc(cloudEl, cloudData);
    }
  }

  encodeCloudData(cloudData: any): any[] {
    let items: any = [];

    Object.keys(cloudData).forEach(key => {
      items.push([key, cloudData[key]]);
    });

    return items;
  }

  normalizeSizes() {
    let sizes: number[] = this.words.map((x: any[]) => x[1]).sort(this.numSort);
    let largest = sizes[sizes.length -1];
    let scalingFactor: number = this.maxSize / largest;

    for(var i = 0; i < this.words.length; i++) {
      this.words[i][1] = Math.max(this.words[i][1] * scalingFactor, this.minSize);
    }

    let endSizes: any[] = this.words.map((x: any[]) => '' + x[0] + ':' + x[1]);
  }

  numSort(a: number,b: number) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
}