/// <reference types="cypress" />
import nomeFuncionliadaPage from '../support/page_objects/produtos'
import DadosProduto from '../fixtures/produtos.json'
import carrinho from '../support/page_objects/carrinho';
import produtos from '../support/page_objects/produtos';

var dadosLogin

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente
        Quero acessar a Loja EBAC
        Para fazer um pedido de 4 produtos
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */ 
    before(() => {
        cy.fixture('perfil').then(perfil => {
            dadosLogin = perfil
        })
    });

    beforeEach(() => {
        cy.visit('produtos/')
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        //Adicionar produtos no carrinho
        produtos.adicionarProduto(
            DadosProduto[0].produto, DadosProduto[0].cor, DadosProduto[0].tamanho, DadosProduto[0].quantidade
        )
        produtos.adicionarProduto(
            DadosProduto[1].produto, DadosProduto[1].cor, DadosProduto[1].tamanho, DadosProduto[1].quantidade
        )
        produtos.adicionarProduto(
            DadosProduto[2].produto, DadosProduto[2].cor, DadosProduto[2].tamanho, DadosProduto[2].quantidade
        )
        produtos.adicionarProduto(
            DadosProduto[3].produto, DadosProduto[3].cor, DadosProduto[3].tamanho, DadosProduto[3].quantidade
        )

        //Visualizar Carrinho
        carrinho.visualizarCarrinho()

        //Validando Inclusão de Produto
        cy.get('.table-responsive').should('contain', DadosProduto[0].produto)
        cy.get('.table-responsive').should('contain', DadosProduto[1].produto)
        cy.get('.table-responsive').should('contain', DadosProduto[2].produto)
        cy.get('.table-responsive').should('contain', DadosProduto[3].produto)
        cy.get('.checkout-button').click()
        
        //Realizar Checkout
        cy.get('.showlogin').click()
        cy.loginCheckout(dadosLogin.usuario, dadosLogin.senha)
        
        //Finalizar Compra
        cy.get('#terms').click()
        cy.wait(2000)
        cy.get('#place_order').click()
 
        //Validar Pedido
        cy.get('.woocommerce-notice').should('contain', 'Obrigado')

    });


})