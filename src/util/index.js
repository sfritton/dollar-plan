export const objectToArray = obj => {
  if (!obj) return [];

  return Object.entries(obj).map(([id, entry]) => ({ id, ...entry }));
}
