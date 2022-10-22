/// <reference types="cypress" />
import { Given, DataTable, Step } from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  token?: string;
}

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      admin(): Chainable<string>;
      // login(email: string, password: string): Chainable<void>
      // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}

let admin: string;
const ADMIN_PASS = 'Some_admin_p@ssword1';
const ADMIN_EMAIL = 'test_admin@example.com';

Cypress.Commands.add('admin', () => {
  if (admin) return cy.wrap(admin);
  return cy
    .request({
      method: 'post',
      url: `${Cypress.env('API_URI') as string}/api/admins`,
      body: {
        email: ADMIN_EMAIL,
        password: ADMIN_PASS,
        passwordConfirm: ADMIN_PASS,
      },
      failOnStatusCode: false,
    })
    .then(res => {
      if (res.status !== 401) {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('id');
      }
      return cy
        .request({
          method: 'post',
          url: `${Cypress.env('API_URI') as string}/api/admins/auth-via-email`,
          body: {
            email: ADMIN_EMAIL,
            password: ADMIN_PASS,
          },
        })
        .then(res => {
          expect(res.status).to.eq(200);
          expect(res.body).to.have.property('token');
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          admin = res.body.token as string;
          return admin;
        });
    });
});

function randomUser(name: string): User {
  return {
    id: '',
    name,
    email: faker.internet.email(name),
    password: faker.internet.password(16),
  };
}

const users: Map<string, User> = new Map();

beforeEach(function () {
  users.forEach(user => {
    cy.request({
      method: 'delete',
      url: `${Cypress.env('API_URI') as string}/api/users/${user.id}`,
    }).then(res => {
      expect(res.status).to.eq(200);
      users.delete(user.name);
    });
  });
});

Given('the user {string} exists', function (name: string) {
  Step(this, `the user "${name}" exists with:`, new DataTable([]));
});

Given('the user {string} exists with:', function (name: string, table: DataTable) {
  cy.admin().then(t => {
    cy.log(JSON.stringify(t));
  });
  const user: User = {
    ...randomUser(name),
    ...table.rowsHash(),
  };

  cy.request({
    method: 'post',
    url: `${Cypress.env('API_URI') as string}/api/users`,
    body: {
      email: user.email,
      password: user.password,
      passwordConfirm: user.password,
    },
    failOnStatusCode: false,
  }).then(res => {
    expect(res.status).to.eq(200);
    expect(res.body).to.have.property('id');
    expect(res.body).to.have.property('token');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    user.id = res.body.id as string;
    users.set(name, user);
  });
});
