import Immutable, { Map as $Map, Set as $Set } from 'immutable';

import actionTypes from '../constants/dummiesConstants';


const $initialState = Immutable.fromJS({
  action   : null,
  index    : new $Set(),
  entities : {},
  errors   : null,
  isLoading: false,
});


export default function dummiesReducer(
  $state: $Map = $initialState,
  {
    type,
    index,
    entities,
    errors,
  } : {
    type    : string,
    index   : ?Array<number>,
    entities: ?Object,
    errors  : void | {
      code: number,
      data: Object,
    },
  }
) {

  switch (type) {

    case actionTypes.DUMMY_LOAD_LIST_REQUESTED: {
      return $state.merge({
        action   : type,
        isLoading: true,
      });
    }


    case actionTypes.DUMMY_LOAD_LIST_SUCCEED: {
      return $state.merge({
        action   : type,
        entities : entities,
        index    : new $Set(index),
        isLoading: false,
      });
    }


    case actionTypes.DUMMY_LOAD_LIST_FAILED: {
      return $state.merge({
        action   : type,
        errors   : errors,
        isLoading: false,
      });
    }


    default: {
      return $state;
    }

  }

}
