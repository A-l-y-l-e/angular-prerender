import { join } from 'path';

/** Get directory & file name from string */
export function transformUrl(url: string) {
  const toRoute = (str: string) => str.split('/').filter(item => !!item).join('/');
  const file = toRoute(join(url, 'index.html'));
  const route = toRoute(url);
  return { route, file };
}
