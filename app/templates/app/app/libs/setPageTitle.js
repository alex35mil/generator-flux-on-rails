export default function() {

  const { meta, route, store, location, params } = this;

  const { title } = meta({
    location,
    params,
    route: route.name,
    state: store.getState()
  });

  document.title = title;

}
