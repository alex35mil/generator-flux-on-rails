export default {

  add(el, e, cb) {
    this._handle('add', el, e, cb);
  },

  remove(el, e, cb) {
    this._handle('remove', el, e, cb);
  },

  one(el, e, cb) {
    let _e = e.split(' '), _cb = {};
    let handler = function() {
      return function() {
        for (let h = 0; h < _e.length; h++) {
          el.removeEventListener(_e[h], _cb[h], false);
        }
        cb();
      };
    };
    for (let i = 0; i < _e.length; i++) {
      _cb[i] = handler();
      el.addEventListener(_e[i], _cb[i], false);
    }
  },

  _handle(type, el, e, cb) {
    let events = e.split(' '),
        action = type === 'add' ? 'addEventListener' : 'removeEventListener';
    for (let event of events) {
      el[action](event, cb, false);
    }
  }

}
