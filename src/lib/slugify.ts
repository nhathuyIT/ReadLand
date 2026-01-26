import slugify from "slugify";

export function createPostSlug(title: string, id: string): string {
  const slug = slugify(title, {
    lower: true,
    strict: true,
    locale: "vi",
  });
  return `${slug}-${id}`;
}

export function extractIdFromSlug(slug: string): string {
  const parts = slug.split("-");
  return parts[parts.length - 1];
}
