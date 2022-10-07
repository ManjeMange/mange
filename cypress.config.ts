import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import pre from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await pre.addCucumberPreprocessorPlugin(on, config);

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: '**/*.feature',
    supportFile: false,
    setupNodeEvents,
  },
});
