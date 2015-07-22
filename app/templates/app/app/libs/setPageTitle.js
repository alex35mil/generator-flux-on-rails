export default function() {

  const { Meta, route, store, location, params } = this;

  const meta = new Meta({
    location,
    params,
    route: route.name,
    state: store.getState()
  });

  document.title = meta.getTitle();

}
