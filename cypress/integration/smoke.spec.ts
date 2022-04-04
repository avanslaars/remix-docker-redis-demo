describe('Demo App', () => {
  it('Loads a hash from Redis', () => {
    cy.visit('/')
    cy.findByText('value 3').should('exist')
  })
})
