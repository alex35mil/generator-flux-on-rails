export default response => {

  const resType = response.status / 100 | 0; // eslint-disable-line no-bitwise

  response.info           = 1 === resType;
  response.ok             = 2 === resType;
  response.redirect       = 3 === resType;
  response.clientError    = 4 === resType;
  response.serverError    = 5 === resType;
  response.error          = (4 === resType || 5 === resType);

  response.created        = 201 === response.status;
  response.accepted       = 202 === response.status;
  response.noContent      = 204 === response.status;
  response.badRequest     = 400 === response.status;
  response.unauthorized   = 401 === response.status;
  response.notAcceptable  = 406 === response.status;
  response.forbidden      = 403 === response.status;
  response.notFound       = 404 === response.status;
  response.unprocessable  = 422 === response.status;

  return response;

}
