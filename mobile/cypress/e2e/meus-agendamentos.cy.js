describe('Meus agendamentos', () => {
    var agendamentos = ''
    var profissional = ''

    before(() => {
        cy.fixture('agendamentos.json').then((data) => {
            agendamentos = data.profissional.agendamentos; // Extraímos os agendamentos
            profissional = data.profissional; // Extraímos o profissional
        })
        cy.criarAgendamentosAPI(agendamentos, profissional)
    })

    beforeEach(() => {
        cy.viewport('iphone-xr')
        cy.visit('/')
        cy.contains('p', 'Faça login com a sua conta')
            .should('be.visible')
        cy.login(profissional)
        cy.verificaUsuarioLogado(profissional)
    })

    it('Deve exibir os meus agendamentos', () => {
        cy.get('ul li')
            .should('be.visible')
            .and('have.length', agendamentos.length)
            .each(($li, index) => {

                cy.log(JSON.stringify(agendamentos[index]))

                const agendamento = agendamentos[index]
                const resultado = `${agendamento.servico.descricao} no dia ${agendamento.data} às ${agendamento.hora}`

                cy.wrap($li)
                    .invoke('text')
                    .should('contain', agendamento.usuario.nome)
                    .and('contain', resultado)
            })
    })
    it('Deve cancelar um agendamento', () => {
        const agendamento = agendamentos.find(x => x.usuario.email === 'peter.parker@dailybugle.com')
        cy.log(agendamento.servico.descricao)

        cy.contains('ul li', agendamento.usuario.nome)
            .as('agendamentoItem')

        cy.get('@agendamentoItem')
            .should('be.visible')
            .click()

        cy.contains('span', 'Cancelar agendamento')
            .should('be.visible')
            .click()

        cy.verificaToast('Agendamento cancelado com sucesso!')

        cy.get('@agendamentoItem')
            .should('not.exist')
    })

    it('Deve enviar uma solicitação de lembrete para o cliente', () => {
        const agendamento = agendamentos.find(x => x.usuario.email === 'steve.rogers@avengers.com')

        cy.contains('ul li', agendamento.usuario.nome)
            .as('agendamentoItem')

        cy.get('@agendamentoItem')
            .should('be.visible')
            .click()

        cy.contains('span', 'Enviar lembrete por e-mail')
            .should('be.visible')
            .click()

        cy.verificaToast('Lembrete enviado com sucesso!')

    })
})
