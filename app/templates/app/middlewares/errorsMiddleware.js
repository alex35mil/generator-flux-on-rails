export default (err, req, res, next) => {

  res.status(err.status);

  if (req.accepts('html')) {
    const errPartial = parseInt(err.status, 10) >= 500 ? 500 : err.status;
    res.render(`errors/${errPartial}`, { url: req.url, err: err.status });
  } else {
    res.sendStatus(err.status);
  }

}
