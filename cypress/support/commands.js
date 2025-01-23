// ***********************************************
// This example commands.js shows you how to
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

import LoginPage from "../pageObjects/loginPage";
import PricingPage from "../pageObjects/pricingPage/pricingPage";
Cypress.Commands.add('Login', (uname, pwd) => {
    const loginPage = new LoginPage();

    // storing env variables
    let url = Cypress.env('url');
    let username = uname || Cypress.env('username');
    let password = pwd || Cypress.env('password');

    cy.visit(url);
    cy.get(loginPage.userNameTxtox).type(username);
    cy.get(loginPage.passwordTxtBox).type(password);
    cy.get(loginPage.signInBtn).click();

    // veriying if landing page is visible or not
    cy.origin(Cypress.env('appUrl'), () => {
        const Common = Cypress.require('../common/selectFeature');
        const main = new Common();
        cy.get(main.logo).should('be.visible');
    })
});