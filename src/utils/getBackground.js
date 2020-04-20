export const isImage = background => {
  return background.includes("pexels");
};

export const getBackground = background => {
  return isImage(background) ? `url(${background})` : `${background}.600`;
};
