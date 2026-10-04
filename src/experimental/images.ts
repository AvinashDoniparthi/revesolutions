/**
 * Lighter copies of the shared images, generated next to the originals (which
 * stay untouched for the classic site and the data files):
 *
 *   public/showcase/jpg/*.jpg   screenshots re-encoded as JPEG (1.9 MB -> 0.65 MB)
 *   public/images/team/md/*.jpg team portraits capped at 900px (About cards)
 *   public/images/team/sm/*.jpg team portraits capped at 200px (inline avatars)
 *
 * On a phone on mobile data these are the bulk of what the pages download.
 */
export const shot = (src: string) => src.replace('/showcase/', '/showcase/jpg/').replace(/\.png$/, '.jpg');

const teamVariant = (src: string, size: 'sm' | 'md') => src.replace('/images/team/', `/images/team/${size}/`).replace(/\.jpe?g$/, '.jpg');

export const teamSm = (src: string) => teamVariant(src, 'sm');
export const teamMd = (src: string) => teamVariant(src, 'md');
