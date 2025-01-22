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

import './actions/login.actions'

Cypress.Commands.add('verificaToast', (mensagem) => {
    cy.get('.toast')
        .should('be.visible')
        .find('div[role="status"]')
        .should('have.text', mensagem)
})

Cypress.Commands.add('criarAgendamentosAPI', () => {
     cy.fixture('agendamentos.json').then((data) => {
           const agendamentos = data.profissional.agendamentos; // Extraímos os agendamentos
           const profissional = data.profissional; // Extraímos o profissional

            cy.deleteMany(
                { matricula: profissional.matricula },
                { collection: 'agendamentos' }
            )

            // Iterando nos agendamentos
            agendamentos.forEach((a) => {
                cy.log(JSON.stringify(a));

                // Fazendo a requisição
                cy.request({
                    method: 'POST',
                    url: `${Cypress.env('baseApi')}/api/agendamentos`,
                    headers: {
                        'Content-type': 'application/json',
                        'authorization': 'Bearer 3a8a9b8fae87baf503e7c5fe5b97fd72'
                    },
                    body: {
                        nomeCliente: a.usuario.nome,
                        emailCliente: a.usuario.email,
                        data: a.data,
                        hora: a.hora,
                        matricula: profissional.matricula,
                        codigoServico: a.servico.codigo
                    }
                }).then((response) => {
                    expect(response.status).to.eq(201);
                })
            })
        })
})