export const isImage = background => {
  return background.includes("pexels")
    ? `url(${background})`
    : `${background}.600`;
};
