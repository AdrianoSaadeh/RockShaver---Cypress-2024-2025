import prereg from "../support/actions/prereg"

describe('login spec', () => {
  it('Deve realizar o pre-cadastro do cliente com sucesso', () => {
    prereg.start('Adriano QA', 'adrianoqa@gmail.com')
    prereg.verify('Adriano', 'adrianoqa@gmail.com')
  })

  it('Campos obrigatórios', () => {
    prereg.start()
    prereg.alert('Nome Completo', 'O campo nome é obrigatório.')
    prereg.alert('E-mail', 'O campo e-mail é obrigatório.')
  })


  it('Não deve realizar o pre-cadastro apenas informando o primeiro nome', () => {
    prereg.start('Adriano', 'adrianoqa@gmail.com')
    prereg.alert('Nome Completo', 'Informe seu nome completo.')
  })

  it('Não deve realizar o pre-cadastro apenas informando email invalido', () => {
    prereg.start('Adriano QA', 'adrianoqa.com.br')
    prereg.alert('E-mail', 'O e-mail inserido é inválido.')
  })
})