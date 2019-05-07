const fse = require('fs-extra');
const path = require('path');
const writeConfig = require('./writeConfig');
const generateContentConfig = require('./generateContentConfig');
const generateNameConfig = require('./generateNameConfig');
const generateSettingsConfig = require('./generateSettingsConfig');
const generateNavigationItems = require('./generateNavigationItems');
const generatePagesConfig = require('./generatePagesConfig');
const injectTestEvidenceLink = require('./injectTestEvidenceLink');
const ImportAggregator = require('./generation-objects/ImportAggregator');
const importSideEffects = require('./importSideEffects');

/**
* Writes out a file consisting of the config and imports with the given file name to the specified path.
* Returns an object representing an imported variable.
*/
const addConfig = (config, fileName, buildPath, fs, imports) => {
  if (config) {
    writeConfig(config, fileName, buildPath, fse);
    const { name } = path.parse(fileName);
    return imports.addImport(`./${name}`, name);
  }
  return undefined;
};

/**
* Writes out a file consisting of the app config and imports with the given file name to the specified path.
*/
const generateAppConfig = (siteConfig, production, verbose) => {
  const imports = new ImportAggregator();

  const {
    appConfig,
    navConfig,
    sideEffectImports,
  } = siteConfig;

  const rootPath = path.join(process.cwd(), 'dev-site-config');
  // This is where we are writing out the generated files.
  const buildPath = path.join(rootPath, 'build');

  if (siteConfig.includeTestEvidence) {
    navConfig.navigation.links = injectTestEvidenceLink(navConfig);
  }

  const settingsConfig = addConfig(
    generateSettingsConfig(appConfig),
    'settingsConfig.jsx',
    buildPath,
    fse,
    imports,
  );

  const nameConfig = addConfig(
    generateNameConfig(appConfig),
    'nameConfig.js',
    buildPath,
    fse,
    imports,
  );

  const contentConfig = addConfig(
    generateContentConfig(siteConfig, generatePagesConfig(siteConfig, production, verbose)),
    'contentConfig.js',
    buildPath,
    fse,
    imports,
  );

  const navigationItems = addConfig(
    generateNavigationItems(navConfig),
    'navigationItems.js',
    buildPath,
    fse,
    imports,
  );

  // Add any side-effect imports.
  importSideEffects(sideEffectImports, imports);

  // Building out the overall config import.
  const config = {
    nameConfig,
    settingsConfig,
    contentConfig,
    navigationItems,
    indexPath: navConfig.navigation.index,
    defaultTheme: appConfig.defaultTheme,
    themes: appConfig.themes,
    apps: siteConfig.apps,
  };

  writeConfig({ config, imports }, 'appConfig.js', buildPath, fse);
};

module.exports = generateAppConfig;
