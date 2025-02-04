import { matricula, senha, agendamentos } from '../fixtures/agendamentos.json'

describe('POST /api/agendamentos', () => {

    before(() => {
        cy.postAgendamentos(matricula, agendamentos)
        cy.login(matricula, senha)
    })

    it('Deve listar os agendamentos do funcionario', () => {
        cy.api({
            method: 'GET',
            url: '/api/agendamentos',
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.length(agendamentos.length)

            // habilitadas funcoes de log para aprendizado
            cy.log(JSON.stringify(response.body))

            response.body.forEach((a, i) => {
                // habilitadas funcoes de log para aprendizado
                cy.log(a.emailCliente)
                cy.log(agendamentos[i].emailCliente)

                expect(a).to.deep.include({
                    nomeCliente: agendamentos[i].nomeCliente,
                    emailCliente: agendamentos[i].emailCliente,
                    data: agendamentos[i].data,
                    hora: agendamentos[i].hora
                })

                expect(a.servico).to.deep.include({
                    nome: agendamentos[i].servicoNome,
                    preco: agendamentos[i].preco
                })
            })
        })
    })
})
