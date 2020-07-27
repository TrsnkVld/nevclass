const path = require("path");
const PrerenderSPAPlugin = require("prerender-spa-plugin");
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

// const PrerenderSPAPlugin = require('prerender-spa-plugin');
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

// const removeNodes = (selectors, html) => {
//   const dom = new JSDOM(`${html}`);
//   const document = dom.window.document;
//   selectors.forEach((selector) => {
//       document.querySelectorAll(`${selector}`).forEach((elem) => {
//           elem.remove()
//       });
//   });

//   return dom.serialize();
// };

// const appendGTMs = (contexts, html) => {
//   const dom = new JSDOM(`${html}`);
//   const document = dom.window.document;
//   const head = document.head;

//   contexts.forEach((context) => {
//     const script = document.createElement("script");
//     script.innerHTML = context;
//     head.appendChild(script);
//   });

//   return dom.serialize();
// };

// const appendScripts = (srcs, html, addTo = 'body') => {
//   const dom = new JSDOM(`${html}`);
//   const document = dom.window.document;
//   const body = document[addTo];

//   srcs.forEach((src) => {
//       const script = document.createElement('script');
//       script.src = src;
//       if (addTo === 'body') {
//           script.defer = true;
//       }
//       body.appendChild(script);
//   });

//   return dom.serialize();
// };

/*Главная
Корабли
Услуги
Экскурсии
О компании*/

const routes = [
  "/",
  "/excursions/meteory-v-petergof",
  "/excursions/mini-kruiz-v-oreshek",
  "/excursions/pod-razvodnyimi-mostami",
  "/excursions/ekskursii-po-rekam-i-kanalam-peterburg",
  "/excursions",
  "/services",
  "/services/kejtering",
  '/services/kejtering',
  '/services/en-rozhdeniya-na-teplohode',
  "/ships",
  '/ships/teploxod-gloriya',
  '/ships/teploxod-nefrit',
  '/ships/teploxod-moskva-212',
  '/ships/teploxod-simfoniya',
  '/ships/teploxod-melodiya',
  '/ships/teploxod-nota',
  '/ships/teploxod-sonata',
  '/ships/teploxod-eligiya-rapsodia',
  '/about/',
  "/articles",
  "/articles/exclusive-menu",
  "/articles/dom-oficerov",
  "/articles/neobyichnyie-dostoprimechatelnosti-sankt-peterburga",
  "/articles/scenarii",
  "/articles/svadebnye-priglasheniya",
  "/articles/pravila-povedeniya-na-bortu",
  "/articles/svadebnaya-progulka-transfer",
  "/articles/ukrashenie-teploxodov",
  "/articles/grafik-razvoda-mostov",
  "/news",
  "/news/svadba",
  "/news/ekskursiya-v-gosti-k-kapitanu-zakryivaem-sezon-navigaczii",
  "/news/akcziya-na-arendu-teploxodov",
  "/news/dostoprimechatelnosti-fontanki-dom-utyug",
  "/news/myi-v-seti-vkontakte",
  "/feedback",
  "/gallery",
  "/error",
  "/error500",
  "/contacts",
  "/management",
  "/about",
  "/policy",
  "/articles",
  "/faq",
  "/tariffs",
];

