export default (err, req, res, next) => {

  res.status(err.status);

  if (req.accepts('html')) {
    res.render(`errors/${err.status}`, { url: req.url });
  } else {
    res.sendStatus(err.status);
  }

};
