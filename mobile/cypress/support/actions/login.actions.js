Cypress.Commands.add('login', (profissional) => {
    cy.get('input[name="matricula"]')
        .type(profissional.matricula)

    cy.get('input[name="senha"]')
        .type(profissional.senha)

    cy.contains('button', 'Entrar')
        .click()
})

Cypress.Commands.add('verificaUsuarioLogado', (profissional) => {
    cy.get('.usuario-logado').within(() => {
        cy.get('small')
            .should('be.visible')
            .and('have.text', `Olá ${profissional.nome},`)

        cy.get('h2')
            .should('be.visible')
            .and('have.text', 'esse é o seu painel de atendimento!')
    })
})

