let currentId = 10;

export const generateUniqueId = (): string => {
  currentId += 1;
  return currentId.toString();
};
