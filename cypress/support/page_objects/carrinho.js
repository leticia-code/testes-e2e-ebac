class VisualizarCarrinho {

    visualizarCarrinho() {
        cy.get('.dropdown-toggle > .text-skin').click()
        cy.get('.buttons').find('[class="button wc-forward view-cart"]').eq(1).click()
    }
}

export default new VisualizarCarrinho()