export const IMG_PATH = "http://127.0.0.1:8000/storage";

export const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${IMG_PATH}/${path}`;
};

export const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
};
