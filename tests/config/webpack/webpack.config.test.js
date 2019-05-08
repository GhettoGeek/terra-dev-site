const webpackConfig = require('../../../config/webpack/webpack.config');

describe('webpack config', () => {
  it('generates wepack config for dev', () => {
    const config = webpackConfig();
    const processPath = process.cwd();
    expect(config).toEqual(expect.objectContaining({
      entry: expect.objectContaining({
        'terra-dev-site': `${processPath}/lib/Index`,
        rewriteHistory: `${processPath}/lib/rewriteHistory`,
        redirect: `${processPath}/lib/redirect`,
      }),
      resolve: expect.objectContaining({
        modules: expect.arrayContaining([
          `${processPath}/dev-site-config`,
        ]),
        alias: expect.objectContaining({
          react: `${processPath}/node_modules/react`,
          'react-intl': `${processPath}/node_modules/react-intl`,
          'react-dom': `${processPath}/node_modules/react-dom`,
          'terra-dev-site/lib': `${processPath}/src`,
          'terra-dev-site': `${processPath}`,
        }),
      }),
      plugins: expect.arrayContaining([
        expect.objectContaining({
          options: expect.objectContaining({
            title: 'Terra Dev Site',
            template: `${processPath}/lib/index.html`,
            lang: 'en',
            dir: 'ltr',
            favicon: `${processPath}/terra-favicon/32px/favicon.ico`,
          }),
        }),
        expect.objectContaining({
          options: expect.objectContaining({
            filename: '404.html',
            template: `${processPath}/lib/404.html`,
            inject: 'head',
          }),
        }),
      ]),
    }));
  });

  it('generates wepack config for prod', () => {
    const config = webpackConfig(undefined, { p: true });
    const processPath = process.cwd();
    expect(config).toEqual(expect.objectContaining({
      entry: expect.objectContaining({
        'terra-dev-site': `${processPath}/lib/Index`,
        rewriteHistory: `${processPath}/lib/rewriteHistory`,
        redirect: `${processPath}/lib/redirect`,
      }),
      resolve: expect.objectContaining({
        modules: expect.arrayContaining([
          `${processPath}/dev-site-config`,
        ]),
        alias: expect.objectContaining({
          react: `${processPath}/node_modules/react`,
          'react-intl': `${processPath}/node_modules/react-intl`,
          'react-dom': `${processPath}/node_modules/react-dom`,
          'terra-dev-site': `${processPath}`,
        }),
      }),
      plugins: expect.arrayContaining([
        expect.objectContaining({
          options: expect.objectContaining({
            title: 'Terra Dev Site',
            template: `${processPath}/lib/index.html`,
            lang: 'en',
            dir: 'ltr',
            favicon: `${processPath}/terra-favicon/32px/favicon.ico`,
          }),
        }),
        expect.objectContaining({
          options: expect.objectContaining({
            filename: '404.html',
            template: `${processPath}/lib/404.html`,
            inject: 'head',
          }),
        }),
      ]),
      devtool: 'source-map',
    }));
  });
});
