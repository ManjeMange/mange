import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor';

When('I visit {string}', function () {
  cy.visit('/');
});

Then('I should see {string}', function (text: string) {
  cy.contains(text);
});
