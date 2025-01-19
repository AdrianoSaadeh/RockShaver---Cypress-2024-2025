describe('Login', () => {

  beforeEach(() => {
    cy.viewport('iphone-xr')
    cy.visit('/')

    cy.contains('p', 'Faça login com a sua conta')
      .should('be.visible')
  })

  it('Deve logar como barbeiro', () => {
    const funcionario = {
      matricula: '1007',
      senha: 'pwd123',
      nome: "Slash"
    }

    cy.login(funcionario)
    cy.verificaUsuarioLogado(funcionario)
  })

  it('Não deve logar quando a senha é inválida', () => {
    const funcionario = {
      matricula: '1008',
      senha: 'abc123',
    }

    cy.login(funcionario)

    // cy.wait(1000)
    // cy.document().then((doc) => {
    //   const codigoHTML = doc.documentElement.outerHTML
    //   cy.writeFile('temp.html', codigoHTML)
    // })

    cy.get('.toast')
      .should('be.visible')
      .find('div[role="status"]')
      .should('have.text', 'Falha ao realizar login. Verifique suas credenciais.')
  })

  it('Não deve logar quando a matricula não existe', () => {
    const funcionario = {
      matricula: '1111',
      senha: 'abc123',
    }

    cy.login(funcionario)
    cy.verificaToast('Falha ao realizar login. Verifique suas credenciais.')
  })

  it('Não deve logar quando os campos não são preenchidos não existe', () => {
    cy.get('form').submit()
    cy.verificaToast('Informe sua matrícula e sua senha!')
  })
})

