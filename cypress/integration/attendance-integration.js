describe('Attendance Integration Test', () => {
    it('Check Basic Attendance Feature', () => {
        cy.request(Cypress.env("base_url")+Cypress.env("attendance_url"))
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })
})