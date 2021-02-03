/// <reference types="cypress" />

context('Add Players', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('button').first().click();
  });

  it('Add player input should be focused', () => {
    cy.get('input').first().focus().should('have.class', 'add-player');
  });

  context('No added players', () => {
    it('Start game button should be disabled', () => {
      cy.get('button.start-game').first().should('be.disabled');
    });
  });

  context('Added one player', () => {
    it('Start game button should be disabled', () => {
      cy.get('input.add-player').type('player1{enter}');
      cy.get('button.start-game').first().should('be.disabled');
    });
  });

  context('Added two players', () => {
    it('Start game button should be enabled', () => {
      cy.get('input.add-player').type('player1{enter}');
      cy.get('input.add-player').type('player2{enter}');
      cy.get('button.start-game').first().should('not.be.disabled');
    });
  });
});
