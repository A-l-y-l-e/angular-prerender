import { join } from 'path';
// import fetch from 'node-fetch';

// const server = 'https://us-central1-head-expeditions.cloudfunctions.net/backupLinks';

// const getPostServer = (url: string) => {
//   return <Promise<any>>fetch(url).then(res => res.json());
// };
// export const LINKS = getPostServer(server);

/** Get directory & file name from string */
export function transformUrl(url: string) {
  const toRoute = (str: string) => str.split('/').filter(item => !!item).join('/');
  const file = toRoute(join(url, 'index.html'));
  const route = toRoute(url);
  return { route, file };
}
