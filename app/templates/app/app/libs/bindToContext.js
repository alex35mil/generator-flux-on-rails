export default (methods, context) => {
  methods.forEach(method => context[method] = context[method].bind(context));
}
