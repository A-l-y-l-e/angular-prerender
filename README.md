# Angular Prerender

Renders your application and replaces the dist index.html with a version rendered at the route /

## Install

Create new project with Angular Cli

Run `ng new angular-prerender-demo`

Add universal

Run `ng g universal universal-demo`

Install modules for prerender

Run `yarn add @alyle/angular-prerender@beta @angular/platform-server @nguniversal/module-map-ngfactory-loader -D`

## Config

Create file config in root project

`.prerender.conf.json`

```json
{
  /** App name */
  "app-name:server": "universal-demo",
  /** App name browser(Opcional)*/
  "app-name:server": "my-app-demo", // default 0
  "paths": [
    "/",
    "/lazy"
  ]
}
```

## Build

Run `ng build --prod && ng build -aot -app universal-demo && yarn prerender`

result:

```bash
.
├── 0.a630cbd3c2dcc616b8f8.chunk.js
├── 3rdpartylicenses.txt
├── favicon.ico
├── index.html
├── inline.03611a316c000299c430.bundle.js
├── lazy
│   └── index.html
├── main.cf18780d97cde8383817.bundle.js
├── polyfills.1457c99db4b6dba06e8d.bundle.js
└── styles.ac89bfdd6de82636b768.bundle.css

1 directory, 9 files
```