export default (quantity, words) => {

  const quantityMod = quantity % 100;

  if (quantityMod >= 11 && quantityMod <= 19) {

    return words[2];

  } else {

    switch (quantityMod % 10) {
      case (1): return words[0];
      case (2):
      case (3):
      case (4): return words[1];
      default:  return words[2];
    }

  }

};
