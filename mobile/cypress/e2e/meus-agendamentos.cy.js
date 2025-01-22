describe('Meus agendamentos', () => {
    it('Deve exibir os meus agendamentos', () => {
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

            cy.viewport('iphone-xr')
            cy.visit('/')

            cy.contains('p', 'Faça login com a sua conta')
                .should('be.visible')

            cy.login(profissional)
            cy.verificaUsuarioLogado(profissional)

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
    })
})
