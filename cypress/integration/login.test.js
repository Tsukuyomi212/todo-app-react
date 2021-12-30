import 'cypress-localstorage-commands';

describe('Login', () => {
  beforeEach(() => {
    cy.server();
    cy.visit('/login');
    cy.route('POST', `${Cypress.env('backendAPI')}/api/auth/login`).as('login');
  });

  it('logs in user if credentials are correct', () => {
    cy.get('input[name=email]').type('jane@testmail.com');
    cy.get('input[name=password]').type('supersecret123');

    cy.get('button[type=submit]').click();
    cy.wait('@login').its('status').should('eq', 200);

    cy.get('@login').should(xhr => {
      expect(xhr.responseBody).to.have.property('access_token');
    });

    cy.getLocalStorage('token').then(token => {
      cy.intercept(`${Cypress.env('backendAPI')}/api/users`, req => {
        req.headers['authorization'] = `Bearer ${token}`;
      });
    });

    cy.get('h1').should('contain.text', 'Things to do');
  });
});
