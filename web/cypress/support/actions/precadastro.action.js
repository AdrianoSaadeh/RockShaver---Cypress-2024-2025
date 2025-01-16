Cypress.Commands.add('startPreRegistration', (user) => {
    cy.visit('/')
    cy.get('header nav a[href="pre-cadastro"]')
        .click()
    cy.get('form h2')
        .should('be.visible')
        .and('have.text', 'Seus dados')
    cy.get('input[name="fullname"]').as('fullname')
    cy.get('input[name="email"]').as('email')

    if (user?.nome) {
        cy.get('@fullname').type(user.nome)
    }

    if (user?.email) {
        cy.get('@email').type(user.email)
    }

    cy.contains('button[type="submit"]', 'Continuar').click()
})

Cypress.Commands.add('verifyPreRegistered', (user) => {
    cy.get('.usuario-nome')
        .should('be.visible')
        .and('have.text', 'Olá, ' + user.nome.split(' ')[0])

    cy.get('.usuario-email')
        .should('be.visible')
        .and('have.text', user.email)

    cy.window().then((win) => {
        const usuario = win.localStorage.getItem('usuario')
        expect(usuario).to.eql(JSON.stringify(user))
    })
})

Cypress.Commands.add('preCadastroLS', (usuario) => {
    cy.window().then((win) => {
        win.localStorage.setItem('usuario', JSON.stringify(usuario))
        cy.visit('/')
        cy.contains(usuario.email)
            .should('be.visible')
    })
})

Cypress.Commands.add('alertHave', (fieldname, text) => {
    cy.contains('label', fieldname)
        .parent()
        .find('.alert-msg')
        .should('be.visible')
        .and('have.text', text)
})
