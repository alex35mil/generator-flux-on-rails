export function bindToContext(context, methods) {
  const binded = {};

  for (const method of Object.keys(methods)) {
    binded[method] = methods[method].bind(context);
  }

  return binded;
}


export function latestifyDeps(modules) {
  return (
    modules
      .map(module => (module.includes('@') ? `${module}@latest` : module))
      .join(' ')
  );
}
