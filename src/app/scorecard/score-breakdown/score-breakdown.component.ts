import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  ElementRef,
  HostListener,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

import { AnimationService, Easing } from '../../core';
import { Score } from '../types';
import { ScoreMeter } from '../score-meter';


@Component({
  selector: 'score-breakdown',
  templateUrl: './score-breakdown.component.html',
  styleUrls: ['./score-breakdown.component.scss'],
  host: {
    class: 'score-breakdown',
    '(click)': 'onClick()',
    // '(mouseenter)': 'onMouseEnter($event)',
    // '(mouseleave)': 'onMouseLeave($event)'
  }
})
export class ScoreBreakdown {
  @Input() scores: Score[] = [];
  @Input() max: number;
  @Input() labelWidth: string = '80px';

  @ViewChild('toolTip') toolTipRef: ElementRef;
  @ViewChildren(ScoreMeter) meters: QueryList<ScoreMeter>;

  private hostEl: HTMLElement;
  private toolTip: HTMLDivElement;
  private showDetails: boolean = true;
  private targetScore: Score;
  private maxValue: number = 0;

  private toolTipTop: string = '0';
  private toolTipLeft: string = '0';

  constructor(el: ElementRef) {
    this.hostEl = el.nativeElement;
  }

  // @HostListener('document:mousemove', ['$event'])
  //   handleMouseMove(event:MouseEvent) {
  //     let offset = this.a.getPageOffset(this.hostEl);

  //     let x = event.pageX - offset.left - 30;
  //     let y = event.pageY - offset.top - 30;

  //     this.toolTipLeft = x + 'px';
  //     this.toolTipTop = y + 'px';
  //   }

  ngOnInit() {
    this.toolTip = this.toolTipRef.nativeElement;

    this.maxValue = this.max || this.scores.reduce((x, item) => {
      x += item.value;
      return x;
    }, 0);
  }

  onClick() {
    this.animate();
  }

  public animate() {
    this.meters.toArray().forEach(x => x.animate());
  }

  setTargetDetail(score: Score) {
    if(!!score) {
      this.toolTip.classList.add('active');

    } else {
      this.toolTip.classList.remove('active');
    }
    this.targetScore = score;
  }

  // onMouseEnter(event: MouseEvent) {
  //   this.showDetails = true;
  // }

  // onMouseLeave(event: MouseEvent) {
  //   this.showDetails = false;
  // }

}
