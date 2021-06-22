import 'zone.js/dist/zone-node';
const domino = require('domino');
const MockBrowser = require('mock-browser').mocks.MockBrowser;
const mock = new MockBrowser();
global['navigator'] = mock.getNavigator();
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import { SitemapStream, SitemapItem, EnumChangefreq } from 'sitemap';
import { createGzip } from 'zlib';
import { environment } from '@env/environment';
import axios from 'axios';
import { routerMap } from '@constants';

const templateA = existsSync(join('dist/coffee-lab/browser', 'index.html')).toString();
const win = domino.createWindow(templateA);
win.Object = Object;
win.Math = Math;

global['window'] = win;
global['document'] = win.document;
global['branch'] = null;
global['object'] = win.object;

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
    const server = express();
    const distFolder = join(process.cwd(), 'dist/coffee-lab/browser');
    const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

    // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
    server.engine(
        'html',
        ngExpressEngine({
            bootstrap: AppServerModule,
        }),
    );

    server.set('view engine', 'html');
    server.set('views', distFolder);

    // Serve sitemap
    server.get('/coffee-lab/sitemap.xml', sitemap);
    // server.get('/api/**', (req, res) => { });
    // Serve static files from /browser
    server.get(
        '*.*',
        express.static(distFolder, {
            maxAge: '1y',
        }),
    );

    // All regular routes use the Universal engine
    server.get('*', (req, res) => {
        const prefix = 'coffee-lab';
        res.render(`${prefix}/${indexHtml}`, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
    });

    return server;
}

async function sitemap(req: Request, res: any) {
    res.header('Content-Type', 'application/xml');
    res.header('Content-Encoding', 'gzip');

    try {
        const sitemapStream = new SitemapStream({
            // This is required because we will be adding sitemap entries using relative URLs
            hostname: `${window.location.protocol}//${window.location.host}`,
        });
        const pipeline = sitemapStream.pipe(createGzip());

        const languages = ['en', 'sv'];
        const types = ['qa-forum', 'articles', 'coffee-recipes', 'about-era-of-we'];
        for (const lang of languages) {
            for (const type of types) {
                sitemapStream.write({
                    priority: 1.0,
                    changefreq: EnumChangefreq.ALWAYS,
                    url: `${environment.coffeeLabWeb}${lang}/${routerMap[lang][type]}`,
                } as SitemapItem);
            }
        }

        // Stream write the response
        sitemapStream.end();
        pipeline.pipe(res).on('error', (error: Error) => {
            throw error;
        });
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
}

function run() {
    const port = process.env.PORT || 8081;

    // Start up the Node server
    const server = app();
    server.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
    run();
}

export * from './src/main.server';
