export default function() {

  const { getMeta, route, store, location, params } = this.props;

  const { title } = getMeta({
    location,
    params,
    route: route.name,
    state: store.getState(),
  });

  document.title = title;

}
