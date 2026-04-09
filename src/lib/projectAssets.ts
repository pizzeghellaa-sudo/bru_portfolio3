export type GalleryItem = { thumb: string; full: string };

const files = import.meta.glob("../assets/projects/**/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const videoFiles = import.meta.glob("../assets/projects/**/*.mp4", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const key = (p: string) => p.replace(/\\/g, "/").split("/assets/projects/")[1];

const ASSETS = Object.fromEntries(Object.entries(files).map(([p, url]) => [key(p), url]));
const VIDEO_ASSETS = Object.fromEntries(Object.entries(videoFiles).map(([p, url]) => [key(p), url]));

export const projectThumb = (id: string) => ASSETS[`${id}/thumb.jpg`];

export const projectVideo = (id: string, filename: string) => VIDEO_ASSETS[`${id}/${filename}`];

export const projectGallery = (id: string): GalleryItem[] =>
  Object.keys(ASSETS)
    .filter(k => k?.startsWith(`${id}/`) && k.includes("-thumb"))
    .sort((a, b) => {
      const na = parseInt(a.split("/").pop()!);
      const nb = parseInt(b.split("/").pop()!);
      return na - nb;
    })
    .map(k => ({ thumb: ASSETS[k], full: ASSETS[k.replace("-thumb", "-full")] }));