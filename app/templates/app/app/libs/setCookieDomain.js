export default (host, periods) => {

  const periodsAmount = periods ? (periods + 1) : 2;

  return (
      '.' + host.split('.').slice(-periodsAmount).join('.')
  );

}
