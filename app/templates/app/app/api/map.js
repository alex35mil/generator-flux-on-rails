export default (localPath, mappings) => {

  for (let mapping of mappings) {
    if (mapping.req === localPath) {
      return mapping.apiPath;
    }
  }

  return localPath;

}
