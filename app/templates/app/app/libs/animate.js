import className  from './className';


export default (element, animation, cb) => {


  /* Get element */

  const node = typeof element === 'string' ? document.getElementById(element) : element;


  /* Detect events */

  let endEvents = [];

  const EVENTS_MAP = {

    transitionEndEvents: {
      'transition'      : 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition'   : 'mozTransitionEnd',
      'OTransition'     : 'oTransitionEnd',
      'msTransition'    : 'MSTransitionEnd'
    },

    animationEndEvents: {
      'animation'      : 'animationend',
      'WebkitAnimation': 'webkitAnimationEnd',
      'MozAnimation'   : 'mozAnimationEnd',
      'OAnimation'     : 'oAnimationEnd',
      'msAnimation'    : 'MSAnimationEnd'
    }

  };

  let testEl = document.createElement('div');
  let style  = testEl.style;

  if (!('AnimationEvent' in window)) {
    delete EVENTS_MAP.animationEndEvents.animation;
  }

  if (!('TransitionEvent' in window)) {
    delete EVENTS_MAP.transitionEndEvents.transition;
  }

  for (let baseEventName in EVENTS_MAP) {
    if (EVENTS_MAP.hasOwnProperty(baseEventName)) {
      let baseEvents = EVENTS_MAP[baseEventName];
      for (let styleName in baseEvents) {
        if (baseEvents.hasOwnProperty(styleName) && styleName in style) {
          endEvents.push(baseEvents[styleName]);
          break;
        }
      }
    }
  }

  /* Events handlers */

  const eventHandlers = {

    addEndEventListener(target, eventListener) {

      if (endEvents.length === 0) {
        window.setTimeout(eventListener, 0);
        return;
      }

      endEvents.forEach((endEvent) => {
        target.addEventListener(endEvent, eventListener, false);
      });

    },


    removeEndEventListener(target, eventListener) {

      if (endEvents.length === 0) return;

      endEvents.forEach((endEvent) => {
        target.removeEventListener(endEvent, eventListener, false);
      });

    }

  };


  /* Animate */

  const classNames = [animation, 'animated'];

  const endListener = (e) => {
    if (e && e.target !== node) return;
    eventHandlers.removeEndEventListener(node, endListener);
    className.remove(node, classNames);
    if (cb) cb();
  }

  className.remove(node, classNames);
  className.add(node, classNames);

  eventHandlers.addEndEventListener(node, endListener);

}
