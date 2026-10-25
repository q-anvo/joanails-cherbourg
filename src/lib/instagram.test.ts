import { describe, expect, it } from 'vitest';

import { excerpt, latestPosts, postDate, type InstagramPost } from './instagram';

describe('excerpt', () => {
  it('keeps two paragraphs and drops hashtags', () =>
    expect(excerpt('Merci ❤️ \n\nJoséphine de Joa Nails ✨\n\n#nailart #gelnails')).toBe(
      'Merci ❤️ · Joséphine de Joa Nails ✨'
    ));

  it('stops at the hashtags after a single paragraph', () =>
    expect(excerpt('Baby color\n\n#nails')).toBe('Baby color'));
});

describe('latestPosts', () => {
  const post = (id: string, timestamp: string): InstagramPost => ({
    id,
    timestamp,
    image: '',
    thumbnail: '',
    caption: '',
    permalink: '',
  });

  it('keeps the most recent first', () => {
    const posts = [
      post('a', '2025-01-01T00:00:00Z'),
      post('b', '2026-01-01T00:00:00Z'),
      post('c', '2025-06-01T00:00:00Z'),
    ];
    expect(latestPosts(posts, 2).map((p) => p.id)).toEqual(['b', 'c']);
  });
});

describe('postDate', () => {
  it('writes the day in French, Paris time', () => expect(postDate('2025-11-30T23:30:00Z')).toBe('1 décembre 2025'));
});
