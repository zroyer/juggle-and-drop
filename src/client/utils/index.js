export const arrayToObject = (array) =>
  array.reduce((obj, item) => {
    obj[item._id] = item;
    return obj;
  }, {});
