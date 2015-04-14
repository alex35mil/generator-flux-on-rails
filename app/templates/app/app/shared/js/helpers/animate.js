import events   from './events';

export default (el, animation, cb) => {

  const animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

  el.classList.remove(animation, 'animated');
  el.classList.add(animation, 'animated');

  events.one(el, animationEndEvents, () => {
    el.classList.remove(animation, 'animated');
    if (cb) cb();
  });

}
