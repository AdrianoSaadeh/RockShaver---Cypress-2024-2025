describe('POST /api/agendamentos', () => {
  it('Deve criar um novo agendamento', () => {

    cy.deleteMany(
      { matricula: '1001' },
      { collection: 'agendamentos' }
    )

    const body = {
      "emailCliente": "gruma.legal@gmail.com",
      "nomeCliente": "Gruma Saadeh",
      "data": "20/12/2024",
      "hora": "16:00",
      "matricula": "1001",
      "codigoServico": "1"
    }

    cy.api({
      method: 'POST',
      url: '/api/agendamentos',
      headers: {
        'Authorization': 'Bearer 3a8a9b8fae87baf503e7c5fe5b97fd72'
      },
      body: body
    }).should((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq('Agendamento criado com sucesso')
      expect(response.body.agendamentoId).to.match(/^[a-fA-F0-9]{24}$/)
    })
  })
})