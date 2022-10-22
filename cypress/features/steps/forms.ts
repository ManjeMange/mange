import {
  When,
  type DataTable,
} from '@badeball/cypress-cucumber-preprocessor';

When('I submit the form', function () {
  if (this.submissions) {
    for (const [path, alias] of this.submissions as Array<[string, string]>) {
      cy.intercept(path).as(alias);
    }
  }

  cy.get('form').submit();
});

When('I fill out the form with:', (data: DataTable) => {
  for (const [name, value] of data.raw()) {
    cy.get(`input[name="${name}"]`).type(value);
  }
});
