describe('Home and Login page', () => {

  it(`Visit 'Two Face Time' site successfully`, () => {
    cy.visit('https://www.twofacetime.xyz').wait(1000);
  });


  it(`Click 'Sign In' button to move login page`, () => {
    cy.get('.ButtonInHeader_Button__SkH4I').click().wait(1000);
  });

  it(`Contain text 'login' in url`, () => {
    cy.url()
      .should('include', '/login').wait(1000);
  });

  it('Login', () => {
    cy.login(Cypress.env('CYPRESS_TEST_UID')).wait(1000);
  });

  it('Move Home when logo is clicked', () => {
    cy.get('.Logo_LogoImage__3DCiw').click().wait(1000);
  });
});
