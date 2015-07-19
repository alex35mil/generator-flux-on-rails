/* eslint no-shadow: 0 */

import * as actionTypes  from '../constants/DummyConstants';


const initialState = {
  type     : null,
  data     : null,
  error    : null,
  isLoading: false
};

export default function dummy(state = initialState, action) {

  const { type, data, code, error } = action;

  switch (type) {

    case actionTypes.DUMMY_LOAD_REQUESTED:
      return {
        type,
        data     : null,
        error    : null,
        isLoading: true
      };


    case actionTypes.DUMMY_LOAD_SUCCEED:
      return {
        type,
        data     : data.say,
        error    : null,
        isLoading: false
      };


    case actionTypes.DUMMY_LOAD_FAILED:
      return {
        type,
        error,
        data     : null,
        isLoading: false
      };


    default:
      return state;

  }

}
