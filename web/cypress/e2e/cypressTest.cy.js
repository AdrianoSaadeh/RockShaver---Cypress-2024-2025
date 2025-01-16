import { mount } from '@cypress/react';
import Toggle from './Toggle';

describe('Toggle Component Test', () => {
  it('tests Toggle component behavior', () => {
    mount(<Toggle />);
    cy.get('#label').should('contain', 'OFF');
    cy.get('#toggleButton').click();
    cy.get('#label').should('contain', 'ON');
    cy.get('#remove').click();
    cy.get('#toggleContainer').should('not.exist');
  });
});