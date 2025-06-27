export function classNames(...l: Array<string>) {
  return l
    .map((el) => el.trim())
    .filter(Boolean)
    .join(" ");
}
