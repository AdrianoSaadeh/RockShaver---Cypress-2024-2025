import preRegiPage from "../support/pages/pre-regi.page"
import homePage from "../support/pages/home.page"

describe('login spec', () => {
  it('Deve realizar o pre-cadastro do cliente com sucesso', () => {

    homePage.go()
    homePage.header.goToPreReg()
    preRegiPage.fillForm('Adriano QA', 'adrianoqa@gmail.com')
    preRegiPage.submit()
    homePage.header.verifyPreReg('Adriano', 'adrianoqa@gmail.com')
  })

  it('Campos obrigatórios', () => {
    homePage.go()
    homePage.header.goToPreReg()
    //preRegiPage.fillForm('Adriano QA', 'adrianoqa@gmail.com')
    preRegiPage.submit()
    preRegiPage.alertHave('Nome Completo', 'O campo nome é obrigatório.')
    preRegiPage.alertHave('E-mail', 'O campo e-mail é obrigatório.')
  })


  it('Não deve realizar o pre-cadastro apenas informando o primeiro nome', () => {
    homePage.go()
    homePage.header.goToPreReg()
    preRegiPage.fillForm('Adriano', 'adrianoqa@gmail.com')
    preRegiPage.submit()
    preRegiPage.alertHave('Nome Completo', 'Informe seu nome completo.')
  })

  it('Não deve realizar o pre-cadastro apenas informando email invalido', () => {
    homePage.go()
    homePage.header.goToPreReg()
    preRegiPage.fillForm('Adriano QA', 'adrianoqa.com.br')
    preRegiPage.submit()
    preRegiPage.alertHave('E-mail', 'O e-mail inserido é inválido.')
  })
})