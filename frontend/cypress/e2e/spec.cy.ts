describe('My First Test', () => {
  beforeEach(() => {
    cy.intercept('GET', '/product/getAll?page=1&limit=12', { fixture: 'products.json' }).as('getProducts');
    cy.intercept('GET', '/brand/getAll', { fixture: 'brands.json' }).as('getBrands');
    cy.intercept('GET', '/category/getAll', { fixture: 'categories.json' }).as('getCategories');

    cy.visit('/')

    cy.wait(['@getBrands', '@getProducts']);
  })

  it('can render products', () => {
    cy.get('.card-list-container').should('be.visible');
    cy.get('.card-list-container').find('.card').should('have.length', 12)
  })

  it('can render more products', () => {
    cy.intercept('GET', '/product/getAll?page=2&limit=12', { fixture: 'more-products.json' }).as('getMoreProducts');

    cy.get('.card-list-container').find('.card').should('have.length', 12)

    cy.contains('Show more').click()
    cy.wait('@getMoreProducts')

    cy.get('.card-list-container').find('.card').should('have.length', 24)
  })

  it('can filter by brand', () => {
    cy.intercept('GET', '/product/getAll?page=1&limit=12&brand=Nova', { fixture: 'filtered-by-brand-products.json' }).as('getFilteredByBrand');

    cy.get('.filters-container').should('be.visible');
    cy.get('.filters-container select').should('exist');

    cy.contains('Aurora Blue Shirt').should('exist')

    cy.get('.filters-container select').first().select('Nova');
    cy.wait('@getFilteredByBrand')

    cy.contains('Aurora Blue Shirt').should('not.exist')
  })

  // I don't have the time to add all the tests, but I least here what I think we should test
  // todo: Add tests for the following scenarios:
  //    * can filter by category
  //    * can order by options
  //    * can render loading while fetching products
  //    * can render message when no more products to show (pagination)
  //    * can render message when products not found
})
