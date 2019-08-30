(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{823:function(e,t,i){"use strict";i.r(t),t.default="# v0.5.0 Upgrade Guide\nThis document will provide information on upgrading from Terra Dev Site `0.x` to `0.5.0`.\n\n## Webpack 4\nTerra-dev-site now uses Terra-Toolkit's default webpack config as its base config. Terra-dev-site then adds an entry, the html-webpack-plugin and an additional resolve path for custom site configuration. Unlike terra-toolkit, this webpack config is ready to use without needing any wrapping.\n\nThe default webpack config has been moved from `src/config/webpack.config` to `config/webpack/webpack.config`;\nMuch like terra-toolkit the dev and prod webpack configs have been merged into one. See that guide for more info.\n\n## WebdriverIO\nTerra Dev Site provides a default webdriver IO config. This config adds in some additional opinions specific to terra-dev-site, and unlike terra-toolkit, is ready out of the box.\n\nThe webdriver config pulls in the default webpack config, the root selector for tests when terra dev site is used as a driver and a before hook to refresh the page after each test.\n\n## Terra-Dev-Site Config\nWe're preparing to generate more code on launch of terra-dev-site instead of generating it client side. For the first step we're requiring that the `site.config.js` file be placed inside the `dev-site-config` folder at the project root for better organization as well as a location to place generated items.\n\nThe placeholder image and logo image are now defaulted to the Terra image.\n"}}]);
//# sourceMappingURL=50-0fabcc5b2fb2b17e17ac.js.map