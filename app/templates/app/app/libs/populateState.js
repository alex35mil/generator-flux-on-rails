// In case of huge app where amount of data is big & it's changing all the time
// you might want to pass here only the current route (from server initter)
// and run `fetchData` method(s) only for current route

export default (components, ...args) => (

  Promise.all(
    components
      .filter(component => component.fetchData)
      .map(component => component.fetchData(...args))
  )

)
