describe('login spec', () => {
  it('Deve realizar o pre-cadastro do cliente com sucesso', () => {

    const user = {
      nome: 'Adriano QA',
      email: 'adrianoqa@gmail.com'
    }

    cy.startPreRegistration(user)
    cy.verifyPreRegistered(user)
  })

  it('Campos obrigatórios', () => {
    cy.startPreRegistration()
    cy.alertHave('Nome Completo', 'O campo nome é obrigatório.')
    cy.alertHave('E-mail', 'O campo e-mail é obrigatório.')
  })


  it('Não deve realizar o pre-cadastro apenas informando o primeiro nome', () => {
    const user = {
      nome: 'Adriano',
      email: 'adrianoqa@gmail.com'
    }

    cy.startPreRegistration(user)
    cy.alertHave('Nome Completo', 'Informe seu nome completo.')
  })

  it('Não deve realizar o pre-cadastro apenas informando email invalido', () => {
    const user = {
      nome: 'Adriano QA',
      email: 'www.teste.com.br'
    }

    cy.startPreRegistration(user)
    cy.alertHave('E-mail', 'O e-mail inserido é inválido.')
  })
})