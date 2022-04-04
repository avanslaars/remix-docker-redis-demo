describe('Demo App', () => {
  it('Loads a hash from Redis', () => {
    cy.visit('http://localhost:3000/')
    cy.findByText('value 3').should('exist')
  })
})
