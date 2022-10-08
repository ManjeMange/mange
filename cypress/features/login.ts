import {
  When,
  Given,
  type DataTable,
  Then,
} from '@badeball/cypress-cucumber-preprocessor';

beforeEach(function() {
  this.submissions = [
    ['/api/users/auth-via-email', 'signin']
  ]
})

// When('I submit the form', function () {
//   cy.log(this.submissions)
//   cy.intercept('/api/users/auth-via-email').as('signin');
//   cy.get('form').submit();
// });

Then('I should be signed in', () => {
  cy.wait('@signin').its('response.statusCode').should('eq', 200);
});
