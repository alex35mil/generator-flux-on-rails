import Axios  from 'axios';

export default (req, res, next) => {

  switch (req.params.service) {

    case 'facebook':
      Axios.get(`http://graph.facebook.com/?id=${encodeURI(req.query.url)}`)
          .then(response => {
            res.send({ shares: response.data.shares });
          })
          .catch(response => {
            res.end();
          });
      break;

    case 'twitter':
      Axios.get(`http://urls.api.twitter.com/1/urls/count.json?url=${encodeURI(req.query.url)}`)
          .then(response => {
            res.send({ shares: response.data.count });
          })
          .catch(response => {
            res.end();
          });
      break;

    default:
      res.end();

  }

}
