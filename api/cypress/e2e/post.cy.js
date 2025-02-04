describe('POST /api/agendamentos', () => {
  it('Deve criar um novo agendamento', () => {

    const body = {
      "emailCliente": "gruma.legal@gmail.com",
      "nomeCliente": "Gruma Saadeh",
      "data": "20/12/2024",
      "hora": "16:00",
      "matricula": "1001",
      "codigoServico": "1"
    }

    cy.deleteMany(
      { matricula: body.matricula },
      { collection: 'agendamentos' }
    )

    cy.postAgendamento(body).should((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq('Agendamento criado com sucesso')
      expect(response.body.agendamentoId).to.match(/^[a-fA-F0-9]{24}$/)
    })
  })


  it('Deve retornar erro quando o agendamento ja existe', () => {
    const body = {
      "emailCliente": "aline.legal@gmail.com",
      "nomeCliente": "Aline Santos",
      "data": "20/12/2024",
      "hora": "16:00",
      "matricula": "1002",
      "codigoServico": "2"
    }

    cy.deleteMany(
      { matricula: body.matricula },
      { collection: 'agendamentos' }
    )

    cy.postAgendamento(body).should((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq('Agendamento criado com sucesso')
    })

    cy.postAgendamento(body).should((response) => {
      expect(response.status).to.eq(409)
      expect(response.body.message).to.eq('Já existe um agendamento para esta data e hora. Por favor, escolha outro horário.')
    })
  })
})

Cypress.Commands.add('postAgendamento', (body) => {
  return cy.api({
    method: 'POST',
    url: '/api/agendamentos',
    headers: {
      'Authorization': 'Bearer 3a8a9b8fae87baf503e7c5fe5b97fd72'
    },
    body: body,
    failOnStatusCode: false
  })
})