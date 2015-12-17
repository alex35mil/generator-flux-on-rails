import { normalize, arrayOf } from 'normalizr';

import apiCall       from 'app/libs/apiCall';
import { apiPaths }  from '../routes/dummiesPaths';
import dummiesSchema from '../schemas/dummiesSchema';
import actionTypes   from '../constants/dummiesConstants';


export function loadEntities(
  {
    apiHost,
    auth,
  } : {
    apiHost: ?string,
    auth   : Object | boolean,
  }
) {
  return dispatch => {
    dispatch({
      type: actionTypes.DUMMY_LOAD_LIST_REQUESTED,
    });

    return apiCall({
      method: 'GET',
      path  : apiPaths.dummiesPath(),
      host  : apiHost,
      auth  : auth,
    })
      .then(res => {
        const { dummies }    = res.data;
        const normalizedData = normalize(dummies, arrayOf(dummiesSchema));

        dispatch({
          type    : actionTypes.DUMMY_LOAD_LIST_SUCCEED,
          index   : normalizedData.result,
          entities: normalizedData.entities.dummies,
        });
      })
      .catch(res => {
        dispatch({
          type  : actionTypes.DUMMY_LOAD_LIST_FAILED,
          errors: {
            code: res.status,
            data: res.data,
          },
        });
      });
  };
}
