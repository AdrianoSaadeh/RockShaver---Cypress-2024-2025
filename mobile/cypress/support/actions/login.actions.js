Cypress.Commands.add('login', (funcionario) => {
    cy.get('input[name="matricula"]')
        .type(funcionario.matricula)

    cy.get('input[name="senha"]')
        .type(funcionario.senha)

    cy.contains('button', 'Entrar')
        .click()
})

Cypress.Commands.add('verificaUsuarioLogado', (funcionario) => {
    cy.get('.usuario-logado').within(() => {
        cy.get('small')
            .should('be.visible')
            .and('have.text', `Olá ${funcionario.nome},`)

        cy.get('h2')
            .should('be.visible')
            .and('have.text', 'esse é o seu painel de atendimento!')
    })
})

