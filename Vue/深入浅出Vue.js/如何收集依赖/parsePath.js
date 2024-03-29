const bailRE = /[^\w.$]/;

export default function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }

  const segments = path.split('.');
  return function(obj) {
    for (let i = 0, l = segments.length; i < l; i++) {
      if (!obj) {
        return;
      }
      obj = obj[segments[i]];
    }

    return obj;
  }
}