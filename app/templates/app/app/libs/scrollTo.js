const scrollTo = (element, params = {}) => {

  let node;

  if (typeof element === 'string' && document.getElementById(element)) {
    node = document.getElementById(element);
  } else if (element && element.nodeType && element.nodeType === 1) {
    node = element;
  }

  const root = (
    document.body.scrollTop ? document.body : document.documentElement
  );

  const tick       = 10;
  const duration   = params.duration || 200;
  const padding    = params.padding || 0;
  const toBottom   = params.toBottom || false;
  const cb         = params.cb || false;
  const side       = toBottom ? 'bottom' : 'top';

  const to = (
    node ? (node.getBoundingClientRect()[side] + root.scrollTop) : 0
  );

  const difference = to - root.scrollTop;
  const perTick    = difference / duration * tick;

  setTimeout(() => {
    root.scrollTop += perTick;
    const scrollDone = (
      Math.abs(root.scrollTop - to) < 1 ||
      (
        window.pageYOffset < to &&
        (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight
      )
    );
    if (scrollDone) {
      if (toBottom) {
        root.scrollTop += padding;
      } else {
        root.scrollTop -= padding;
      }
      if (cb && cb === 'function') return cb();
      return;
    }
    scrollTo(element, {
      padding,
      toBottom,
      cb,
      duration: duration - tick,
    });
  }, tick);

}

export default scrollTo;
