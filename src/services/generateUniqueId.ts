export const generateUniqueId = (): string => {
  return Math.random().toString(36).slice(2, 11);
};
