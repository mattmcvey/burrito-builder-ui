describe('Burrito Builder', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: 'http://localhost:3001/api/v1/orders'
    },
    {
      stausCode: 201,
      body: {orders: [{'id': 1, 'name': 'Pat', 'ingredients': ['beans', 'lettuce', 'carnitas', 'queso fresco', 'jalapeno']},
      {'id': 2, 'name': 'Matt', 'ingredients': ['lettuce', 'carnitas', 'queso fresco']},
      {'id': 3, 'name': 'Tim', 'ingredients': ['beans', 'carnitas', 'queso fresco', 'jalapeno']}
    ]}
    })
    cy.visit('http://localhost:3000')

  })

  it('shoud have a title', () => {
    cy.get('h1').contains('Burrito Builder')
  })

  it('should display input for name and buttons for ingredients and submission', () => {
    cy.get('form').children('button').should('have.length', '13')
    cy.get('form').children('input').should('have.length', '1')
  })

  it('should display existing reservations', () => {
    cy.get('section').children().should('have.length', '3')
  })

  it('should display no order when no ingredients have been chosen', () => {
    cy.get('p').contains('Nothing selected')
  })

  it('should not add an order to the page if nothing is selected', () => {
    cy.get('button').last().click().get('section').children().should('have.length', '3')
  })

  it('should not add an order to the page if ingredients arent selected', () => {
    cy.get('button').first().click().get('button').last().click().get('section').children().should('have.length', '3')
  })

  it('should not add an order to the page if no name is input', () => {
    cy.get('input').type('Matt').get('button').last().click().get('section').children().should('have.length', '3')
  })

  it('should display your order', () => {
    cy.get('button').first().click().get('p').contains('beans')
  })

  it('should be able to select the name input and fill it in with a value', () => {
    cy.get('input').type('Matt').should('have.value', 'Matt')
  })

  it('should be able to view new reservations after inputting name and ingredients and submitting', () => {
    cy.intercept({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/orders'
    },
    {
      statusCode: 201,
      body: {'id': 4, 'name': 'Matt', 'ingredients': ['beans']},
    })
    cy.get('input').type('Matt').get('button').first().click().get('button').last().click().get('section').children().should('have.length', '4')
  })

  it('should be able to add as many ingredients as you want', () => {
    cy.intercept({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/orders'
    },
    {
      statusCode: 201,
      body: {'id': 4, 'name': 'Matt', 'ingredients': ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream']}
    })
    cy.get('input').type('Matt').get('button').click({ multiple: true }).get('div').last().should('contain', 'beans').and('contain','steak').and('contain','carnitas').and('contain','sofritas').and('contain','lettuce').and('contain','queso fresco').and('contain','pico de gallo').and('contain','hot sauce').and('contain','guacamole').and('contain','jalapenos').and('contain','cilantro').and('contain','sour cream')
  })
})
