const getInputByLabel = (label) => {
    return cy
        .contains('label', label)
        .invoke('attr', 'for')
        .then((id) => {
            cy.get('#' + id)
        })
}
describe('Registration Integration Test', () => {
    it('Check Basic Registration Feature', () => {
        // cy.visit('http://localhost:3000/register')
        cy.visit(Cypress.env("base_url")+Cypress.env("register_url"))
        getInputByLabel("Student Name:").type("Jhon Smith")
        getInputByLabel("Student Birth Registration ID:").type("1122334455")
        cy.get(":button").should("be.disabled")
        cy.contains('p', 'Invalid ID Entered').should("be.visible")

        getInputByLabel("Student Birth Registration ID:").clear()
        getInputByLabel("Student Birth Registration ID:").type("1122-334-4554")
        cy.get(":button").should("be.enabled")
        cy.contains('p', 'Invalid ID Entered').should("not.exist")
    })
})