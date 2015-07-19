import apiCall            from 'app/libs/apiCall';

import * as actionTypes   from '../constants/DummyConstants';


export function loadDummy({ apiHost, auth }) {

  return dispatch => {

    dispatch({
      type: actionTypes.DUMMY_LOAD_REQUESTED
    });

    return apiCall({
      method: 'GET',
      path  : '/dummy',
      host  : apiHost,
      auth  : auth
    })
      .then(res => {
        dispatch({
          type: actionTypes.DUMMY_LOAD_SUCCEED,
          data: res.data
        });
      })
      .catch(res => {
        dispatch({
          type : actionTypes.DUMMY_LOAD_FAILED,
          code : res.status,
          error: res.data
        });
      });
  };

}
