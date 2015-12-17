export default {

  add(element, classNames) {
    if (element.classList) {
      this._iterateClassNames(classNames, className => {
        if (!this._hasClass(element, className)) {
          element.classList.add(className);
        }
      });
    } else {
      this._iterateClassNames(classNames, className => {
        if (!this._hasClass(element, className)) {
          element.className = element.className + ' ' + className;
        }
      });
    }
    return element;
  },


  remove(element, classNames) {
    if (element.classList) {
      this._iterateClassNames(classNames, className => {
        if (this._hasClass(element, className)) {
          element.classList.remove(className);
        }
      });
    } else {
      this._iterateClassNames(classNames, className => {
        if (this._hasClass(element, className)) {
          element.className = (
            ` ${element.className} `
              .replace(` ${className} `, ' ')
              .trim()
          );
        }
      });
    }
    return element;
  },


  _hasClass(element, className) {
    if (element.classList) {
      return element.classList.contains(className);
    }
    return ` ${element.className} `.indexOf(` ${className} `) > -1;
  },


  _iterateClassNames(classNames, cb) {
    if (Array.isArray(classNames)) {
      classNames.forEach(className => cb(className));
    } else {
      return cb(classNames);
    }
  },

}
