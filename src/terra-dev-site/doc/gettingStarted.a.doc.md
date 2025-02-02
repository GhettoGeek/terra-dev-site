# Getting Started

Terra-dev-site offers a quick site to host test examples and documentation for your react components or markdown documentation.

## Quick start

### Installation

``` bash
npm install --save-dev terra-dev-site
```

## Peer Dependencies

This component requires the following peer dependencies be installed in your app for the component to properly function.

| Peer Dependency | Version |
|-|-|
| react | ^16.8.5 |
| react-dom | ^16.8.5 |
| terra-toolkit | ^5.2.0 |
| webpack | ^4.28.1 |

### Prerequisites

* README.md in the root project directory
* Package.json in the root project directory
* es6 code in src
* transpiled code in lib
* babel 7.5 is required to transpile the `dev-site-config/build` folder at webpack time.

### Running terra-dev-site

Using the provided terra-dev-site webpack config a static site will be built to the `dev-site-config/build` directory and can be served using either `webpack-dev-server`, `tt-serve` or served statically using something like gh-pages. You must extend the provided webpack config using webpack-merge or simply returning the webpack config from a root level webpack.config.

To serve using `tt-serve`, add the following terra-toolkit command to your package.json. See the [tt-serve docs](https://github.com/cerner/terra-toolkit/tree/master/scripts/serve#cli) for more information on the command options.

```json
{
  "scripts": {
    "start": "tt-serve
  }
}
```

### Quick Start

After adding the start command to your package.json, run it and navigate to http://localhost:8080/#/site to view the site in your browser:

```bash
npm run start
```

You will see your readme hosted on the site. Next lets add some pages.

Terra-dev-site will auto discover files base on either the default search patterns in the site.config or the file structure and file extensions used.

Add the following file to: `<package>/src/terra-dev-site/my-first-page.doc.md`

```md
My first page!
```

Then re-run the site and navigate to it in your browser:

```bash
npm run start
```

Now you should be able to see your page under the components tab.

## Auto Page Discovery

By default terra-dev-site will look for files in the `./src/terra-dev-site` folder in dev mode and `./lib/terra-dev-site` for prod mode. In an monorepo it will search for files in `./packages/{src,lib}/terra-dev-site`. The file directories and file names are used to build the menu navigation of the site.

### Directories

The directories following the entry point folder (terra-dev-site by default) will be translated into part of the menu structure. The one exception is if you have a 'pageType' directory inside the entry point folder, it will be ignored. This lets you group page types together without impacting your site.

### File Naming

Files need to be named using the correct 'pageType' indicator and file extension to be added to the site. This will allow you to add any additional files to support your examples and only have the specified files added as entries to the site. The file name pattern is:

`<filename>.<group>.<pageType>.<extension>`

The components of the file name pattern are:

* filename - This is the name that will be added to the side menu for the site. These are sorted alphabetically.
* group - (optional) This allows you to sort menu items. The group is sorted alphabetically.
* pageType - This indicates which primary navigation item the page will be rendered under. The default pageTypes are 'home', 'doc', and 'test'.
* extension - .md .js and .jsx are supported. Any other type will have unexpected behavior.


### Auto Discovery Example

Given a directory structure like this:

```
src/
  terra-dev-site/
    doc/
      upgradeGuide.a.doc.md
      examples.c/
        supportingFile.js
        myGreatExample.doc.jsx
      example.b.doc.js
    test/
      testfile.test.js
      docInTestFolder.doc.js
```

The menu navigation result will be:

```
-Components-
  Upgrade Guide
  Example
  Examples >
     My Great Example
  Test >
     Doc In Test Folder
-Test-
  Testfile
```

## Path based routing deployments

To support hash routing with path based routing for gh-pages style deployments, you must supply an env variable, `TERRA_DEV_SITE_PUBLIC_PATH`, describing the path for assets to be served from.

For example, for a page hosted on github pages with a url of: http://cerner.github.com/terra-dev-site. The environment variable should be set as follows.

```bash
TERRA_DEV_SITE_PUBLIC_PATH='/terra-dev-site/'
```

Without the environment variable set assets will assume they are served from `/` when they should be served from `/terra-dev-site/`

## How Terra-Dev-Site Works

The terra-dev-site's webpack config calls the pre-build tool `generateAppConfig`. The generateAppConfig script builds out static configuration to the `./dev-site-config/build` folder. `generateAppConfig` also discovers pages based on its configuration. After the static config has been built, webpack continues to run, pulling in the static config and producing the webpack bundle.

## Debug

To get verbose output, add `--env.verboseGenerateAppConfig` to your webpack command or run `tds-generate-app-config -v`.

## Further customization:

Check out our [Customization docs](http://engineering.cerner.com/terra-dev-site/#/getting-started/terra-dev-site/configuration/site-config).
