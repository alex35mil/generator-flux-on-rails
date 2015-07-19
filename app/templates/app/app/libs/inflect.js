export default (amount, words) => {

  let inflection;

  let _amount = amount % 100;

  if (_amount >= 11 && _amount <= 19) {

    inflection = words[2];

  } else {

    const i = _amount % 10;

    switch (i) {
      case (1): inflection = words[0]; break;
      case (2):
      case (3):
      case (4): inflection = words[1]; break;
      default:  inflection = words[2];
    }
  }

  return inflection;

};
