export const classNames = (...cls: Array<string | undefined>) => {
  return cls.filter(Boolean).join(" ");
};
