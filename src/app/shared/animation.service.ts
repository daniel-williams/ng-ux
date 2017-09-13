import { Injectable } from '@angular/core';

var Gsap = require('gsap');
var TweenMax = Gsap.TweenMax;
var TimelineMax = Gsap.TimelineMax;
var Easing = require('EasePack');
require('ScrollToPlugin');

var ScrollMagic = require('scrollmagic');
require('ScrollMagicGSAP');

@Injectable()
class AnimationService {

  getViewpointOffset(el: Element) {
    let offset = { x: 0, y: 0 };
    let scrolled = { x: 0, y: 0 };

    this.getOffset(el.parentNode, offset);
    this.getScrolled(el.parentNode.parentNode, scrolled);

    return {
      top: offset.y - scrolled.y,
      left: offset.x - scrolled.x
    };
  }

  getPageOffset(el: Element) {
    let offset = { x: 0, y: 0 };

    this.getOffset(el, offset);

    return {
      top: offset.y,
      left: offset.x
    };
  }

  getPageOffset_Parent(el: Element) {
    let offset = { x: 0, y: 0 };

    this.getOffset(el.parentNode, offset);

    return {
      top: offset.y,
      left: offset.x
    };
  }

  static CreateController(): any {
    let controller = new ScrollMagic.Controller();

    controller.scrollTo((newpos: number) => {
      let currentPos = document.scrollingElement
        ? document.scrollingElement.scrollTop
        : document.body.scrollTop;

      // set scroll duration
      let duration = Math.max(0.25, Math.min(1, (newpos * 0.001)));

      TweenMax.to(window, duration, {
        scrollTo: { y: newpos },
        ease: Easing.Power4.easeInOut
      });
    });
    return controller;
  }

  // private methods
  private getOffset(el: any, offset: any) {
    if(!el) { return };

    offset.x += el.offsetLeft;
    offset.y += el.offsetTop;
    this.getOffset(el.offsetParent, offset);
  }

  private getScrolled(el: any, scrolled: any) {
    if(!el) { return };

    scrolled.x += el.scrollLeft;
    scrolled.y += el.scrollTop;

    if(el.tagName.toLowerCase() !== "html") {
      this.getScrolled(el.parentNode, scrolled);
    }
  }

}



export {
  AnimationService,
  Gsap,
  TweenMax,
  TimelineMax,
  Easing,
  ScrollMagic
}
