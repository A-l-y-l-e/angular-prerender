// Load zone.js for the server.
// tslint:disable-next-line:no-import-side-effect
import 'zone.js/dist/zone-node';
// tslint:disable-next-line:no-implicit-dependencies no-import-side-effect
import 'reflect-metadata';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { minify } from 'html-minifier';
import fetch from 'node-fetch';

const { ensureDirSync } = require('fs-extra');
const { enableProdMode } = require('@angular/core');
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();
const { renderModuleFactory } = require('@angular/platform-server');

// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { transformUrl } from './common';


const rootDir = process.cwd();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(`${rootDir}/dist-server/main.bundle`);

const angularcliconfig = require(join(rootDir, '.angular-cli.json'));
const PRE_RENDER_CONFIG = require(join(rootDir, '.prerender.conf.json'));

// tslint:disable-next-line:max-line-length
const APP_BROWSER = angularcliconfig['apps'].find((item: any) => item['name'] === PRE_RENDER_CONFIG['app-name:browser']) || angularcliconfig['apps'][0];
const APP_SERVER = angularcliconfig['apps'].find((item: any) => item['name'] === PRE_RENDER_CONFIG['app-name:server']);

// /** Out directory */
// if (!existsSync('dist-browser')) {
//   mkdirSync('dist-browser');
// }
const BROWSER_FOLDER = join(rootDir, `${APP_BROWSER['outDir']}`);
const SERVER_FOLDER = join(rootDir, `${APP_SERVER['outDir']}`);

// Load the index.html file containing referances to your application bundle.
const INDEX = readFileSync(join(BROWSER_FOLDER, 'index.html'), 'utf8');
const PATHS = () => {
  return new Promise<string[]>((resolve, reject) => {
    const paths = PRE_RENDER_CONFIG['paths'];
    const url = PRE_RENDER_CONFIG['url'];
    if (paths) {
      resolve(paths);
    } else if (url) {
      fetch(url)
      .then((res) => resolve(res.json()))
      .catch(err => reject(err));
    } else {
      reject('Configuration was not found');
    }
  });
};
PATHS().then((res) => console.log(res));
/** Build */
function build() {
  const ROUTES: {
    route: string,
    file: string,
  }[] = [];
  /** Read routes */
  PATHS()
  .then((json) => {
    /** Creating routes */
    json.forEach(route => {
      ROUTES.push(transformUrl(route));
    });

    let previousRender = Promise.resolve();
    // Iterate each route path
    ROUTES.forEach(route => {
      const fullPath = join(BROWSER_FOLDER, route.route);

      // Make sure the directory structure is there
      if (!existsSync(fullPath)) {
        ensureDirSync(fullPath);
      }

      /** Writes rendered HTML to index.html, replacing the file if it already exists. */
      previousRender = previousRender.then(_ => renderModuleFactory(AppServerModuleNgFactory, {
        document: INDEX,
        url: join('/', route.route),
        extraProviders: [
          provideModuleMap(LAZY_MODULE_MAP)
        ]
      })).then(html => writeFileSync(join(BROWSER_FOLDER, `${route.file}`), minify(html, {
        minifyCSS: true,
        removeComments: true,
        collapseWhitespace: true
      })));

    });
  });
}

build();
