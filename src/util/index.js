export const objectToArray = obj => {
  if (!obj) return [];

  return Object.entries(obj).map(([id, entry]) => ({ id, ...entry }));
};

export const classNames = (conditionalNames = {}, ...permanentNames) =>
  Object.entries(conditionalNames)
    .reduce((acc, [key, value]) => {
      if (!value) return acc;

      return [...acc, key];
    }, permanentNames)
    .join(" ");
