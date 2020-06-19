
const getUUID = () => new Date().getTime();

export const getPath = (path, cache = false) => {
  let filePath = path;
  if (!cache) {
    return filePath + `?t=${getUUID()}`;
  }
  return path;
};

