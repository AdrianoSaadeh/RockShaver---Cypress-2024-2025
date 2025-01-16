import calendario from '../fixtures/calendario.json'

describe('Agendamento', () => {

    beforeEach(function () {
        cy.fixture('agendamentos').then((agendamentos) => {
            this.agendamentos = agendamentos
        })
        cy.intercept('GET', '**/api/calendario', {
            statusCode: 200,
            body: calendario
        }).as('getCalendario')
    })

    it('Deve fazer um novo agendamento', function () {

        cy.deleteMany(
            { emailCliente: this.agendamentos.sucesso.usuario.email },
            { collection: 'agendamentos' }
        ).then(result => {
            cy.log(result)
        })

        cy.preCadastroLS(this.agendamentos.sucesso.usuario)

        cy.iniciarAgendamento()
        cy.escolherProfissional(this.agendamentos.sucesso.profissional.nome)
        cy.selecionarServico(this.agendamentos.sucesso.servico.descricao)
        cy.escolherDia(this.agendamentos.sucesso.dia)
        cy.escolherHorario(this.agendamentos.sucesso.hora)
        cy.finalizarAgendamento()
        cy.get('h3')
            .should('be.visible')
            .and('have.text', 'Tudo certo por aqui! Seu horário está confirmado.')
    })


    it('Deve retornar uma notificação em caso de conflito de disponibilidade', function () {

        const agendamentos = this.agendamentos.duplicado

        cy.deleteMany(
            { emailCliente: agendamentos.usuario.email },
            { collection: 'agendamentos' }
        ).then(result => {
            cy.log(result)
        })

        cy.agendamentoApi(agendamentos)

        cy.preCadastroLS(this.agendamentos.sucesso.usuario)

        cy.iniciarAgendamento()
        cy.escolherProfissional(agendamentos.profissional.nome)
        cy.selecionarServico(agendamentos.servico.descricao)
        cy.escolherDia(agendamentos.dia)

        cy.get(`[slot="${agendamentos.hora} - ocupado"]`)
            .should('be.visible')
            .find('svg')
            .should('be.visible')
            .and('have.css', 'color', 'rgb(255, 255, 255)')
    })

    it('Deve mostrar o slot ocupado', function () {

        const agendamentos = this.agendamentos.conflito

        cy.deleteMany(
            { emailCliente: agendamentos.usuario.email },
            { collection: 'agendamentos' }
        ).then(result => {
            cy.log(result)
        })

        cy.preCadastroLS(this.agendamentos.sucesso.usuario)

        cy.iniciarAgendamento()
        cy.escolherProfissional(agendamentos.profissional.nome)
        cy.selecionarServico(agendamentos.servico.descricao)
        cy.escolherDia(agendamentos.dia)
        cy.escolherHorario(agendamentos.hora)

        cy.agendamentoApi(agendamentos)

        cy.finalizarAgendamento()

        cy.get('.alert-error')
            .should('be.visible')
            .and('have.text', 'Já existe um agendamento para esta data e hora. Por favor, escolha outro horário.')
    })
})

