import request from 'axios';


export default (req, res, next) => {

  const url = encodeURI(req.query.url);

  switch (req.params.service) {

    case 'facebook': {
      return (
        request
          .get(`http://graph.facebook.com/?id=${url}`)
          .then(response => {
            res.send({ shares: response.data.shares });
          })
          .catch(response => {
            res.end();
          })
      );
    }

    case 'twitter': {
      return (
        request
          .get(`http://urls.api.twitter.com/1/urls/count.json?url=${url}`)
          .then(response => {
            res.send({ shares: response.data.count });
          })
          .catch(response => {
            res.end();
          })
      );
    }

    default: {
      return res.end();
    }

  }

}
