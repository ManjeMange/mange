import {
  When,
  Given,
  type DataTable,
  Then,
} from '@badeball/cypress-cucumber-preprocessor';

Given('I am on the {string} page', (path: string) => {
  cy.visit(path);
});

Then('I should be on the {string} page', (path: string) => {
  cy.location().its('pathname').should('eq', path);
});

