import React    from 'react';
import Router   from 'react-router';
import Jade     from 'jade';

import request  from '../api/request';


export default (req, res, next, routes, layout, locals) => {

  Router.run(routes, req.url, (Handler, state) => {

    const host = `${req.protocol}://api.${req.headers.host}`;

    request({
      method: 'get',
      host  : host,
      path  : state.path,
      cb    : (error, response) => {

        if (error) {
          let err = new Error();
          err.status = error.status;
          return next(err);
        }

        let { params, path } = state;

        locals.title = `${response.body.title || locals.titleDefault} | ${locals.titleBase}`;
        locals.body  = React.renderToString(<Handler path={path} params={params} data={response.body} />);

        let jaded = Jade.compileFile(layout, { pretty: true });
        let html  = jaded(locals);

        res.send(html);

      }
    });

  });

}