module.exports = function(withWidgets, proxyURL) {
  // Required - The path to the webpack-outputted app to prerender.

  return new PrerenderSPAPlugin({
    staticDir: path.join(__dirname, "htdocs/"), // куда рендери

    // Optional - The path your rendered app should be output to.
    // (Defaults to staticDir.)
    // outputDir: path.join(__dirname, "htdocs"),

    // Optional - The location of index.html
    indexPath: path.join(__dirname, "public/index-prerender.html"), // шаблон

    // Required - Routes to render.
    routes: routes,

    // Optional - Allows you to customize the HTML and output path before
    // writing the rendered contents to a file.
    // renderedRoute can be modified and it or an equivelant should be returned.
    // renderedRoute format:
    // {
    //   route: String, // Where the output file will end up (relative to outputDir)
    //   originalRoute: String, // The route that was passed into the renderer, before redirects.
    //   html: String, // The rendered HTML for this route.
    //   outputPath: String // The path the rendered HTML will be written to.
    // }
    postProcess(context) {
      // console.log('withWIdgets', context, 'proxyURL', proxyURL);
      context.route = context.originalRoute;
      // Remove /index.html from the output path if the dir name ends with a .html file extension.
      // For example: /dist/dir/special.html/index.html -> /dist/dir/special.html
      // console.log('context.route', context.route);
      if (context.route.endsWith(".html")) {
        context.outputPath = path.join(__dirname, "htdocs", context.route);
      }

      if (withWidgets) {
        context.html = context.html.replace(
          /<!-- counters-header -->/i,
          `  <!-- Google Tag Manager -->
         <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
         new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
         j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
         'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
         })(window,document,'script','dataLayer','GTM-W729CT3');</script>
         <!-- End Google Tag Manager -->`
        );
      }
      return context;
    },

    // Optional - Uses html-minifier (https://github.com/kangax/html-minifier)
    // To minify the resulting HTML.
    // Option reference: https://github.com/kangax/html-minifier#options-quick-reference
    minify: {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      decodeEntities: true,
      keepClosingSlash: true,
      sortAttributes: true,
    },

    server: {
      // Normally a free port is autodetected, but feel free to set this if needed.
      proxy: {
        "/api/": {
          target: proxyURL,
          changeOrigin: true,
        },
        "/upload/": {
          target: proxyURL,
          changeOrigin: true,
        },
      },
    },

    // The actual renderer to use. (Feel free to write your own)
    // Available renderers: https://github.com/Tribex/prerenderer/tree/master/renderers
    renderer: new Renderer({
      // Optional - The name of the property to add to the window object with the contents of `inject`.
      injectProperty: "__PRERENDER_INJECTED",
      // Optional - Any values you'd like your app to have access to via `window.injectProperty`.
      inject: {
        foo: "bar",
      },

      // Optional - defaults to 0, no limit.
      // Routes are rendered asynchronously.
      // Use this to limit the number of routes rendered in parallel.
      maxConcurrentRoutes: 4,

      // Optional - Wait to render until the specified event is dispatched on the document.
      // eg, with `document.dispatchEvent(new Event('custom-render-trigger'))`
      renderAfterDocumentEvent: "render-event",
      // renderAfterTime: 10000, // Wait

      // Other puppeteer options.
      // (See here: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions)
      headless: true, // Display the browser window when rendering. Useful for debugging.
    }),
  });
};

// export default {
//    // Index.html is in the root directory.
//    staticDir: path.join(__dirname, "htdocs/"), // куда рендерить
//    indexPath: path.join(__dirname, "index.html"), // шаблон
//    routes: prerenderRoutes,
//    /**
//     * Вставляем виджеты - после пререндера и оптимизации:
//     */
//    postProcess: function (context) {
//        // Ignore any redirects.
//        context.route = context.originalRoute;
//        // Remove /index.html from the output path if the dir name ends with a .html file extension.
//        // For example: /dist/dir/special.html/index.html -> /dist/dir/special.html
//        if (context.route.endsWith('.html')) {
//            context.outputPath = path.join(__dirname, 'htdocs', context.route)
//        }

//        // delete inline styles and scripts
//        let newHTML = removeNodes(['style', 'script'], context.html);
//        // добавить виджеты:
//        if (process.env.WITH_WIDGETS === "true") {
//            const widgetsContext = [`<!-- Google Tag Manager -->
//            <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
//            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
//            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
//            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
//            })(window,document,'script','dataLayer','GTM-W729CT3');</script>
//            <!-- End Google Tag Manager -->`];
//            newHTML = appendGTMs(widgetsContext, newHTML);
//        }

//        // append assets
//        context.html = appendScripts(['/assets/js/common.js', '/assets/js/main.js'], newHTML);

//        return context;
//    },
//    // Optional minification.
//    minify: {
//        collapseBooleanAttributes: true,
//        collapseWhitespace: true,
//        decodeEntities: true,
//        keepClosingSlash: true,
//        sortAttributes: true
//    },
//    renderer: new Renderer({
//        headless: !WITH_RENDERER_DEBUG,
//        defaultViewport: {
//            width: 1680,
//            height: 1024
//        },
//        // TODO: протестировать с ивентом
//        renderAfterDocumentEvent: 'render-event',
//        //renderAfterTime: 8000,
//        injectProperty: '__PRERENDER_INJECTED',
//        inject: {
//            API_SERVER_URI: SERVER_URI,
//            //API_SERVER_AUTH:API_SERVER_AUTH
//        }
//    })
// };
