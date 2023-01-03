class RealizarCompra {

    adicionarProduto(produto, tamanho, cor, quantidade) {
        //ações do método
        cy.get('[class="product-block grid"]').contains(produto).click()
        cy.get('.button-variable-item-' + tamanho).click()
        cy.get('.button-variable-item-' + cor).click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()

        cy.visit('produtos/')
    }

}

export default new RealizarCompra()