export default function() {

  const { Meta, route, store } = this;

  const meta = new Meta({
    route: route.name,
    state: store.getState()
  });

  document.title = meta.getTitle();

}
