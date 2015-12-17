export default (host, periods) => {

  const periodsAmount = periods ? (periods + 1) : 2;

  const domain = (
    host
      .split('.')
      .slice(-periodsAmount)
      .join('.')
  );

  return `.${domain}`;

}
