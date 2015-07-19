export default (components, ...args) => {

  return Promise.all(
      components
          .filter(component => component.fetchData)
          .map(component => component.fetchData(...args))
  );

}
