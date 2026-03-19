export const IMG_PATH = "https://techupgrad.in/interioxcel-backend/storage";

export const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${IMG_PATH}/${path}`;
};

export const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
};
