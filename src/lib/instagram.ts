export interface InstagramPost {
  id: string;
  image: string;
  thumbnail: string;
  caption: string;
  /** Describes the picture when the caption is missing or says nothing about it. */
  alt?: string;
  /** A reel: the thumbnail is its cover. */
  video?: boolean;
  permalink: string;
  timestamp: string;
}

/** The first two paragraphs of a caption, hashtags left out: "Merci ❤️ · Joséphine de Joa Nails ✨". */
export function excerpt(caption: string): string {
  return caption
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
    .filter((paragraph) => paragraph && !paragraph.startsWith('#'))
    .slice(0, 2)
    .join(' · ');
}

export function latestPosts(posts: readonly InstagramPost[], count: number): InstagramPost[] {
  return [...posts].sort((a, b) => b.timestamp.localeCompare(a.timestamp)).slice(0, count);
}

/** Text alternative for a post thumbnail. */
export const postAlt = (post: InstagramPost): string =>
  post.alt ?? (excerpt(post.caption) || `Publication Instagram du ${postDate(post.timestamp)}`);

const DAY = new Intl.DateTimeFormat('fr-FR', {
  timeZone: 'Europe/Paris',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

/** "2026-04-08T13:15:47Z" → "8 avril 2026" */
export const postDate = (timestamp: string): string => DAY.format(new Date(timestamp));
