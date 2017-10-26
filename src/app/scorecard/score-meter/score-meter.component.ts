import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { AnimationService, Easing, TweenMax } from '../../core';
import { Score } from '../types';


@Component ({
  selector: 'score-meter',
  templateUrl: './score-meter.component.html',
  styleUrls: ['./score-meter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'score-meter',
    // '(mouseenter)': 'onMouseEnter($event)',
    // '(mouseleave)': 'onMouseLeave($event)',
  }
})
export class ScoreMeter {
  @Input() label: string;
  @Input() labelWidth: string = '80px';
  @Input() maxValue: number;
  @Input() value: number;
  @Input() static: boolean = true;

  @Input() barColor: string = 'whitesmoke';
  @Input() fillColor: string = '#106ebe';

  // @Output('mouseEnter') mouseEnter: EventEmitter<Score> = new EventEmitter<Score>();
  // @Output('mouseLeave') mouseLeave: EventEmitter<Score> = new EventEmitter<Score>();

  @ViewChild('lblRef') lblRef: ElementRef;
  @ViewChild('fill') fillRef: ElementRef;
  @ViewChild('max') maxRef: ElementRef;
  @ViewChild('wrap') wrapRef: ElementRef;

  private fill: HTMLDivElement;
  private max: HTMLDivElement;
  private wrap: HTMLDivElement;
  private fillWidth: string = '0';
  private score: Score;

  constructor() { }

  ngOnInit() {
    this.fill = this.fillRef.nativeElement;
    this.max = this.maxRef.nativeElement;
    this.wrap = this.wrapRef.nativeElement;
    
    this.lblRef.nativeElement.style.width = this.labelWidth;
    if(this.static) {
      if(this.fill) {
        this.fill.style.width = '' + Math.round((this.value / this.maxValue) * 100) + '%';
      }
    } else {
      setTimeout(() => this.animate(), 0);
      // this.animate();
    }
  }

  public animate() {
    if(this.fill) {
      this.score = {
        name: this.label,
        value: this.value
      };
      this.fillWidth = '' + Math.round((this.value / this.maxValue) * 100) + '%';

      TweenMax.to(this.fill, 0, {
        width: '0'
      });
      TweenMax.to(this.fill, 1, {
        width: this.fillWidth,
        ease: Easing.Elastic.easeOut
      });
    }
  }

  // onMouseEnter(event: MouseEvent) {
  //   // this.mouseEnter.emit(this.score);
  //   this.wrap.classList.add('active');
  // }

  // onMouseLeave(event: MouseEvent) {
  //   this.wrap.classList.remove('active');
  // }
}
