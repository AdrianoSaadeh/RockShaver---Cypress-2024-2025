class Header {
    goToPreReg() {
        cy.get('header nav a[href="pre-cadastro"]')
            .click()
    }

    verifyPreReg(firstName, email) {
        cy.get('.usuario-nome')
            .should('be.visible')
            .and('have.text', 'Olá, ' + firstName)

        cy.get('.usuario-email')
            .should('be.visible')
            .and('have.text', email)
    }
}

export default new Header()